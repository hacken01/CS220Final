const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//get images from multer
const multer = require('multer');

// we can use localhost or the server
const upload = multer({
    dest: '../front-end/public/images/',
    limits: {
        fileSize: 10000000
    }
});

// connect to the database
mongoose.connect('mongodb://localhost:27017/twitcherest', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// create a scheme for Posts
const postSchema = new mongoose.Schema({
    name: String,
    username: String,
    personComment: String,
    path: String,
});

// Create a model for the posts.
const Post = mongoose.model('Post', postSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async(req, res) => {
    // Just a safety check
    if (!req.file) {
        return res.sendStatus(400);
    }
    res.send({
        path: "/images/" + req.file.filename
    });
});

// Create a new Post for the user
app.post('/api/posts', async(req, res) => {
    const post = new Post({
        name: req.body.name,
        username: req.body.username,
        personComment: req.body.personComment,
        path: req.body.path,
        //commentSchema: req.body.commentSchema,
    });
    try {
        await post.save();
        res.send(post);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get a list of all of the Posts
app.get('/api/posts', async(req, res) => {
    try {
        let posts = await Post.find(); // find returns all the posts
        res.send(posts);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


// Schema for comments
const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post' // commentSchema belongs to a Post 
    },
    username: String,
    otherComment: String,
})

//Model for comments
const Comment = mongoose.model('Comment', commentSchema);

// Create a new Comment to post
app.post('/api/posts/:postID/comments', async(req, res) => {
    try {
        let post = await Post.findOne({ _id: req.params.postID });
        if (!post) {
            res.sendStatus(404);
            return;
        }
        let comment = new Comment({
            post: post,
            username: req.body.username,
            otherComment: req.body.otherComment,
        });
        await comment.save();
        res.send(comment);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// get the list of all the comments
app.get('/api/posts/:postID/comments', async(req, res) => {
    try {
        let post = await Post.findOne({ _id: req.params.postID });
        if (!post) {
            res.sendStatus(404);
            return;
        }
        let comments = await Comment.find({ post: post });
        res.send(comments);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//function to update the comments 
app.put('/api/posts/:postID/comments/:commentID', async(req, res) => {
    try {
        let comment = await Comment.findOne({ _id: req.params.commentID, post: req.params.postID });
        if (!comment) {
            res.sendStatus(404);
            return;
        }
        comment.username = req.body.username;
        comment.otherComment = req.body.otherComment;
        await comment.save();
        res.send(comment);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


//delete the Post from the database
app.delete('/api/posts/:postID/comments/:commentID', async(req, res) => {
    try {
        let comment = await Comment.findOne({ _id: req.params.commentID, post: req.params.postID });
        if (!comment) {
            res.sendStatus(404);
            return;
        }
        await comment.delete();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

/*//edit the Post
app.put('/api/Posts/:id', async(req, res) => {
    try {
        const Post = await Post.findOne({
            _id: req.params.id
        });
        Post.description = req.body.description;
        Post.topic = req.body.topic;
        await Post.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});*/

app.listen(4000, () => console.log('Server listening on port 4000!'));
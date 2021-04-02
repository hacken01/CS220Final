const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const mongoose = require('mongoose');
//get images from multer
const multer = require('multer');

// we can use localhost or the server
const upload = multer({
    dest: '../front-end/public/images/',
    limits: {
        fileSize: 10000000
    }
});

/*// List of comments 
const commentShema = new mongoose.Schema({
    username: String,
    post: String,
});*/

// create a scheme for Person in the post
const postSchema = new mongoose.Schema({
    name: String,
    username: String,
    personComment: String,
    //this is the path of the image
    path: String,
    /*commentSchema: new mongoose.Schema({
        username: String,
        post: String,
    })*/
});
// Create a model for the posts.
const Post = mongoose.model('Post', postSchema);
//const Comment = mongoose.model('Comment', commentSchema);

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

// connect to the database
mongoose.connect('mongodb://localhost:27017/twitcherest', {
    useNewUrlParser: true
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
// Get a list of all of the Posts in the .
app.get('/api/posts', async(req, res) => {
    try {
        let posts = await Post.find();
        res.send(posts);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
/** 

// Create a new Comment to post
app.post('/api/posts/:id', async(req, res) => {

    const post = await Post.findOne({
        _id: req.params.id
    });

    post.username = req.body.username;
    post.post = req.body.post;

    post.comments.push(new Comment)({ //FIX ME
        username: req.body.username,
        post: req.body.post,
    });
    try {
        await comment.save();
        res.send(comment);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


//delete the Post from the database
app.delete('/api/Posts/:id', async(req, res) => {
    try {
        await Post.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//edit the Post
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
});
**/

app.listen(4000, () => console.log('Server listening on port 4000!'));
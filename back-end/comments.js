const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

// setup express
const app = express();

// setup body parser middleware to conver to JSON and handle URL encoded forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const users = require("./users.js");
const posts = require("./posts.js");

//
// Commentss
//

const User = users.model;
const validUser = users.valid;

const Post = posts.model;
const validPost = posts.valid;

// This is the schema for a comment
const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: "Post"
    },
    comment: String,
    created: {
        type: Date,
        default: Date.now
    },
});

// The model for a comment
const Comment = mongoose.model('Comment', commentSchema);

// get comments -- will list comments that a user has submitted
router.get('/:id', validUser, async (req, res) => {
    let comments = [];
    //LOOK up post
    let post = await Post.findOne({ _id: req.params.id });
    if (!post) {
        console.log("Post not found");
        return res.sendStatus(500);
    }
    try {
        comments = await Comment.find({
            //user: req.user //DO I NEED TO CHANGE THIS IS PHOTO?
            post: post
        }).sort({
            created: -1
        }).populate('user');
        return res.send(comments);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// create a comment
router.post('/:id', validUser, async (req, res) => {
    let post = await Post.findOne({ _id: req.params.id }); //Do I need to populate by photo?

    if (!post) {
        console.log("Post now found");
        return res.sendStatus(500);
    }
    const comment = new Comment({
        comment: req.body.comment,
        user: req.user,
        post: post,
    });
    try {
        console.log(comment);
        await comment.save();
        return res.send(comment);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// edit a comment -- only edits status and response
router.put('/:postID/comments/:commentID', validUser, async (req, res) => {

    try {
        let comment = await Comment.findOne({ _id: req.params.commentID, post: req.params.postID });
        if (!comment) {
            res.sendStatus(404);
            return;
        }
        comment.comment = req.body.comment;
        await comment.save();
        res.send(comment);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});
//delete the Comment from the database
router.delete('/:postID/comments/:commentID', async (req, res) => {
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

module.exports = {
    routes: router
}
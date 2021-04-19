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
    try {
        let comments = await Comment.find({
            //user: req.user //DO I NEED TO CHANGE THIS IS PHOTO?
            post: post
        }).sort({
            created: -1
        }).populate('user');
        console.log("get comments was called");
        return res.send({
            comments: comments
        });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// create a comment
router.post('/:id', validUser, async (req, res) => {
    //LOOK up photo
    let post = await Post.findOne({ _id: req.params.id }).populate('user'); //Do I need to populate by photo?

    const comment = new Comment({
        comment: req.body.comment,
        user: req.user,
        post: post,
    });
    try {
        console.log("Post comment was called");
        console.log(comment);
        await comment.save();
        return res.send(comment);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// edit a comment -- only edits status and response
router.put('/:id', validUser, async (req, res) => {
    // can only do this if an administrator
    if (req.user.role !== "admin") {
        return res.sendStatus(403);
    }
    if (!req.body.status || !req.body.response) {
        return res.status(400).send({
            message: "status and response are required"
        });
    }
    try {
        console.log("edit a comment was called");
        comment = await comment.findOne({
            _id: req.params.id
        });
        await comment.save();
        return res.send({
            comment: comment
        });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
    routes: router
}
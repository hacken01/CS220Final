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

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
    dest: '../front-end/public/images/',
    limits: {
        fileSize: 50000000
    }
});

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    comment: {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    },
    path: String,
    title: String,
    description: String,
    created: {
        type: Date,
        default: Date.now
    },
});

const Post = mongoose.model('Post', postSchema);

// upload post
router.post("/", validUser, upload.single('post'), async (req, res) => {
    // check parameters
    if (!req.file)
        return res.status(400).send({
            message: "Must upload a file."
        });

    const post = new Post({
        user: req.user,
        path: "/images/" + req.file.filename,
        title: req.body.title,
        description: req.body.description,
    });
    try {
        await post.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get my posts
router.get("/", validUser, async (req, res) => {
    // return posts
    try {
        let posts = await Post.find({
            user: req.user
        }).sort({
            created: -1
        }).populate('user');
        return res.send(posts);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get all posts
router.get("/all", async (req, res) => {
    try {
        let posts = await Post.find().sort({
            created: -1
        }).populate('user');
        return res.send(posts);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get a single post
router.get("/:id", async (req, res) => {
    try {
        let post = await Post.findOne({ _id: req.params.id }).populate('user');
        return res.send(post);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});


module.exports = {
    model: Post,
    routes: router,
}
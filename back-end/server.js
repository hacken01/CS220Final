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
const { isInteger } = require('core-js/fn/number');
// we can use localhost or the server
const upload = multer({
    dest: '../front-end/public/images/',
    limits: {
        fileSize: 10000000
    }
});
// create a scheme for items in the museum
const itemSchema = new mongoose.Schema({
    id: Number,
    first_name: String,
    last_name: String,
    username: String,
    description: String,
    topic: String,
    //this is the path of the image
    path: String,
});

// Create a model for the posts.
const Item = mongoose.model('Item', itemSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
    // Just a safety check
    if (!req.file) {
        return res.sendStatus(400);
    }
    res.send({
        path: "/images/" + req.file.filename
    });
});

// connect to the database
mongoose.connect('mongodb://localhost:27017/twitch-erest', {
    useNewUrlParser: true
});

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/items', async (req, res) => {
    const item = new Item({


        title: req.body.title,
        description: req.body.description,
        path: req.body.path,
    });
    try {
        await item.save();
        res.send(item);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
    try {
        let items = await Item.find();
        res.send(items);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
//delete the item from the database
app.delete('/api/items/:id', async (req, res) => {
    try {
        await Item.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//edit the item
app.put('/api/items/:id', async (req, res) => {
    try {
        const item = await Item.findOne({
            _id: req.params.id
        });
        item.title = req.body.title;
        item.description = req.body.description;
        await item.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));

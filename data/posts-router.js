const Posts = require('./db.js');

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find();
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "The posts information could not be retrieved."})
    }
})

router.post('/', async (req, res) => {
    const newPost = req.body;
    console.log('in the if statemnet')
    if(newPost.title && newPost.contents) {
        try {
            const post = await Posts.insert(req.body)
            res.status(201).json(post);
        } catch(err) {
            console.log(err);
            res.status(500).json({
                error: "There was an error while saving the post to the database"
            })
        }
    } else {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post." 
        })
    }
});

module.exports = router;
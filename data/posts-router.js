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
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if(post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    } catch (err) {
        res.status(500).json({ error: "The post information could not be retrieved." })
    }
});

router.post('/', async (req, res) => {
    const newPost = req.body;
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

router.delete('/:id', async (req, res) => {
    try {
        const deletePost = await Posts.remove(req.params.id);
        if(req.body.length < 0) {
            res.status(200).json({ message: 'Tango down' });
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    } catch (err) {
        res.status(500).json({ error: "The post could not be removed" })
    }
});

router.put('/:id', async (req, res) => {

    const updatedPost = req.body;
    if (updatedPost.title || updatedPost.contents) {
        try {
            const post = await Posts.update(req.params.id, req.body);
            if(post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
        } catch (err) {
            res.status(500).json({ error: "The post information could not be modified"})
        }
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post" })
    }

});


module.exports = router;
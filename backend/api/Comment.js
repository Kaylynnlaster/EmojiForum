const express = require('express');
const router = express.Router();


const Comment = require('./../models/Comment.js');

router.get('/', async(req, res) => {
    try {
        const comment = await Comment.find({})
        res.status(200).json(comment);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "could not get comments"})
    }
})

router.get('/comment/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const comment = await Comment.findById(id);
        res.status(200).json(thread)
    } catch {
        res.status(500).json({message: error.message})
    }
})

router.post('/comment', async(req, res) => {
    //create a comment and save it
})

router.put('/comment/:id', async(req, res) => {
    //find the comment by the id and then update it with
    //the req.body
})

router.delete('/comment/:id', async(req, res) => {
    //delete the comment by the comment id
})

module.exports = router;
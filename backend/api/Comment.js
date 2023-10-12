const express = require('express');
const router = express.Router();


const Comment = require('./../models/Comment.js');

router.get('/', async(req, res) => {
    //find the comment by the thread id and then get
    //all of the comments for it
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
const express = require('express');
const router = express.Router();


const Comment = require('./../models/Comment.js');
const Thread = require('./../models/Thread.js');
const User = require('./../models/User.js');


const generateID = () => Math.random().toString(36).substring(2, 10);

router.get('/:userid/thread/:threadid/comments', async(req, res) => {
    try {
        const {threadid} = req.params;
        const threadID = await Thread.findById(threadid);
        const comments = await Comment.find({"threadID": threadID.id})
        res.status(200).json(comments);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Could not get comments"})
    }
})

router.get('/:userid/thread/:threadid/comment/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const comment = await Comment.findById(id);
        res.status(200).json(comment)
        res.status(200).json(thread);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/:userid/thread/:threadid/comment/create', async(req, res) => {
    //create a comment and save it

    //create the thread from the body
    let {content} = req.body;
    content = content.trim();
    

    //grab the user id from the params
    const {threadid} = req.params;
    

    //find the user using the id grabbed earlier
    const thread = await Thread.findById(threadid);
    const threadID = thread.id

    //Set the id for the comment for easier future reference
    let commentId = generateID();

    //get the user that is posting the comment
    const {userid} = req.params;
    const user = await User.findById(userid);

    //get time stamp
    const date = new Date()
    const createdAt = date.toLocaleDateString()

    //save the thread obj with the user element
    const newComment = new Comment({
        id: commentId,
        content,
        user,
        threadID,
        createdAt
        
    });

    newComment.save().then(result => {
        res.json({
            status: "Success",
            message: "Comment create successful",
            data: result
        })
    })
    .catch(err => {
        res.json({
            status: "Failed",
            message: "Error while saving the Comment"
        })
    })
})

router.put('/:userid/thread/:threadid/comment/:id', async(req, res) => {
    //find the comment by the id and then update it with
    //the req.body

    try {
        const{id} = req.params;
        const comment = await Comment.findByIdAndUpdate(id, req.body);
    
        if (!comment) {
            return res.json({
                status: "Failed",
                message: "No Comment with that id"
            })
        }
        const updatedComment = await Comment.findById(id)
        } catch (error) {
            res.json({
            status: "Success",
            message: "Comment successfully updated"
            }) 
        }
})

router.delete('/:userid/thread/:threadid/comment/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const comment = await Comment.findByIdAndDelete(id)
        if(!comment) {
           return res.json({
                status: "Failed",
                message: "No comment with that id"
            })
        }
        res.status(200).json(thread);
    } catch (error) {
        res.json({
            status: "Success",
            message: "Thread successfully deleted"
            }) 
    }
})

module.exports = router;
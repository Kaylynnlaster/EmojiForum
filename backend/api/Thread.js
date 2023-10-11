const express = require('express');
const router = express.Router();


const Thread = require('./../models/Thread.js');

router.get('/thread', async(req, res) => {
    try {
        const thread = await Thread.find({})
        res.status(200).json(thread);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "could not get threads"})
    }
})

router.post('/thread/create', async(req, res) => {

})

module.exports = router;
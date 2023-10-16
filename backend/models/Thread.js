const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    id: String,
    title: String,
    description : [{
        type: String
    }],
    createdAt : String,
    user: {
        username: String,
    }
});

const Thread = mongoose.model('Thread', ThreadSchema);

module.exports = Thread;
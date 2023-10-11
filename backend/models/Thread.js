const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    title: String,
    description : String,
    createdAt : Date,
    user: String,
    comment:
    [{
        user: String,
        content: String,
        commentTime: Date
    },
    {
        user: String,
        content: String,
        commentTime: Date
    }]
});

const Thread = mongoose.model('Thread', ThreadSchema);

module.exports = Thread;
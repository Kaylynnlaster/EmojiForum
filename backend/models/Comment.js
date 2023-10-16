const { Double } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    id: String,
    content: [{
        type: String
    }],
    user: {
        username: String,
    },
    threadID: String,
    createdAt: Date
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
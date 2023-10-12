const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: String,
    user: {
        username: String,
    },
    threadID: String,
    createdAt: Date
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
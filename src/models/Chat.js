const mongoose = require('../database/mongo');
const ChatSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;
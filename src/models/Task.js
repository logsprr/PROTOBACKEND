const mongoose = require('../database/mongo');
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    photo: {
        type: [],
        required: true
    },
    colaborators: {
        type: [],
        required: true
    },
    featers: {
        type: [],
        default: 'Ninguem',
        required: false
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

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
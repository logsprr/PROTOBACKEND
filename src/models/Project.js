const mongoose = require('../database/mongo');
const ProjectSchema = new mongoose.Schema({
    name: {
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
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;
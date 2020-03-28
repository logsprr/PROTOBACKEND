const mongoose = require('../database/mongo');
const DriveSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true
    },
    colaborator: {
        type: String,
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

const Drive = mongoose.model('Drive', DriveSchema);
module.exports = Drive;
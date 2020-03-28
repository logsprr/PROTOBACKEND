const mongoose = require('../database/mongo');
const EnterpriseSchema = new mongoose.Schema({
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

const Enterprise = mongoose.model('Enterprise', EnterpriseSchema);
module.exports = Enterprise;
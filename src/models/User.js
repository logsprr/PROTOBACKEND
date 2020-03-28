const mongoose = require('../database/mongo');
const bcryptjs = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    photoUrl: {
        type: String,
        required: false
    },
    enterprise: {
        type: String,
        required: false
    },
    occupation: {
        type: String,
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

UserSchema.pre('save', async function (next) {
    const newpassword = process.env.NODEBCRYPT + this.password;
    const hashpassword = await bcryptjs.hash(newpassword, 10);
    this.password = hashpassword;
    next();
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
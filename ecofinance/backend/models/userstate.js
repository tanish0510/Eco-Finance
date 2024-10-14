// models/UserState.js
const mongoose = require('mongoose');

const userStateSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    state: {
        type: String,
        required: true
    },
});

const UserState = mongoose.model('UserState', userStateSchema);
module.exports = UserState;
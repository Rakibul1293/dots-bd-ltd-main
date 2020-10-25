const mongoose = require('mongoose');

const userInfoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    songTitle: { type: String, required: true },
    artist: { type: String, required: true },
    image: { type: mongoose.Schema.Types.Mixed, required: true }
});

module.exports = mongoose.model('UserInfo', userInfoSchema);

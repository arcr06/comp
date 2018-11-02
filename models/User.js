const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    subscribed: {
        type: Array
    }
});

module.exports = User = mongoose.model('user', UserSchema);
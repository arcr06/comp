const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
            title: {
                type: String,
                required: true
            },
            desc: {
                type: String,
                required: true
            },
            people: {
                type: Array,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
});

    
module.exports = Event = mongoose.model('event',EventSchema);
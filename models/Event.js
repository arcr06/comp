const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
            title: {
                type: String,
                required: true
            },
            round: {
                type: Number
            },
            desc: {
                type: String 
            },
            people: [
                {
                    name: {
                        type: String 
                    },
                    status: {
                        type: Boolean,
                        default: false
                    },
                    round: {
                        type: Number
                    }
                }
            ],
            date: {
                type: Date,
                default: Date.now
            }
});

    
module.exports = Event = mongoose.model('event',EventSchema);
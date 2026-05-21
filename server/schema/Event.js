const mongoose = require("mongoose")
const Schema = mongoose.Schema


const eventSchema = new Schema({

    eventName: String,

    description: {
        type: String,
        required: false
    },

    eventType: { 
    type: String,
    enum: ["party","social", "infosession", "meeting", "misc."],
    default: "misc.",
    required: true
    },
    

    date: {
        type: Date,
        required: true
    }

})


module.exports = mongoose.model("Event", eventSchema)
const mongoose = require("mongoose")
const Schema = mongoose.Schema


const eventSchema = new Schema({

    athleteName: String,

    athleteRecord: {
        type: String,
        required: true
    },

    eventType: { 
    type: String,
    enum: ["shotput", "discus", "100m", "200m", "lj", "800m"],
    
    required: true
    },
    

    date: {
        type: Date,
        required: true
    }

})


module.exports = mongoose.model("Event", eventSchema)
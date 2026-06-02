const mongoose = require("mongoose")
const Schema = mongoose.Schema


const profileSchema = new Schema({

    athleteName: String,

    athleteRecord: {
        type: String,
        required: true
    },

    eventType: { 
    type: String,
    enum: ["shotput", "discus", "long jump", "triple jump", "100m", "200m", "400m", "800m", "1600m", "3200", "100h", "300h"],
    
    required: true
    },
    

    date: {
        type: Date,
        required: true
    }

})


module.exports = mongoose.model("Profile", profileSchema)
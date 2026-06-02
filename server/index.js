const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();

const database = require('./profileDatabase.js')
database.connect(app)
const ProfileModel = require("./schema/Profile.js")


// console.log(database)
// Middleware
app.use(cors());
app.use(express.json());



app.get('/profileDB', (req, res) => {
    console.log("doing a get")

    

        const athleteGet = req.query.athleteName;

        if (athleteGet) {
        ProfileModel.find({ athleteName: athleteGet })
            .then(doc => {
                console.log(doc);
                res.json(doc); 
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: "Failed to fetch athelete" });
            });
    } else {
        ProfileModel.find({})
            .then(doc => {
                res.json(doc);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: "Failed to fetch athlete" });
            });
    }
});



app.post('/profileDB', (req, res) => {

    try {
        console.log("Posting New Profile", req.body)

        const {athleteName, athleteRecord, eventType, date} = req.body
        

    
        const addProfile = new ProfileModel({
            athleteName: athleteName,
            athleteRecord: athleteRecord,
            eventType: eventType,
            date: date
        })

        addProfile.save()
            .then(doc => {
                console.log("Profile added to DB", doc)
                res.status(201).json({message: "profile saved in db", data: doc})
            })
            .catch(err => {
                console.error("database save failed", err)
                res.status(500).json({message: "failed to save profile"})
            })
    } catch (error){
        console.error(error)
        res.status(500).json({message: "server error"})
    }


   
        
    })



app.delete('/profileDB', async (req, res) => {
    try {console.log('deleting something from db')

        const deletedProfile = await ProfileModel.findOneAndDelete({
            eventType: "shotput"
        });

        if (!deletedProfile) {
            return res.status(404).json({ message: "No profile to delete." });
        }

        res.status(200).json({
            message: "Object(s) deleted",
            data: deletedProfile,
           
        })
        
    }
        catch (error) {
            console.error(error)
        }

   
})



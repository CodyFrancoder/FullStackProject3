const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();

const database = require('./eventDatabase.js')
database.connect(app)
const EventModel = require("./schema/Event.js")


// console.log(database)
// Middleware
app.use(cors());
app.use(express.json());



app.get('/eventDB', (req, res) => {
    console.log("doing a get")

    

        const athleteGet = req.query.athleteName;

        if (athleteGet) {
        EventModel.find({ athleteName: athleteGet })
            .then(doc => {
                console.log(doc);
                res.json(doc); 
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: "Failed to fetch athelete" });
            });
    } else {
        EventModel.find({})
            .then(doc => {
                res.json(doc);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: "Failed to fetch athlete" });
            });
    }
});



app.post('/eventDB', (req, res) => {
    try{
    console.log("posting new event")

    let addEvent2 = new EventModel({

        athleteName: "Ashwin Prabhu",
        athleteRecord: "2:06", 
        eventType: "800m",
        date: new Date("2026-05-31")

        })

        addEvent2.save()

        .then(doc => {
            console.log("user " +doc.name+ " added to the database")
            console.log(doc)
            })
        .then(res.send("user saved to DB"))
    }
            catch (error) {
            console.error(error)
            }

        
    })


app.delete('/eventDB', async (req, res) => {
    try {console.log('deleting something from db')

        const deletedEvent = await EventModel.findOneAndDelete({
            eventType: "shotput"
        });

        if (!deletedEvent) {
            return res.status(404).json({ message: "No event to delete." });
        }

        res.status(200).json({
            message: "Object(s) deleted",
            data: deletedEvent,
           
        })
        
    }
        catch (error) {
            console.error(error)
        }

   
})



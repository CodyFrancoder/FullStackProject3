const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// const database = require('./eventDatabase.js')
const EventModel = require("./schema/Event.js")

// Middleware
app.use(cors());
app.use(express.json());

// The "Hello World" Route
app.get('/eventDB', (req, res) => {
  res.json({ message: "Hello from the MERN Server!" });
});


app.get('/eventDB', (req, res) => {
    EventModel.find({
        //put in here whatever you want the front end to send
    })
    .then(doc => {
        res.send(doc)
        console.log(doc)
    })
});





// Database Connection
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log("DB Connection Error:", err));

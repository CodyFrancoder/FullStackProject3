const mongoose = require('mongoose');
const eventModel = require('./schema/Event')

const server = '127.0.0.1:27017';
const database = 'events';  	


class Database {
  constructor() {
	this._connect()
  }

  _connect() {
 	mongoose.connect(`mongodb://${server}/${database}`)
   	.then(testingSavingEvent())
   	.catch(err => {
     	console.error('Database connection error')
   	})
  }
}

function testingSavingEvent(){

    console.log("database connection successful")

    let event = new EventModel({
        eventName: "Assembly Performance",
        eventType: "infosession",
        date: 2026-10-9

    })

    event.save()
    .then(doc => {
        console.log("Event " + doc.name + "added to the database")
        console.log(doc)
    })
    .catch(err => {
        console.error(err)
    })
}

module.exports = new Database()
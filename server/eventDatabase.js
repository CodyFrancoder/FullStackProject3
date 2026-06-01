const mongoose = require('mongoose');
const eventModel = require('./schema/Event')

require('dotenv').config();




const server = '127.0.0.1:27017';
const database = 'eventDB';  	

const PORT = process.env.PORT || 5000;


class Database {
  constructor() {
	// this._connect()
  }

  connect(app) {
    console.log("connecting to database with App passed")
 	mongoose.connect(process.env.MONGO_URI)
    
   	.then(() =>{
        console.log("DB Connected")
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


     

    })

   	.catch(err => console.log("DB Connection Error:", err));
  }
}



module.exports = new Database()



import { useState } from 'react'
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios';
 

import './App.css'

function App() {

const [event, setEvent] = useState([])
const [eventTime, setEventTime] = useState([])
const [nameSearchQuery, setNameSearchQuery] = useState("")

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/eventDB');
        console.log("Initial data: " + response.data); 
        setEvent("data one " + response.data)
        console.log("not the data one " +response)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, []);

  




  // SUBMIT FUNCTION
  function handleSearch(e){

    e.preventDefault();

    console.log("Submitting");

    //  let athleteTest = "Nicholas Li"

        const fetchAthlete = async (athleteGet) => {
          console.log("running fetch athlete")
          
          try {
            const response = await axios.get('http://localhost:5000/eventDB', {
            params: {athleteName: athleteGet, eventRecord: athleteGet} 
        
            });
            console.log("Search result: " + response.data);
            setEvent(response.data);

          } catch (error) {
              console.error(error)
          }
        }

    fetchAthlete(nameSearchQuery);
    
  } 


  //ADD EVENT FUNC
  function handlePost(e){
    e.preventDefault()
  //   console.log("Posting new user")

  //   let 
    
  //   axios.post('/eventDB', postEvent)

  }
  
    


  return (
    <>
  
      <h1>Track Tracker</h1>



      {/* INPUT SEARCH FUNCTION & GET FROM BACKEND */}
      <>
        <form method="post" onSubmit={handleSearch}>
          <label>
            Profile Search: <input 
              name = "eventSearch" 
              value={nameSearchQuery} 
              onChange={(e) => setNameSearchQuery(e.target.value)} 
              placeholder='Search Athlete'>
              </input>

          </label>
          <button type="submit">
            submit search: 
          </button>
        </form>
      </>


      <>
        <p>
          Example Profile: {event.length > 0 ? event[0].eventName || event[0].eventType : "No events found"}
        </p>

      </>

      <>
        <h2>New Profile</h2>
        <form method='post' onSubmit={handlePost}>
          <button>
            Submit Profile
          </button>
        </form>
      </>



    </>
  )
}


export default App

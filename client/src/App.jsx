import { useState } from 'react'
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios';
 

import './App.css'

function App() {


//SEARCH RESULT FEATURE + DATA
const [event, setEvent] = useState([])
const [nameSearchQuery, setNameSearchQuery] = useState("")

//NEW PROFILE DATA NEEDED
const[athleteName, setAthleteName] = useState("")
const [athleteRecord, setAthleteRecord] = useState("")
const[eventType, setEventType] = useState("")
const[date, setDate] = useState("")



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
            const response = await axios.get('http://localhost:5000/eventDB', 
            {params: {athleteName: athleteGet, eventRecord: athleteGet}});

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
    console.log("Posting new user")

    const newProfile = {
      athleteName,
      athleteRecord,
      eventType,
      date
    };

    // try{
    //   const response = await axios.post('http://localhost:5000/eventDB', newProfile);
    //   console.log(response.data);
    //   alert("New Profile Saved")

    //   setAthleteName("");
    //   setAthleteRecord("");
    //   setEventType("");
    //   setDate("");

    // } catch (error){
    //   console.error("Could not save event" + error)
    // }


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
        <h3>Results</h3>
        {Array.isArray(event) && event.length > 0 ? 
          (event.map((ev, index) => (
            <p key={index}> 
            <strong>{ev.athleteName}</strong>:
            <p/>
            <p>Event: {ev.eventType}</p>
            <p/>
            <p>Record: {ev.athleteRecord}</p>
            <p/>
            <p>Date Set: {ev.date}</p>
            </p>

            )
          )
        ) : (
          <p>Athlete Not Found</p>
        )}

      </>

      
      <hr/>
      <hr/>



      <>
        <h2>New Profile</h2>
        <form method='post' onSubmit={handlePost}>

          <label>
            <input
            type = "text" 
            value = {athleteName}
            placeholder = "Athlete Name"
            onChange={(e) => setAthleteName(e.target.value)} 
            />
          </label>
          
           <p></p>

          <label>
            <input
            type = "text" 
            value = {eventType}
            placeholder = "Event"
            onChange={(e) => setEventType(e.target.value)}
            />
          </label>

          <p></p>


          <label>
            <input
            type = "text" 
            value = {athleteRecord}
            placeholder = "Record"
            onChange={(e) => setAthleteRecord(e.target.value)}
            />
          </label>

           <p></p>
          

          <label>
            <input
            type = "text" 
            value = {date}
            placeholder = "Date Set"
            onChange={(e) => setDate(e.target.value)}
            />
          </label>



         <p></p>

          <button type='submit'>
            Submit Profile
          </button>
        </form>
      </>



    </>
  )
}


export default App

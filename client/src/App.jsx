import { useState } from 'react'
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios';
 

import './App.css'

function App() {


//SEARCH AND RESULT + DATA
const [profile, setProfile] = useState([])
const [nameSearchQuery, setNameSearchQuery] = useState("")

//NEW PROFILE DATA NEEDED
const[athleteName, setAthleteName] = useState("")
const [athleteRecord, setAthleteRecord] = useState("")
const[eventType, setEventType] = useState("")
const[date, setDate] = useState("")



 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profileDB');
        console.log("Initial data: " + response.data); 
        setProfile("data one " + response.data)
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

        const fetchAthlete = async (athleteGet) => {
          console.log("running fetch athlete")
          
          try {
            const response = await axios.get('http://localhost:5000/profileDB', 
            {params: {athleteName: athleteGet, eventRecord: athleteGet}});

            console.log("Search result: " + response.data);
            setProfile(response.data);

          } catch (error) {
              console.error(error)
          }
        }

    fetchAthlete(nameSearchQuery);
    
  } 


  //ADD PROFILE 
  async function handlePost(e){
    e.preventDefault()
    console.log("Posting new user")

    const newProfile = {
      athleteName,
      athleteRecord,
      eventType,
      date
    };


    try {
      const response = await axios.post('http://localhost:5000/profileDB', newProfile);
      console.log(response.data);
      alert("New Profile Saved")

      setAthleteName("");
      setAthleteRecord("");
      setEventType("");
      setDate("");

    } catch (error){
      console.error("Could not save profile" + error)
    }


  }
  
    


  return (
    <>
  
      <h1>Track Tracker</h1>

      {/* INPUT SEARCH FUNCTION & GET FROM BACKEND */}
      <div>
        <form method="post" onSubmit={handleSearch}>
          <label>
            Profile Search: <input 
              name = "profileSearch" 
              value={nameSearchQuery} 
              onChange={(e) => setNameSearchQuery(e.target.value)} 
              placeholder='Search Athlete'>
              </input>

          </label>
          <button type="submit">
            submit search: 
          </button>
        </form>
      </div>
      


      <div>
        <h3>Results</h3>
        {Array.isArray(profile) && profile.length > 0 ? 
          (profile.map((ev, index) => (
            <div key={index}> 
            <strong>{ev.athleteName}</strong>:
            <div/>
            <p>Event: {ev.eventType}</p>
            <div/>
            <p>Record: {ev.athleteRecord}</p>
            <div/>
            <p>Date Set: {ev.date}</p>
            </div>
            )
          )
        ) : (
          <p>Athlete Not Found</p>
        )}

      </div>

      
      
  

      <div>
        
        <h2>Add New Profile</h2>
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

          <label htmlFor="events" value = {eventType} placeholder = "Event" >
            <select id = "events" name = "events" onChange={(e) => setEventType(e.target.value)}>
              

              <option value="">-- Select an Event --</option>
              <option value ="shotput">shotput</option>
              <option value = "discus">discus</option>
              <option value = "long jump">long jump</option>
              <option value = "triple jump">triple jump</option>
              <option value = "100m">100m</option>
              <option value = "200m">200m</option>
              <option value = "400m">400m</option>
              <option value = "800m">800m</option>
              <option value = "1600m">1600m</option>
              <option value = "3200m">3200m</option>
          
            
              
              
              
            </select>

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
            type = "date" 
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
      </div>



    </>
  )
}


export default App

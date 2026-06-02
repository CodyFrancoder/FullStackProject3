import { useState } from 'react'
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios';
 

import './App.css'

function App() {


//SEARCH AND RESULT + DATA
const [profile, setProfile] = useState([])
const [nameSearchQuery, setNameSearchQuery] = useState("")

//PUT EDIT PROFILE DATA
const [editingId, setEditingId] = useState(null)

//NEW PROFILE DATA NEEDED
const[athleteName, setAthleteName] = useState("")
const [athleteRecord, setAthleteRecord] = useState("")
const[eventType, setEventType] = useState("")
const[date, setDate] = useState("")




const makeEventDateFormatNicer = (dateString) => {
  if (!dateString) return "";
  return dateString.split("T")[0];
}
  


  // SUBMIT FUNCTION (GET)
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


  //ADD PROFILE (POST)
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
//PUT REQUEST
      if (editingId) { 
        console.log("updating profile data");
        const respons = await axios.put(`http://localhost:5000/profileDB/${editingId}`, newProfile);
         alert("Profile Update Saved");

        setProfile(prevProfiles => prevProfiles.map(ev => ev._id === editingId ? respons.data.data : ev))
        setEditingId(null);

      } else {
//POST REQUEST
      const response = await axios.post('http://localhost:5000/profileDB', newProfile);
      console.log(response.data);
      alert("New Profile Saved");
      }


  //Reset form afte sumbtiting
      setAthleteName("");
      setAthleteRecord("");
      setEventType("");
      setDate("");

    } catch (error){
      console.error("Could not save profile" + error);
    }


  }
  

  //EDIt PROFILE (pUT)

  function handleEditClick(ev){
    setEditingId(ev._id)
    setAthleteName(ev.athleteName);
    setAthleteRecord(ev.athleteRecord);
    setEventType(ev.eventType);
    setDate(makeEventDateFormatNicer(ev.date));


  }
    
//DELET E PROFILE (DELETE)

async function handleDelete(id){

  try{
    await axios.delete(`http://localhost:5000/profileDB/${id}`)
    alert("Profile Deleted")

    setProfile(prevProfiles => prevProfiles.filter(ev => ev._id !== id));

  }catch (error){
  console.error("delete did not work", error)
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
        <hr />
        <h3>Results</h3>
        {Array.isArray(profile) && profile.length > 0 ? 
          (profile.map((ev, index) => (
            <div key={index} style={{padding: '30px'}}> 
            <strong>{ev.athleteName}</strong>:
            <div style={{padding: '10px'}}/>
            <p>Event: {ev.eventType}</p>
            <div style={{padding: '3px'}}/>
            <p>Record: {ev.athleteRecord}</p>
            <div style={{padding: '3px'}}/>
            <p>Date Set: {makeEventDateFormatNicer(ev.date)}</p>

            <button type = "button" onClick = {()=> handleEditClick(ev)}>
              Edit Profile
            </button>

            <button type = "button" onClick = {() => handleDelete(ev._id)}>
            Delete Profile
            </button>


            </div>
            )
          )
        ) : (
          <p>Athlete Not Found</p>
        )}

      </div>

      
      
  

      <div>
        <hr />
        
        <h2>{editingId ? "Edit Profile" : "Add New Profile"}</h2>
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
              <option value ="shotput">Shotput</option>
              <option value = "discus">Discus</option>
              <option value = "long jump">Long Jump</option>
              <option value = "triple jump">Triple Jump</option>
              <option value = "100m">100 Meters</option>
              <option value = "200m">200 Meters</option>
              <option value = "400m">400 Meters</option>
              <option value = "800m">800 Meters</option>
              <option value = "1600m">1600 Meters</option>
              <option value = "3200m">3200 Meters</option>
              <option value = "100h">100 Meter Hurdles</option>
              <option value = "300h">300 Meter Hurdles</option>
          
            
              
              
              
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

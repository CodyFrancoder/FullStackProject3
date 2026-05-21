import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState("")

  function handleSubmit(e){

    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)

    const formJson = object.fromEntries(formData.entries())
    console.log(formJson)

  }

  // const handleSearch = () =>{
  //   console.log("button clicked")
  // }

  return (
    <>
  
  
    <h1>Event Planner</h1>



    {/* INPUT SEARCH FUNCTION & GET FROM BACKEND */}
    <>
      <label>
        Search Event: <input name = "eventSearch"/>
      </label>
      <button onClick={handleSubmit}>
        search: 
      </button>
    </>



  </>
  )
}

export default App

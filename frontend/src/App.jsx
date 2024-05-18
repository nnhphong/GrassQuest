import Navbar from "./Navbar"
import Game from "./Game"
import { useState } from 'react';

function App() {
  const [view, setView] = useState("ingame");

  return (
    <>
      <Navbar setView={setView}/>
      {
        view == "home" ? 
          <div className="text-3xl font-bold underline">Hello, World!</div> 
        : view == "ingame" ? 
          <Game setView={setView}/>

        : <div></div>
        }
    </>
  )
}

export default App

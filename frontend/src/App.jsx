import Navbar from "./Navbar"
import Game from "./Game"
import { useState, useEffect } from 'react';
import Body from "./body"
import Instructions from "./instructions"

function App() {
  const [view, setView] = useState("home");

  return (
    <div className="h-dvh">
      <Navbar setView={setView}/>
      {
        view == "home" ? 
          <Body setView={setView}/>
        : view == "ingame" ? 
          <Game setView={setView}/> 
        : view == "instructions" ?
          <Instructions setView={setView}/>
        : <div></div>
        }
    </div>
  )
}

export default App

import Navbar from "./Navbar"
import Game from "./Game"
import { useState } from 'react';
import Body from "./body"
import Instructions from "./instructions"

function App() {
  const [view, setView] = useState("home");

  return (
    <>
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
    </>
  )
}

export default App

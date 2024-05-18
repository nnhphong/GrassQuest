import Navbar from "./Navbar"
import Game from "./Game"
import { useState } from 'react';
import Body from "./body"

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
      <Navbar />
      <Body />
      <div class="text-3xl font-bold underline">Hello, World!</div>
    </>
  )
}

export default App

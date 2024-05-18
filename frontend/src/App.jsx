import Navbar from "./Navbar"
import Game from "./Game"
import { useState, useEffect } from 'react';
import Body from "./body"
import Instructions from "./instructions"

function App() {
  const [view, setView] = useState({
    current: "home",
    previous: "home"
  });

  function changeView(target){
    setView({current: target,
             previous: view.current
            }); 
  }
  
  return (
    <div className="h-dvh">
      <Navbar setView={changeView}/>
      {
        view.current == "home" ? 
          <Body setView={changeView}/>
        : view.current == "ingame" ? 
          <Game setView={changeView}/> 
        : view.current == "instructions" ?
          <Instructions setView={changeView} prevView={view.previous}/>
        : <div></div>
        }
    </div>
  )
}

export default App

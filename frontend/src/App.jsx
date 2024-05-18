import Navbar from "./Navbar"
import Game from "./Game"
import { useState } from 'react';
import Body from "./body"
import Instructions from "./instructions"
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3000");

function App() {
  const [view, setView] = useState({
    current: "home",
    previous: "home"
  });
  
  var [targetLocation, setTargetLocation] = useState({"lat": 0, "lon": 0});

  function getNewTarget(){
    socket.emit("requestNewQuest");
    socket.on("newQuest", (args)=>{
      setTargetLocation({
        "lat": args.DLat,
        "lon": args.DLon,
      });
      console.log(args.DLat)
    });
  }
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
          <Body setView={changeView} getNewTarget={getNewTarget}/>
        : view.current == "ingame" ? 
          <Game setView={changeView} socket={socket} targetLocation={targetLocation}/> 
        : view.current == "instructions" ?
          <Instructions setView={changeView} prevView={view.previous}/>
        : <div></div>
        }
    </div>
  )
}

export default App

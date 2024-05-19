import Navbar from "./Navbar"
import Game from "./Game"
import { useState, useEffect } from 'react';
import Body from "./body"
import Instructions from "./instructions"
import io from 'socket.io-client'
import Leaderboard from "./Leaderboard"
import Gallery from "./Gallery"
const socket = io.connect("http://localhost:3000");

function App() {
  const [view, setView] = useState({
    current: "home",
    previous: "home"
  });
  
  var [targetLocation, setTargetLocation] = useState({"lat": 0, "lon": 0, "name": ""});
  var [hintsList, updateHintsList] = useState([]);
  var [playing, setPlaying] = useState(false);

  function getNewTarget(){
    socket.emit("requestNewQuest");
    socket.on("newQuest", (args)=>{
      setTargetLocation({
        "lat": args.DLat,
        "lon": args.DLon,
        "name": args.Name
      });
    });
  }
  function changeView(target){
    if (view.current == target){
      return;
    }
    setView({current: target,
             previous: view.current
            }); 
  }

  return (
    <div className="h-dvh">
      <Navbar setView={changeView}/>
      {
        view.current == "home" ? 
          <Body setView={changeView} getNewTarget={getNewTarget} playing={playing} setPlaying={setPlaying}/>
        : view.current == "ingame" ? 
          <Game setPlaying = {setPlaying} setView={changeView} socket={socket} targetLocation={targetLocation} hintsList={hintsList} updateHintsList={updateHintsList} getNewTarget={getNewTarget}/> 
        : view.current == "instructions" ?
          <Instructions setView={changeView} prevView={view.previous}/>
        : view.current == "leaderboard" ? <Leaderboard setView={changeView} prevView={view.previous} socket={socket}/> : 
        // Target Location should be name
        view.current == "gallery" ? <Gallery socket={socket} name={targetLocation.name} /> : <div></div>
        }
    </div>
  )
}

export default App
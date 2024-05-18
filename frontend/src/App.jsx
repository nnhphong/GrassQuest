import Navbar from "./Navbar"
import Game from "./Game"
import { useState } from 'react';
import Body from "./body"
import Instructions from "./instructions"
import io from 'socket.io-client'
import Leaderboard from "./Leaderboard"
const socket = io.connect("http://localhost:3000");

function App() {
  const [view, setView] = useState({
    current: "home",
    previous: "home"
  });
  
  var [targetLocation, setTargetLocation] = useState({"lat": 0, "lon": 0});
  var [hintsList, updateHintsList] = useState([]);
  var [playing, setPlaying] = useState(false);

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
          <Game setView={changeView} socket={socket} targetLocation={targetLocation} hintsList={hintsList} updateHintsList={updateHintsList}/> 
        : view.current == "instructions" ?
          <Instructions setView={changeView} prevView={view.previous}/>
        : view.current == "leaderboard" ? <Leaderboard setView={changeView} prevView={view.previous}/> : <div></div>
        }
    </div>
  )
}

export default App

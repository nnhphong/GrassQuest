import Player from './Player'
import { useState, useEffect } from 'react';

function Leaderboard({setView, prevView, socket}) {
    var [leaderboard, updateLeaderboard] = useState([]); // get from API

    useEffect(() => {
        socket.emit("requestRankedLeaderboard");
        socket.on("rankedLeaderboard", (args)=>{
            updateLeaderboard(list(args));
        })
    }, []);

    console.log(leaderboard)
    var toDisplay = leaderboard;
    if (leaderboard.length > 10){
        toDisplay = leaderboard.slice(0, Math.min(leaderboard.length, 10))
    }
    return (
      <div className="bg-[url(./assets/test.jpg)] h-[calc(100vh-5rem)] pb-20 bg-cover flex flex-col justify-center items-center">
          <h1 className = "px-4 pt-10 pb-3 text-center text-4xl font-bold">Leaderboard</h1>
          {toDisplay}
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold text-l py-4 px-8 rounded w-1/2" onClick={()=>{
                setView(prevView);
            }}>Back</button>
      </div>
      
    )
  }
  
  export default Leaderboard
  
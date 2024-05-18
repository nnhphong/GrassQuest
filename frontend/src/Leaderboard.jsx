import Player from './Player'
import { useState, useEffect } from 'react';

function Leaderboard({setView, prevView}) {
    var [leaderboard, updateLeaderboard] = useState([]); // get from API

    useEffect(() => {
        updateLeaderboard([
        <Player text={"1. Player 1 - 50 points"} key={1}/>, 
        <Player text={"2. Player 2 - 37 points"} key={2}/>, 
        <Player text={"3. Player 3 - 20 points"} key={3}/>, 
        <Player text={"4. Player 4 - 19 points"} key={4}/>, 
        <Player text={"5. Player 5 - 15 points"} key={5}/>, 
        <Player text={"6. Player 6 - 14 points"} key={6}/>, 
        <Player text={"7. Player 7 - 12 points"} key={7}/>, 
        <Player text={"8. Player 8 - 10 points"} key={8}/>, 
        <Player text={"9. Player 9 - 5 points"} key={9}/>, 
        <Player text={"10. Player 10 - 2 points"} key={10}/>, 
    ])
    }, []);

    console.log(leaderboard)
    var toDisplay = leaderboard;
    if (leaderboard.length > 10){
        toDisplay = leaderboard.slice(0, Math.min(leaderboard.length, 10))
    }
    return (
      <div className="bg-[url(./assets/test.jpg)] h-[calc(100vh-5rem)] pb-20 bg-cover flex flex-col justify-center items-center">
          <h1 className = "px-4 pt-10 pb-3 text-center text-6xl font-bold">Leaderboard</h1>
          {toDisplay}
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-4 px-8 rounded w-1/2" onClick={()=>{
                setView(prevView);
            }}>Back</button>
      </div>
      
    )
  }
  
  export default Leaderboard
  
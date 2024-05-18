import Monument from "./assets/monument1.jpg"
import { useState, useEffect } from 'react';
import Hint from "./Hint"

function Game({setView, setPlaying, socket, targetLocation, hintsList, updateHintsList}) {

    // var [direction, setDirection] = useState("Loading...");
    var [location, setLocation] = useState({"lat": 0, "lon": 0});

    var dataToSend = {};
    dataToSend['desiredLat'] = targetLocation.lat;
    dataToSend['desiredLon'] = targetLocation.lon;
    dataToSend['userName'] = "test";

    function addHint(text){
        updateHintsList([...hintsList, <Hint text={"Hint " + (hintsList.length+1) + ": " + text} key={hintsList.length}/>]);
    }

    console.log(hintsList);
    
    function updatePositionsNow(position)
    {
            setLocation({"lat": position.coords.latitude, "lon": position.coords.longitude});
    }
    
    dataToSend['LatiPosition'] = location.lat;
    dataToSend['LongPosition'] = location.lon;

    useEffect(() => {
        const interval = setInterval(() => {
            navigator.geolocation.watchPosition(updatePositionsNow);
        }, 10000);
      
        return () => {
          clearInterval(interval);
        };
    }, []); // has no dependency - this will be called on-component-mount

    var hintsToDisplay = hintsList;
    if (hintsList.length > 3){
        hintsToDisplay = hintsList.slice(Math.max(hintsList.length - 3, 0))
    }
    return (
        <div className="bg-slate-800 bg-cover flex flex-col items-center justify-center h-[calc(100vh-5rem)] pb-5 lg:h-auto lg:justify-normal lg:pt-10">
            <div className="text-4xl font-bold text-white">Current Target</div>
            {/* <div className="text-xl pt-2 font-bold text-white">{direction}</div> */}
            <div className="w-9/12 pt-4 flex">
                <img src={Monument} className="pt-4 w-full"/>
            </div>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-9/12 h-12 relative">
                <input
                    type="file"
                    name="myImage"
                    className="text-center opacity-0 absolute top-0 bottom-0 left-0 right-0 m-auto z-50"
                    accept="image/*"
                    onChange={(event) => {
                        console.log(event.target.files[0]);
                        setPlaying(false);
                        setView("home");
                        updateHintsList([]);
                    }}
                />
                <div className="flex flex-col justify-center itemes-center absolute top-0 bottom-0 left-0 right-0 m-auto text-white h-12 w-9/12s" >
                    <div>Submit Image</div>
                </div>
            </button>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-9/12 h-12" onClick={()=>{
                navigator.geolocation.watchPosition(updatePositionsNow);

                // Emit the data!
                socket.emit("requestData", dataToSend);
        
                socket.on("returnedData", (args) => {
                    addHint("The target is " + args + " from your current location");
                })

            }}>
                Hint
            </button>
            {hintsList.length ? <div className="pt-2 flex flex-col justify-center items-center">{hintsToDisplay}</div> : null}

        </div>
    )
}

export default Game

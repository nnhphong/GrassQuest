import Picture from "./Picture"
import { useState, useEffect } from 'react';


// eslint-disable-next-line react/prop-types
function Gallery({socket, name}) {
    var [picslist, updatePicslist] = useState([]); // get from API

    useEffect(() => {
        socket.emit("getallAchievers", name);
        var newPicsList = [];
        socket.on("allAchievers", (args) => {
            args.forEach((pic) => {
                newPicsList.push(<Picture key={pic} url={"http://localhost:3000/static/" + pic.replaceAll(" ", "").replaceAll(".M", "M")}/>)
            })
            updatePicslist(newPicsList)
        });
    }, []);

    console.log(picslist)

    return (
        <>
            <div className="m-5 flex flex-col items-center">
                {picslist}
            </div>
        </>
    )
  }
  
  export default Gallery
  
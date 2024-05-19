import Picture from "./Picture"
import { useState, useEffect } from 'react';


// eslint-disable-next-line react/prop-types
function Gallery({socket, name}) {
    var [picslist, updatePicslist] = useState([]); // get from API

    useEffect(() => {
        // call socket with name of destination
        updatePicslist([
            <Picture url="https://static.vecteezy.com/system/resources/thumbnails/025/220/125/small_2x/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg"/>,
            <Picture url="https://static.vecteezy.com/system/resources/thumbnails/025/220/125/small_2x/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg"/>,
            <Picture url="https://static.vecteezy.com/system/resources/thumbnails/025/220/125/small_2x/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg"/>,
            <Picture url="https://static.vecteezy.com/system/resources/thumbnails/025/220/125/small_2x/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg"/>,
        ])
    }, []);

    return (
        <>
            <div className="m-5 flex flex-col items-center">
                {picslist}
            </div>
        </>
    )
  }
  
  export default Gallery
  
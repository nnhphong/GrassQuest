// eslint-disable-next-line react/prop-types
function Body({setView, getNewTarget, playing, setPlaying}) {
  return (
    <div className="bg-[url(./assets/test.jpg)] h-[calc(100vh-5rem)] pb-20 bg-cover flex flex-col justify-center">
        <h1 className = "px-4 pt-10 pb-3 text-center text-5xl font-bold">Hello User!</h1>
        <h2 className = "px-4 pt-3 pb-6 text-center text-wrap text-3xl">Want to start an adventure? Press the button below to recieve an image of a mounument you have to find!</h2>
        <div className="flex justify-center my-2">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-4 px-8 rounded w-1/2" onClick={()=>{
              setView("ingame");
              if (!playing){
                getNewTarget();
                setPlaying(true);
              }
            }}>Navigate</button>
        </div>
        {/* <div className="flex justify-center my-2">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-4 px-8 rounded w-1/2" onClick={()=>{
              setView("instructions");
            }}>Instructions</button>
        </div> */}
    </div>
  )
}

export default Body

// eslint-disable-next-line react/prop-types
function Body({setView}) {
  return (
    <div className="bg-[url(./assets/test.jpg)] h-dvh pb-10 bg-cover flex flex-col justify-center">
        <h1 className = "px-2 pt-10 pb-3 text-center text-5xl font-bold">Hello User!</h1>
        <h2 className = "px-2 py-3 text-center text-wrap text-3xl">Want to start an adventure?</h2>
        <div className="flex justify-center my-2">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-4 px-8 rounded w-1/2" onClick={()=>{
              setView("ingame");
            }}>Navigate</button>
        </div>
        <div className="flex justify-center my-2">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-4 px-8 rounded w-1/2" onClick={()=>{
              setView("instructions");
            }}>Instructions</button>
        </div>
    </div>
  )
}

export default Body

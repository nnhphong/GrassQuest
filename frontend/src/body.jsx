// eslint-disable-next-line react/prop-types
function Body({setView}) {
  return (
    <>
        <h1 className = "px-2 py-10 text-center text-7xl">Hello User!</h1>
        <h2 className = "px-2 py-2 text-center text-wrap text-3xl">Want to start an adventure?</h2>
        <div className="flex justify-center my-2">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-4 px-8 rounded" onClick={()=>{
              setView("ingame");
            }}>Navigate</button>
        </div>
    </>
  )
}

export default Body

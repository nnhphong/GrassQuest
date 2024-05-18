function Body({setView}) {
  return (
    <>
        <h1 class = "px-2 py-10 text-center text-7xl">Hello User!</h1>
        <h2 class = "px-2 py-5 text-center text-wrap text-3xl">Want to start an adventure?</h2>
        <div class="flex justify-center">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-4 px-8 rounded" onClick={()=>{
              setView("ingame");
            }}>Navigate</button>
        </div>
    </>
  )
}

export default Body

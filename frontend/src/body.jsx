import Banner from "./assets/forest.jpg"

function Body({setView}) {
  return (
    <div className="bg-[url(./assets/test.jpg)] h-dvh">
      <div className='overflow-hidden'>
      </div>
      <h1 class = "font-bold px-2 pt-20 pb-3 text-center text-7xl">Hello User!</h1>
      <h2 class = "px-2 pt-2 pb-5 text-center text-wrap text-3xl">Want to start an adventure?</h2>
      <div class="flex justify-center">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-4 px-8 rounded" onClick={()=>{
            setView("ingame");
          }}>Navigate</button>
      </div>
    </div>
  )
}

export default Body

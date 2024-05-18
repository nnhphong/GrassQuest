// eslint-disable-next-line react/prop-types
function Instructions({setView}) {
    return (
      <div className="bg-[url(./assets/test.jpg)] h-dvh bg-cover flex items-center flex-col">
        <h1 className = "px-4 py-3 pt-10 text-center text-5xl font-bold">Instructions</h1>
        <p className = "px-4 py-2 text-center text-wrap text-2xl">To begin, press the button on the home page that says &quot;navigate&quot; to start the game. You can upload an image from your device to prove that you been there. After evaluation, you will be awarded points to level up on the leaderboard.</p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-4 px-8 rounded w-1/2" onClick={()=>{
              setView("home");
            }}>Back</button>
      </div>
    )
  }
  
  export default Instructions
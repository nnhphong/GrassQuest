import Monument from "./assets/monument1.jpg"

function Game({setView}) {
  return (
    <div className="bg-slate-800 h-dvh bg-cover">
        <div className="flex flex-col justify-center items-center pt-4">
            <div className="text-4xl font-bold text-white">Current Target</div>
            <div className="text-xl pt-2 font-bold text-white">3 km · NE</div>
            <img src={Monument} className="pt-4 object-cover w-9/12"/>
            <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-9/12 h-12 relative">
                <input
                    type="file"
                    name="myImage"
                    className="text-center opacity-0 absolute top-0 bottom-0 left-0 right-0 m-auto z-50"
                    accept="image/*"
                    onChange={(event) => {
                        console.log(event.target.files[0]);
                    }}
                />
                <div class="flex flex-col justify-center itemes-center absolute top-0 bottom-0 left-0 right-0 m-auto text-white" >
                    <div>Submit Image</div>
                </div>
            </button>
            <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-9/12 h-12">
                Hint
            </button>
        </div>
    </div>
  )
}

export default Game

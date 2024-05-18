import Menu from "./assets/Menu.svg"

function Navbar({setView}) {
  return (
    <>
       <header className="bg-slate-900 py-3 lg:py-4 sticky z-[9999] top-0 px-2 h-20" id="home">
            <div className="container px-4 mx-auto flex items-center h-full w-full">
                <div className="flex justify-between items-center">
                    <h1 className="text-white font-bold text-4xl py-2"  onClick={() => setView("home")}>Quests™</h1>
                </div>
                <div className="text-white flex flex-row ml-auto mt-0 h-full">
                    <img className="h-9/12 p-1" src={Menu}/>
                </div>
            </div>
        </header>
    </>
  )
}

export default Navbar

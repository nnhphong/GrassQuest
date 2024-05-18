import { useState } from 'react';

function Navbar({ setView }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <header className="bg-slate-900 py-3 lg:py-4 sticky z-[9999] top-0 px-2" id="home">
        <div className="container px-4 mx-auto flex items-center w-full">
          <h1 className="text-white font-bold text-4xl py-2 mr-auto" onClick={() => setView("home")}>Quests™</h1>

          <div className="text-white relative">
            <button className="text-gray-300 hover:text-white focus:outline-none" onClick={() => setIsDropdownOpen(!isDropdownOpen)}><img className="h-9/12 p-1" src="Menu.svg" alt="Menu" /></button>
          </div>
          
        </div>
        <div className = "pt-2 w-full">
            {isDropdownOpen && (
                <div className=" w-full absolute top-17 mt-5 right-0">
                  <div className="justify-center flex items-center bg-gray-900 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <a href="#" className="inline px-4 my-3 text-sm text-white">Instructions</a>
                    <a href="#" className="inline px-4 my-3 text-sm text-white">Profile</a>
                    <a href="#" className="inline px-4 my-3 text-sm text-white">Settings</a>
                  </div>
                </div>
            )}
            
          </div>
      </header>
    </>
  )
}

export default Navbar;

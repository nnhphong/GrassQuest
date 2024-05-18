import { useState } from 'react';
import Menu from "./assets/Menu.svg"
import Logo from "./assets/GrassQuest.svg"

function Navbar({ setView }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <header className="bg-slate-900 py-3 lg:py-4 sticky z-[9999] top-0 px-2 h-20" id="home">
        <div className="container px-4 mx-auto flex items-center justify-center w-full h-full">
          <img src={Logo} className="py-2 mr-auto h-[3.5rem]" onClick={() => setView("home")}/>
          <div className="text-white flex justify-center h-full">
            <button className="text-gray-300 hover:text-white focus:outline-none h-full" onClick={() => setIsDropdownOpen(!isDropdownOpen)}><img className="h-9/10 p-1" src={Menu} alt="Menu" /></button>
          </div>
          
        </div>
        <div className="pt-2 w-full">
          <div className={`absolute top-20 right-0 w-full transition-max-height duration-500 overflow-hidden ${isDropdownOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
            <div className="flex items-center justify-evenly bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5">
              <a href="#" className="inline justify-self px-4 py-3 text-sm text-white">Instructions</a>
              <a href="#" className="inline justify-self px-4 py-3 text-sm text-white">Profile</a>
              <a href="#" className="inline justify-self px-4 py-3 text-sm text-white">Settings</a>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar;

import React, { useState } from "react";

const Modal = ({setView, toggleModal, setPlaying, getNewTarget}) => {
  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-[9999] outline-none focus:outline-none bg-slate-700 bg-opacity-80">
        <div className="relative w-auto my-6 mx-auto max-w-3xl w-9/10">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font=semibold">Congratulations on finding the location! 🎉</h3>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => {setView("home"); toggleModal(false)}}
              >
                Home
              </button>
              <button
                className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => {
                  setView("ingame");
                  getNewTarget();
                  setPlaying(true);
                  toggleModal(false);
                  console.log("AAA");
                }}
              >
                New Location
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
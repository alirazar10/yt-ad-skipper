import React, { useState } from "react";
import TicTacToe from "./TicTacToe";
import SocialMedia from "./socialMedia";

const TabButton = ({ activeTab, tabName, onClick }) => (
  <button
    className={`px-4 py-2 rounded-t-lg focus:outline-none transition-all duration-300 ${
      activeTab === tabName
        ? " text-[#212121] font-semibold border-b border-[#212121]"
        : " text-[#212121]/50"
    }`}
    onClick={() => onClick(tabName)}
  >
    {tabName === "credits" ? "About" : "Play Tic Tac Toe"}
  </button>
);

const TabContent = ({ activeTab }) => {
  if (activeTab === "game") {
    return (
      <div className="transition-all duration-300 pt-2">
        <TicTacToe />
      </div>
    );
  } else {
    return (
      <div className="text-left text-[#212121]/80 space-y-3 transition-all duration-300">
        <ul className="space-y-3">
          <li className="text-[#212121] text-sm font-bold">
            Developed By: <span className="font-bold">Ali Reza Rezayee</span>
          </li>
        </ul>
        <SocialMedia />
      </div>
    );
  }
};

function Popup() {
  const [activeTab, setActiveTab] = useState("credits");

  return (
    <div className="w-80 h-full  rounded-2xl">
      <div className="rounded-full h-12 w-12 overflow-hidden mb-3">
        <img src="/icons/icon128.png" alt="" className="h-12 w-12"/>
      </div>
      <div className="flex justify-start gap-3 mb-4 bg-black/5 pt-1 rounded-t-lg">
        <TabButton activeTab={activeTab} tabName="credits" onClick={setActiveTab} />
        <TabButton activeTab={activeTab} tabName="game" onClick={setActiveTab} />
      </div>
      <h2 className="text-[#212121] text-xl text-left font-bold py-3">
        Ad Skipper
      </h2>
      <TabContent activeTab={activeTab} />
    </div>
  );
}

export default Popup;

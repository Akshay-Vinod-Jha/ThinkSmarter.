import React, { useState, useEffect } from "react";
import History from "../../UI/History";
import Title from "../Summarizer/RequiredComponents/Title";
import MainContainer from "./MainContainer";
import Bottom from "../../UI/Bottom";
import { useLocation } from "react-router-dom";
const TTS = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const [showHistory, setShowHistory] = useState(false);
  const location = useLocation();
  const userId = location.state.userId;
  return (
    <>
      <div className="w-screen h-auto grid grid-cols-1 md:grid-cols-4 place-content-start place-items-start py-4 px-2 gap-2">
        <div className="w-full col-span-1 md:col-span-4 px-1 gap-4">
          <div className="w-full flex justify-between items-center mb-2 mt-4 text-white">
            <h1 className="border-b-[.15rem] text-base md:text-lg lg:text-xl xl:text-2xl border-transparent hover:border-[#728894] font-lexend text-[#728894]">
              VoiceSync
            </h1>
          </div>
          <MainContainer />
        </div>
      </div>
      <Bottom label="Go to All tools" navigateTo=".." userId={userId} />
    </>
  );
};

export default TTS;

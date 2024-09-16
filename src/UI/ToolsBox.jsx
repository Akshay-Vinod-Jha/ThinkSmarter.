import React from "react";
import parse from "html-react-parser";

function ToolsBox(props) {
  return (
    <div
      onClick={props.onClick}
      className="w-full h-full border-2 border-[#72889496] bg-[#080b10] rounded-xl p-4 flex flex-col justify-center items-center gap-4 font-lexend font-normal tracking-widest "
    >
      <div className="text-[white] hover:text-[#728894] font-semibold   uppercase text-base md:text-lg lg:text-xl xl:text-xl text-left w-full border-b-2 border-[#ffffff51] py-2">
        {props.toolName}
      </div>
      <div className="w-full h-[80%] flex md:flex-row flex-col  justify-around items-center gap-2 md:gap-4">
        <div className="w-[40%] rounded-xl md:border-2 md:border-[#728894]  md:w-[25%] lg:w-[20%] aspect-square overflow-hidden md:rounded-full md:aspect-[1/1]">
          <img
            src={props.imageUrl}
            style={{
              objectFit: "cover",
            }}
            alt=""
            className="w-full h-full md:object-cover md:aspect-square object-cover duration-200"
          />
        </div>
        <h1 className="text-[white] text-center md:text-left capitalize text-base w-[100%]">
          {parse(props.slogan)}
        </h1>
      </div>
    </div>
  );
}

export default ToolsBox;

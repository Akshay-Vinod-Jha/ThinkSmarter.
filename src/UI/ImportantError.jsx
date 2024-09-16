import React from "react";

const ImportantError = (props) => {
  return (
    <div className="absolute z-[1000000000000] top-0 left-0 w-full h-full bg-[#000000a8]">
      <div className="w-full h-screen relative bg-transparent">
        <div className="absolute bg-black w-[90%] border-2 border-[#ffffff2f] rounded-xl px-2 py-2 h-[90%] top-[55%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-lexend text-white">
          <h1>Terms And Conditions</h1>
        </div>
      </div>
    </div>
  );
};

export default ImportantError;

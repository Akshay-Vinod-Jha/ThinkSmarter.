import React, { useEffect, useRef, useState } from "react";
import OrangeButton from "../../UI/OrangeButton";
import { useSpeechSynthesis } from "react-speech-kit";
import Loader from "../../UI/Loader";
import { TbBulb } from "react-icons/tb";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { LuGrab } from "react-icons/lu";
import { FaRegHandPaper } from "react-icons/fa";
import Copy from "../../UI/Copy";
import { useDispatch } from "react-redux";
import { hidePopUp, showPopUp } from "../../store/popupSlice.jsx";
import { MdError } from "react-icons/md";

const MainContainer = () => {
  const dispatch = useDispatch();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    dispatch(
      showPopUp({
        color: "#892330",
        bgColor: "#e5c2c2",
        title: "Something went Wrong!",
        description: "Browser Do Not Supports Speech Recognition",
        icon: <MdError color="#892330" fontSize="4rem" />,
      })
    );

    // to hide popup

    setTimeout(() => {
      dispatch(hidePopUp());
    }, 5000);
    return null;
  }
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const [first, setFirst] = useState(true);
  const [request, setRequest] = useState(false);
  const [textIs, setTextIs] = useState("");
  const [hold, setHold] = useState(false);
  const wordRef = useRef();
  const wordRef2 = useRef();
  const { speak } = useSpeechSynthesis();
  // const [request, setRequest] = useState(false);
  const clickHandler = () => {
    try {
      setRequest(true);
      if (textIs === "") {
        throw Error("error occureed nothing specified");
      }
      setTimeout(() => {
        console.log(textIs);
        speak({ text: textIs });
        setRequest(false);
      }, 1500);
    } catch (error) {
      dispatch(
        showPopUp({
          color: "#892330",
          bgColor: "#e5c2c2",
          title: "Something went Wrong!",
          description: "Browser Do Not Supports Speech Recognition",
          icon: <MdError color="#892330" fontSize="4rem" />,
        })
      );

      // to hide popup

      setTimeout(() => {
        dispatch(hidePopUp());
      }, 5000);
      setRequest(false);
    }
  };
  return (
    <>
      <div className="w-full mt-4 grid grid-cols-1 gap-4 bg-[#1e1e1e] rounded-lg">
        <div className="relative w-full grid cursor-pointer grid-cols-2 place-content-center place-items-center py-4">
          <h1
            onClick={() => {
              setFirst(true);
            }}
            className={`${first ? "text-white" : "text-[#728894]"} w-full flex justify-center items-center font-lexend text-sm md:text-base lg:text-lg`}
          >
            Text To Speech
          </h1>
          <h1
            onClick={() => {
              setFirst(false);
            }}
            className={`${!first ? "text-white" : "text-[#728894]"} w-full flex justify-center items-center cursor-pointer font-lexend text-sm md:text-base lg:text-lg`}
          >
            Speech To Text
          </h1>
          <div
            className={`absolute w-[50%] ${first ? "left-0" : "left-[50%]"} top-[100%] duration-300 border-[2px] md:border-2 border-[#fc0001]`}
          ></div>
        </div>
        {first && (
          <div className="w-full flex flex-col px-1 md:px-8 mb-4 justify-start items-center gap-2">
            <textarea
              name="texttospeech"
              onChange={(e) => {
                setTextIs(e.target.value);
              }}
              ref={wordRef}
              id="texttospeech"
              cols="30"
              value={textIs}
              rows="10"
              className="w-full mx-4 py-2 px-3 text-white rounded-lg border-2 border-[#ffffff38] bg-black resize-none h-[20rem] font-lexend text-sm md:text-base"
              placeholder="Type Your Content Here.."
            ></textarea>
            <div className="w-full md:w-[50%] md:mx-auto lg:w-[50%] lg:mx-auto">
              <OrangeButton onClick={clickHandler}>
                {request && <Loader />}Convert To Speech
              </OrangeButton>
            </div>
          </div>
        )}
        {!first && (
          <div className="w-full flex flex-col px-1 md:px-8 mb-4 justify-start items-center gap-2">
            <textarea
              name="texttospeech2"
              ref={wordRef2}
              onChange={(e) => {
                wordRef2.current.value = transcript;
              }}
              id="texttospeech2"
              cols="30"
              value={transcript}
              rows="10"
              className="w-full mx-4 py-2 px-3 text-white rounded-lg border-2 border-[#ffffff38] bg-black resize-none h-[20rem] font-lexend text-sm md:text-base"
              placeholder="Your Content Will Be Displayed Here.."
            ></textarea>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 place-content-center place-items-start gap-2">
              <button
                className={`w-full  flex justify-center items-center gap-2 py-2 font-lexend text-sm md:text-base lg:text-lg text-white ${hold ? "bg-[#fc00006d]" : "bg-[#fc0001]"} rounded-xl`}
                onTouchStart={() => {
                  startListening();
                  setHold(true);
                }}
                onMouseDown={() => {
                  startListening();
                  setHold(true);
                }}
                onTouchEnd={() => {
                  SpeechRecognition.stopListening();
                  setHold(false);
                }}
                onMouseUp={() => {
                  SpeechRecognition.stopListening();
                  setHold(false);
                }}
              >
                {hold ? "Leave To Stop Listening" : "Hold To Start Listening"}
                {hold ? <FaRegHandPaper /> : <LuGrab />}
              </button>
              <button
                onClick={resetTranscript}
                className="w-full py-2 flex justify-center items-center gap-2 font-lexend text-sm md:text-base lg:text-lg text-white bg-[#fc0001] rounded-xl"
              >
                Reset
              </button>
            </div>
            <div className="w-full flex justify-end items-center">
              <Copy text={transcript} />
            </div>
          </div>
        )}
      </div>
      {first && (
        <div className="w-full flex flex-col my-4 font-lexend text-sm md:text-base lg:text-lg xl:text-xl justify-center items-center gap-2 bg-[#1E1E1E] rounded-xl">
          <h1 className="w-full text-center flex justify-center text-sm md:text-base lg:text-lg xl:text-xl gap-2 font-extrabold items-center py-2 text-white">
            <TbBulb color="yellow" fontSize="1.5rem" />
            Don’t have idea ? Try these!
          </h1>
          {
            <div className="w-full p-4 rounded-lg bg-[#1E1E1E]  font-normal grid grid-cols-1 lg:grid-cols-2 place-content-center place-items-center gap-2">
              {[
                ["Hello! Welcome to the world of speech synthesis."],
                [
                  "Hello everyone! Thank you for joining us today. We're excited to have you here.",
                ],
              ].map((value, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setTextIs(value);
                      window.scrollTo(0, 0);
                    }}
                    className="w-full px-8 py-4 text-justify h-24 overflow-scroll no-scrollbar text-sm bg-[#080b10] border-2 border-black hover:border-[#728894] hover:bg-black  rounded-md text-[#ffffffa0]"
                  >
                    {value}
                  </div>
                );
              })}
            </div>
          }
        </div>
      )}
    </>
  );
};

export default MainContainer;

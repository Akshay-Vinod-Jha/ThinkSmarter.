import React, { useState, useRef, useEffect } from "react";
import Title from "../Summarizer/RequiredComponents/Title";
import PromptAreaForMail from "../Summarizer/RequiredComponents/PromptAreaForMail";
import Loading from "../../UI/Loading";
import Copy from "../../UI/Copy.jsx";
import Bottom from "../../UI/Bottom.jsx";
import History from "../../UI/History";
import { FaLaptopCode } from "react-icons/fa6";
import SelectLanguage from "./SelectLanguage";
import { useDispatch } from "react-redux";
import { hidePopUp, showPopUp } from "../../store/popupSlice.jsx";
import ActualCodeBox from "./ActualCodeBox";
import { TbBulb } from "react-icons/tb";
import { MdError } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { readData } from "../../common-funtions/readData.jsx";
import { updateData } from "../../common-funtions/updateData.jsx";
import { MdCancel } from "react-icons/md";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import cssClasses from "./TTC.module.css";
const TTC = (props) => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const location = useLocation();
  const userId = location.state.userId;
  const [ispopup, setIsPopUp] = useState(false);
  const [isHistroyLoading, setIsHistoryLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [requested, setRequested] = useState(false);
  const [response, setResponse] = useState(false);
  const [actualCode, setActualCode] = useState("");
  const promptRef = useRef();
  const [slanguage, setSLanguage] = useState("javascript");
  const dispatch = useDispatch();
  const callThisFunction = (receivedvalue) => {
    console.log(receivedvalue);
    setRequested(true);
    callApi(receivedvalue);
    setResponse(false);
  };
  const saveHistory = async (prompt, result, style, userId) => {
    const obj = {
      prompt,
      output: result,
      style: style,
      time: new Date().toISOString(),
    };
    setHistory((previousValue) => {
      return [obj, ...previousValue];
    });
    await updateData(userId, {
      TextToCode: [obj, ...history],
    });
  };
  function callApi(requestString) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiN2ZlZTliMmUtM2NiYS00OGUxLWEyY2MtNGRmYzRhZDQ5ZGIwIiwidHlwZSI6ImFwaV90b2tlbiJ9._DR06u2PoXz0c8Yf6oGYN4_DY0xHR7daF6lBMclPseY",
      },
      body: JSON.stringify({
        providers: "openai",
        prompt: "",
        instruction: requestString,
        temperature: 0.1,
        max_tokens: 500,
        fallback_providers: "",
      }),
    };

    fetch("https://api.edenai.run/v2/text/code_generation", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data["openai"]["generated_text"]);
        setActualCode(data["openai"]["generated_text"]);
        setRequested(false);
        setResponse(true);
        saveHistory(
          requestString,
          data["openai"]["generated_text"],
          slanguage,
          userId
        );
      })
      .catch((error) => {
        console.error(error);
        setRequested(false);
        setResponse(false);
        dispatch(
          showPopUp({
            color: "#892330",
            bgColor: "#e5c2c2",
            title: "Something went Wrong!",
            description: "Failed To Generate Code",
            icon: <MdError color="#892330" fontSize="4rem" />,
          })
        );
        setTimeout(() => {
          dispatch(hidePopUp());
        }, 5000);
      });
  }
  useEffect(() => {
    const fetchHistory = async () => {
      const data = await readData(userId);
      setHistory(data["TextToCode"] ? data["TextToCode"] : []);
      setIsHistoryLoading(false);
    };
    setIsHistoryLoading(true);
    fetchHistory();
  }, []);

  const popupHandler = (ind, arr) => {
    console.log(ind);
    return (
      <div className={cssClasses.popup}>
        <MdCancel
          className={cssClasses.cancel}
          fontSize={"2rem"}
          onClick={() => {
            setIsPopUp(false);
            props.updateShowing(false);
          }}
        />
        <p className={cssClasses.prompt}>
          <span className="text-[#fc0001]">Prompt: </span>
          {arr[ind].prompt}
        </p>
        <div className="w-full md:max-h-80 max-h-40 overflow-scroll no-scrollbar">
          <h1 className="w-full flex justify-start items-center text-white font-lexend">
            Output
          </h1>
          <div className="w-full max-h-40 md:max-h-80 overflow-scroll no-scrollbar">
            <SyntaxHighlighter
              language={arr[ind].style}
              style={atomOneDark}
              id="code"
              className="rounded-xl overflow-scroll no-scrollbar"
            >
              {arr[ind].output}
            </SyntaxHighlighter>
          </div>
        </div>
        <div className="w-full flex justify-end items-center">
          <Copy text={arr[ind].output} />
        </div>
      </div>
    );
  };
  return (
    <>
      <div
        className={`w-screen ${props.showing ? "h-[100vh] overflow-hidden" : "h-auto"} grid grid-cols-1 md:grid-cols-4 place-content-center place-items-start gap-2 py-4 px-2`}
      >
        <div className="w-full col-span-1 md:col-span-3 px-1 flex flex-col gap-4">
          <Title title="CodeCraft" setShowHistory={setShowHistory} />
          <PromptAreaForMail
            placeholder="Enter The Prompt Here To Generate Code.."
            ref={promptRef}
            callThisFunction={callThisFunction}
            requested={requested}
            buttonText="Generate"
            icon={<FaLaptopCode className="text-base" />}
          />
          <SelectLanguage setSLanguage={setSLanguage} />
          {requested && (
            <Loading
              label="Generating Code For You...This Can Take Some Time"
              size="40px"
            />
          )}
          {response && (
            <ActualCodeBox slanguage={slanguage} actualCode={actualCode} />
          )}
          <div className="w-full flex flex-col my-4 font-lexend text-sm md:text-base lg:text-lg xl:text-xl justify-center items-center gap-2 bg-[#1E1E1E] rounded-xl">
            <h1 className="w-full text-center flex justify-center text-sm md:text-base lg:text-lg xl:text-xl gap-2 font-extrabold items-center py-2 text-white">
              <TbBulb color="yellow" fontSize="1.5rem" />
              Don’t have idea ? Try these!
            </h1>
            <div className="w-full p-4 rounded-lg bg-[#1E1E1E]  font-normal grid grid-cols-1 lg:grid-cols-2 place-content-start place-items-start gap-2">
              {[
                ["Write a program To Print Hello World in C"],
                ["Write a program To Add Two Numbers in C++"],
                ["Write a Program To Make a Form in HTML"],
                ["Write a Program To Calculate Factorial in C#"],
              ].map((value, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      promptRef.current.value = value;
                      window.scrollTo(0, 0);
                    }}
                    className="w-full px-8 py-4 h-20 overflow-scroll no-scrollbar text-[10px] md:text-sm bg-[#080b10] border-2 border-black hover:border-[#728894] hover:bg-black  rounded-md text-[#ffffffa0]"
                  >
                    {value}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <History
          height="95vh"
          showHistory={showHistory}
          setShowHistory={setShowHistory}
          history={history}
          popupHandler={popupHandler}
          showPopUp={setIsPopUp}
          popup={ispopup}
          isHistroyLoading={isHistroyLoading}
          updateShowing={props.updateShowing}
        />
      </div>
      {!props.showing && (
        <Bottom label="Go to All tools" navigateTo=".." userId={userId} />
      )}
    </>
  );
};

export default TTC;

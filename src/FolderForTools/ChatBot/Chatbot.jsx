import React, { useRef, useState, useEffect } from "react";
import Copy from "../../UI/Copy.jsx";
import History from "../../UI/History";
import Bottom from "../../UI/Bottom.jsx";
import { HfInference } from "@huggingface/inference";
import ChatingScreen from "./ChatingScreen";
import { MdError } from "react-icons/md";
import cssClasses from "./Chatbot.module.css";
import { IoSend } from "react-icons/io5";
import Title from "../Summarizer/RequiredComponents/Title";
import { TbBulb } from "react-icons/tb";
import PromptAreaForText from "../Summarizer/RequiredComponents/PromptAreaForText";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { readData } from "../../common-funtions/readData.jsx";
import { updateData } from "../../common-funtions/updateData.jsx";
import { MdCancel } from "react-icons/md";
import { hidePopUp, showPopUp } from "../../store/popupSlice.jsx";
import { all } from "axios";
const Chatbot = (props) => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const location = useLocation();
  const userId = location.state.userId;
  const [ispopup, setIsPopUp] = useState(false);
  const [isHistroyLoading, setIsHistoryLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const dispatch = useDispatch();
  const callMe = async (userMessage) => {
    setProcessState(true);
    const apiUrl = "https://api.edenai.run/v2/text/chat";
    const authToken =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiN2ZlZTliMmUtM2NiYS00OGUxLWEyY2MtNGRmYzRhZDQ5ZGIwIiwidHlwZSI6ImFwaV90b2tlbiJ9._DR06u2PoXz0c8Yf6oGYN4_DY0xHR7daF6lBMclPseY";

    const requestData = {
      providers: "openai",
      text: userMessage,
      chatbot_global_action: "Act as an assistant",
      previous_history: [],
      temperature: 0.0,
      max_tokens: 150,
      fallback_providers: "",
    };

    const options = {
      method: "POST",
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    };
    fetch(apiUrl, options)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw Error("Failed");
        }
      })
      .then((data) => {
        setAllMessages((previousMessage) => {
          return [
            ...previousMessage,
            [data["openai"]["generated_text"], new Date().toLocaleTimeString()],
          ];
        });
        sett(Math.random());
        setProcessState(false);
        setRequested(false);
        sett(Math.random());
        saveHistory(userMessage, data["openai"]["generated_text"], userId);
      })
      .catch((error) => {
        console.error(error);
        sett(Math.random());
        setProcessState(false);
        setRequested(false);
        dispatch(
          showPopUp({
            color: "#892330",
            bgColor: "#e5c2c2",
            title: "Something went Wrong!",
            description: "The ChatBot Failed To Reply",
            icon: <MdError color="#892330" fontSize="4rem" />,
          })
        );
        setTimeout(() => {
          dispatch(hidePopUp());
        }, 5000);
        setAllMessages((previousMessaages) => {
          return [
            ...previousMessaages,
            [<MdError />, new Date().toLocaleTimeString()],
          ];
        });
        sett(Math.random());
        setProcessState(false);
        setRequested(false);
        sett(Math.random());
      });
  };
  const [showHistory, setShowHistory] = useState(false);
  const [takeToTop, sett] = useState(0);
  const [requested, setRequested] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [processState, setProcessState] = useState(false);
  const inputRef = useRef();
  const saveHistory = async (prompt, result, userId) => {
    const obj = {
      prompt,
      output: result,
      time: new Date().toISOString(),
    };
    setHistory((previousValue) => {
      return [obj, ...previousValue];
    });
    await updateData(userId, {
      ChatBot: [obj, ...history],
    });
  };
  useEffect(() => {
    const fetchHistory = async () => {
      const data = await readData(userId);
      setHistory(data["ChatBot"] ? data["ChatBot"] : []);
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
        <div className="w-full p-2 flex flex-col gap-4">
          <h1 className="w-full md:w-[50%] rounded-xl self-end py-1 px-2  bg-[#fc0001] text-white">
            {arr[ind].prompt}
          </h1>
          <h1 className="w-full md:w-[50%] rounded-xl self-start py-1 px-2  bg-[white] text-[#fc0001]">
            {arr[ind].output}
          </h1>
        </div>
        <div className="w-full flex justify-end items-center">
          <Copy text={arr[ind].output} />
        </div>
      </div>
    );
  };
  const clickHandler = (e, temp) => {
    sett(Math.random());
    if (inputRef.current.value.trim().length > 0) {
      setRequested(true);
      console.log(inputRef.current.value);
      setAllMessages((previousValue) => {
        return [
          ...previousValue,
          [inputRef.current.value, new Date().toLocaleTimeString()],
        ];
      });
      setTimeout(() => {
        callMe(inputRef.current.value);
      }, 300);
    }
  };
  return (
    <>
      <div
        className={`rounded-lg w-screen p-1 md:p-2 lg:p-4 ${props.showing ? "h-[100vh] overflow-hidden" : "h-auto"} grid grid-cols-1 md:grid-cols-4 place-content-center place-items-start md:gap-2 lg:gap-3`}
      >
        <div className="col-span-1 md:col-span-3 w-full bg-[#1e1e1e] p-2 flex flex-col justify-center items-center gap-2">
          <Title title="ChatBot" setShowHistory={setShowHistory} />
          <ChatingScreen
            allMessages={allMessages}
            processState={processState}
            takeToTop={takeToTop}
          />
          <PromptAreaForText
            requested={requested}
            processState={processState}
            isLoading={processState}
            ref={inputRef}
            clickHandler={clickHandler}
            buttonText="Send"
            placeholder="Type Here.."
            icon={<IoSend className="text-lg" />}
          />
          <div className="w-full flex flex-col my-4 font-lexend text-sm md:text-base lg:text-lg xl:text-xl justify-center items-center gap-2 bg-[#1E1E1E] rounded-xl">
            <h1 className="w-full text-center flex justify-center text-sm md:text-base lg:text-lg xl:text-xl gap-2 font-extrabold items-center py-2 text-white">
              <TbBulb color="yellow" fontSize="1.5rem" />
              Don’t have idea ? Try these!
            </h1>
            <div className="w-full p-4 rounded-lg bg-[#1E1E1E]  font-normal grid grid-cols-1 lg:grid-cols-2 place-content-center place-items-center gap-2">
              {[
                ["Hii"],
                ["Nice To Meet You"],
                [
                  "Tommy has 3 apples. He gives 1 apple to his friend Sally. How many apples does Tommy have left?",
                ],
                ["What Is Software Testing,explain in few words?"],
              ].map((value, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      inputRef.current.value = value;
                    }}
                    className="w-full px-8 py-4 text-justify md:h-24 h-20 overflow-scroll no-scrollbar text-sm bg-[#080b10] border-2 border-black hover:border-[#728894] hover:bg-black  rounded-md text-[#ffffffa0]"
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
          updateShowing={props.updateShowing}
          isHistroyLoading={isHistroyLoading}
        />
      </div>
      {!props.showing && (
        <Bottom label="Go to All tools" navigateTo=".." userId={userId} />
      )}{" "}
    </>
  );
};

export default Chatbot;

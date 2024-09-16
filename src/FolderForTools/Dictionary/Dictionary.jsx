import React, { useRef, useState, useEffect } from "react";
import History from "../../UI/History";
import Bottom from "../../UI/Bottom.jsx";
import cssClasses from "./Dictionary.module.css";
import Title from "../Summarizer/RequiredComponents/Title";
import PromptAreaForMail from "../Summarizer/RequiredComponents/PromptAreaForMail";
import { FaSearch } from "react-icons/fa";
import ParentBox from "./ParentBox";
import { useDispatch } from "react-redux";
import { hidePopUp, showPopUp } from "../../store/popupSlice.jsx";
import { MdError } from "react-icons/md";
import { TbBulb } from "react-icons/tb";
import Loading from "../../UI/Loading.jsx";
import { useLocation } from "react-router-dom";
import { readData } from "../../common-funtions/readData.jsx";
import { updateData } from "../../common-funtions/updateData.jsx";
import { MdCancel } from "react-icons/md";
import Copy from "../../UI/Copy.jsx";
const Dictionary = (props) => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const location = useLocation();
  const userId = location.state.userId;
  const [history, setHistory] = useState([]);
  const [ispopup, setIsPopUp] = useState(false);
  const [isHistroyLoading, setIsHistoryLoading] = useState(false);
  const dispatch = useDispatch();
  const [showHistory, setShowHistory] = useState(false);
  const [requested, setRequested] = useState(false);
  const [object, setObject] = useState([]);
  const wordref = useRef();
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
      Dictionary: [obj, ...history],
    });
  };

  const callThisFunction = (receivedvalue) => {
    console.log(receivedvalue);
    seta(true);
    setRequested(true);
    callingApi(receivedvalue);
  };
  const callingApi = (receivedWord) => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${receivedWord}`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        console.log(data[0].meanings[0].definitions[0].definition);
        saveHistory(
          receivedWord,
          data[0].meanings[0].definitions[0].definition,
          userId
        );
        setObject(data);
        closingAll();
        seta(true);
      })
      .catch((error) => {
        console.log("invalid word specified");
        console.log(error);
        dispatch(
          showPopUp({
            color: "#892330",
            bgColor: "#e5c2c2",
            title: "Something went Wrong!",
            description: "Nothing Related To The Specified Word Found...",
            icon: <MdError color="#892330" fontSize="4rem" />,
          })
        );

        // to hide popup
        setTimeout(() => {
          dispatch(hidePopUp());
        }, 5000);
        closingAll();
        seta(false);
      });
  };
  useEffect(() => {
    const fetchHistory = async () => {
      console.log(userId);
      const data = await readData(userId);
      console.log(data);
      setHistory(data["Dictionary"] ? data["Dictionary"] : []);
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
          <span className="text-[#fc0001]">Output: </span>
          {arr[ind].output}
        </div>
        <div className="w-full flex justify-end items-center">
          <Copy text={arr[ind].output} />
        </div>
      </div>
    );
  };
  const closingAll = () => {
    setRequested(false);
  };
  const [a, seta] = useState(true);
  return (
    <>
      <div
        className={`w-screen  ${props.showing ? "h-[100vh] overflow-hidden" : "h-auto"}  grid grid-cols-1 md:grid-cols-4 place-content-center place-items-start gap-2`}
      >
        <div className="w-full col-span-1 md:col-span-3 h-auto p-2 md:p-4">
          <Title title="IntelliDict" setShowHistory={setShowHistory} />
          <PromptAreaForMail
            placeholder="Enter The Word Here..."
            ref={wordref}
            callThisFunction={callThisFunction}
            buttonText="Search"
            icon={<FaSearch />}
            requested={requested}
          />
          {a &&
            object.map((value, index) => {
              return (
                <ParentBox
                  value={value}
                  index={index}
                  key={`ParentBox${index}`}
                  requested={requested}
                ></ParentBox>
              );
            })}
          {requested && (
            <Loading
              label="Searching The Specified Word..This Can Take Some Time"
              size="40px"
            />
          )}
          <div className="w-full flex flex-col my-4 font-lexend text-sm md:text-base lg:text-lg xl:text-xl justify-center items-center gap-2 bg-[#1E1E1E] rounded-xl">
            <h1 className="w-full text-center flex justify-center text-sm md:text-base lg:text-lg xl:text-xl gap-2 font-extrabold items-center py-2 text-white">
              <TbBulb color="yellow" fontSize="1.5rem" />
              Don’t have idea ? Try these!
            </h1>
            <div className="w-full p-4 rounded-lg bg-[#1E1E1E]  font-normal grid grid-cols-1 lg:grid-cols-3 place-content-start place-items-start gap-2">
              {[
                ["Immortal"],
                ["Royal"],
                ["Pacemaker"],
                ["Arctic"],
                ["Knowledge"],
                ["Discount"],
              ].map((value, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      wordref.current.value = value;
                      closingAll();
                      seta(false);
                    }}
                    className="w-full px-8 py-4 h-auto overflow-scroll no-scrollbar text-sm bg-[#080b10] border-2 border-black hover:border-[#728894] hover:bg-black  rounded-md text-[#ffffffa0]"
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

export default Dictionary;

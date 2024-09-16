import React, { useEffect, useRef, useState } from "react";
import History from "../../UI/History";
import Title from "../Summarizer/RequiredComponents/Title";
import PromptAreaForMail from "../Summarizer/RequiredComponents/PromptAreaForMail";
import ParentYt from "./ParentYt";
import { FaSearch } from "react-icons/fa";
import Bottom from "../../UI/Bottom.jsx";
import Loading from "../../UI/Loading";
import { useDispatch } from "react-redux";
import { hidePopUp, showPopUp } from "../../store/popupSlice.jsx";
import { MdError } from "react-icons/md";
import { TbBulb } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { updateData } from "../../common-funtions/updateData.jsx";
import { readData } from "../../common-funtions/readData.jsx";
import { MdCancel } from "react-icons/md";
import classes from "./YT.module.css";
import Copy from "../../UI/Copy.jsx";
const YT = (props) => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const location = useLocation();
  const userId = location.state.userId;
  const [history, setHistory] = useState([]);
  const [ispopup, setIsPopUP] = useState(false);
  const [isHistroyLoading, setIsHistoryLoading] = useState(false);
  const saveHistory = async (prompt, result, userId) => {
    const obj = {
      prompt,
      output: result,
      time: new Date().toISOString(),
    };
    setHistory((previousValue) => {
      return [obj, ...previousValue];
    });
    await updateData(userId, { YT: [obj, ...history] });
  };
  const dispatch = useDispatch();
  async function my(videoId) {
    const url = `https://youtube-transcriptor.p.rapidapi.com/transcript?video_id=${videoId}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "6625a2fd44msh7fb777f6e5e5f32p1b33e7jsnf58f85412f51",
        "X-RapidAPI-Host": "youtube-transcriptor.p.rapidapi.com",
      },
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setOutput([...result]);
      // console.log(result[0].transcription);
      let dummy = "";
      for (let i = 0; i < result[0].transcription.length; i++) {
        dummy = dummy + result[0].transcription[i].subtitle;
      }
      saveHistory(videoId, dummy, userId);
      setParent(true);
    } catch (error) {
      setParent(false);
      console.error(error);
      dispatch(
        showPopUp({
          color: "#892330",
          bgColor: "#e5c2c2",
          title: "Something went Wrong!",
          description: "The Specified Video Do Not Have Sub-Titles",
          icon: <MdError color="#892330" fontSize="4rem" />,
        })
      );
      setTimeout(() => {
        dispatch(hidePopUp());
      }, 5000);
    } finally {
      setRequest(false);
      setRequested(false);
    }
  }
  //   my();
  const [showHistory, setShowHistory] = useState(false);
  const [requested, setRequested] = useState(false);
  const [output, setOutput] = useState([]);
  const [request, setRequest] = useState(false);
  const [parent, setParent] = useState(false);
  const [copyText, setCopyText] = useState("");
  const wordref = useRef();
  const callThisFunction = (receivedvalue) => {
    setCopyText("");
    setRequest(true);
    setParent(false);
    setRequested(true);
    my(receivedvalue);
  };
  const closeAll = () => {
    setParent(false);
    setRequest(false);
  };

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await readData(userId);
      setHistory(data["YT"] ? data["YT"] : []);
      setIsHistoryLoading(false);
    };
    setIsHistoryLoading(true);
    fetchHistory();
  }, []);

  const popupHandler = (ind, arr) => {
    return (
      <div className={classes.popup}>
        <MdCancel
          className={classes.cancel}
          fontSize={"2rem"}
          onClick={() => {
            setIsPopUP(false);
            props.updateShowing(false);
          }}
        />
        <div className={classes.inputContainer}>
          <p className={classes.prompt}>
            <span className="text-[#fc0001]">Prompt:</span>
            {arr[ind].prompt}
          </p>
          <Copy size={".9rem"} text={arr[ind].output} />
        </div>
        <div className="w-full md:max-h-80 max-h-40 overflow-scroll no-scrollbar">
          <span className="text-[#fc0001]">output:</span>
          {arr[ind].output}
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
        className={`w-screen ${props.showing ? "h-[100vh] overflow-hidden" : "h-auto"} grid pb-10 grid-cols-1 md:grid-cols-4 place-content-center place-items-start gap-2`}
      >
        <div className={`w-full col-span-1 md:col-span-3 h-auto p-2 md:p-4`}>
          <Title title="AI Transcript Tube" setShowHistory={setShowHistory} />
          <PromptAreaForMail
            placeholder="Enter The Video Id here.."
            ref={wordref}
            callThisFunction={callThisFunction}
            buttonText="Search"
            icon={<FaSearch />}
            requested={requested}
          />
          {request && (
            <Loading
              label="Extracting Video Details For You , This can Take Some Time.."
              size="40px"
            />
          )}
          {parent && output.length !== 0 && (
            <>
              {output.map((value, index) => {
                return (
                  <ParentYt
                    value={value}
                    index={index}
                    key={index}
                    copyText={copyText}
                    setCopyText={setCopyText}
                  />
                );
              })}
            </>
          )}
          <div className="w-full flex flex-col my-4 font-lexend text-sm md:text-base lg:text-lg xl:text-xl justify-center items-center gap-2 bg-[#1E1E1E] rounded-xl">
            <h1 className="w-full text-center flex justify-center text-sm md:text-base lg:text-lg xl:text-xl gap-2 font-extrabold items-center py-2 text-white">
              <TbBulb color="yellow" fontSize="1.5rem" />
              Don’t have idea ? Try these!
            </h1>
            <div className="w-full p-4 rounded-lg bg-[#1E1E1E]  font-normal grid grid-cols-1 lg:grid-cols-2 place-content-center place-items-center gap-2">
              {[
                ["PGUdWfB8nLg"],
                ["Tuw8hxrFBH8"],
                ["PWDQpEBq_pUg"],
                ["TqA0tiD5z5Y"],
                ["tMdFGrnp5XI"],
                ["pPaNRlZTX4Y"],
              ].map((value, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      window.scrollTo(0, 0);
                      wordref.current.value = value;
                      closeAll();
                    }}
                    className="w-full px-8 py-4 text-justify h-20 overflow-scroll no-scrollbar text-sm bg-[#080b10] border-2 border-black hover:border-[#728894] hover:bg-black  rounded-md text-[#ffffffa0]"
                  >
                    {value}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <History
          height="660px"
          popup={ispopup}
          showPopUp={setIsPopUP}
          isHistroyLoading={isHistroyLoading}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
          history={history}
          popupHandler={popupHandler}
          updateShowing={props.updateShowing}
        />
      </div>
      {!props.showing && (
        <Bottom label="Go to All tools" navigateTo=".." userId={userId} />
      )}
    </>
  );
};

export default YT;

import React, { useEffect, useMemo, useRef, useState } from "react";
import Bottom from "../../UI/Bottom.jsx";
import { HfInference } from "@huggingface/inference";
import Loading from "../../UI/Loading";
import Copy from "../../UI/Copy";
import { MdCompress } from "react-icons/md";
import { TbBulb } from "react-icons/tb";
import { convert } from "html-to-text";
import Title from "./RequiredComponents/Title.jsx";
import { FiMinimize2 } from "react-icons/fi";
import { FiMaximize2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { hidePopUp, showPopUp } from "../../store/popupSlice.jsx";
import { MdError } from "react-icons/md";
import History from "../../UI/History.jsx";
import PromptAreaForText from "./RequiredComponents/PromptAreaForText.jsx";
import { useLocation } from "react-router-dom";
import PromptAreaForMail from "./RequiredComponents/PromptAreaForMail.jsx";
import { updateData } from "../../common-funtions/updateData.jsx";
import classes from "./Summarizer.module.css";
import { MdCancel } from "react-icons/md";
import { readData } from "../../common-funtions/readData.jsx";
const Summarizer = (props) => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const location = useLocation();
  const userId = location.state.userId;
  const [showHistory, setShowHistory] = useState(false);
  const [requested, setRequested] = useState(false);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState("");
  const [bhetla, setBhetla] = useState(false);
  const [mm, showmm] = useState(false);
  const [processState, setProcessState] = useState(false);
  const [temp, setTemp] = useState(25);
  const inputRef = useRef();
  const inputRefs = useRef();
  const dispatch = useDispatch();
  const [history, setHistory] = useState([]);
  const [isPopUp, setIsPopUP] = useState(false);
  const [isHistroyLoading, setIsHistoryLoading] = useState(false);

  const saveHistory = async (prompt, result) => {
    const obj = {
      prompt,
      output: result,
      time: new Date().toISOString(),
    };
    setHistory((history) => [obj, ...history]);
    await updateData(userId, {
      SUMMARIZER: [obj, ...history],
    });
  };

  const clickHandler = (e, length) => {
    showmm(false);
    setRequested(true);
    setTyping(true);
    getSummarizeddViaText(inputRef.current.value, length);
    setBhetla(false);
  };
  const maxmin = (length) => {
    showmm(false);
    setTyping(true);
    getSummarizeddViaText(
      mail ? inputRefs.current.value : inputRef.current.value,
      length
    );
    setBhetla(false);
  };
  const changeHandler = (e) => {
    setTyping(false);
    showmm(false);
  };
  const divRef = useRef();
  const HF_TOKEN = "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";
  const inference = new HfInference(HF_TOKEN);
  const [a, setA] = useState(false);
  async function getSummarizeddViaText(data, length) {
    try {
      const response = await inference.summarization({
        model: "Falconsai/text_summarization",
        inputs: data + "",
        parameters: {
          min_length: length,
          max_length: length + 25,
        },
      });
      saveHistory(`${data}`, response.summary_text);
      setText(response.summary_text);
      setBhetla(true);
      setRequested(false);
      showmm(true);
    } catch (errror) {
      errorOccured(
        "Oops Something Went Wrong!",
        "This can be either due to Poor Internet Connection or Inaccurate Prompt!!!!"
      );
    }
  }
  const [mail, setMail] = useState(false);
  const callThisFunction = (passedValue) => {
    showmm(false);
    setRequested(true);
    setTyping(true);
    setBhetla(false);
    fetch(passedValue)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.text();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((anotherRes) => {
        const temp = convert(anotherRes);
        getSummarizeddViaText(temp, 25);
      })
      .catch((error) => {
        console.log(error);
        errorOccured(
          "Inaccurate URL Passeed!",
          "No Such Corresponding URL Found to Search!!!"
        );
      });
  };
  const errorOccured = (title, description) => {
    setRequested(false);
    setTyping(false);
    setText("");
    setBhetla(false);
    dispatch(
      showPopUp({
        color: "#892330",
        bgColor: "#e5c2c2",
        title: title,
        description: description,
        icon: <MdError color="#892330" fontSize="4rem" />,
      })
    );
    setA(true);
    setTimeout(() => {
      dispatch(hidePopUp());
      setA(false);
    }, 5000);
  };

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
        <div className={classes.promptContainer}>
          <div className={classes.heading}>
            <p>Prompt:</p>
            <div className={classes.copy}>
              <Copy size={".9rem"} text={arr[ind].prompt} />
            </div>
          </div>
          <p>{arr[ind].prompt}</p>
        </div>
        <div className={classes.promptContainer}>
          <div className={classes.heading}>
            <p>Summarize Text:</p>
            <div className={classes.copy}>
              <Copy size={".9rem"} text={arr[ind].output} />
            </div>
          </div>
          <p>{arr[ind].output}</p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await readData(userId);
      setHistory(data["SUMMARIZER"] ? data["SUMMARIZER"] : []);
      console.log(userId);
      setIsHistoryLoading(false);
    };
    setIsHistoryLoading(true);
    fetchHistory();
  }, []);

  return (
    <React.Fragment>
      <div
        className={`w-screen ${props.showing ? "h-[100vh] overflow-hidden" : "h-auto"} grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 place-content-center place-items-start pt-2`}
      >
        <div
          ref={divRef}
          className="w-full md:col-span-3 lg:col-span-3 col-span-1 flex overflow-scroll no-scrollbar flex-col justify-center items-center h-auto p-3 md:p-3 lg:p-4 font-lexend font-extrabold text-sm md:text-base lg:text-lg xl:text-lg gap-4"
        >
          {/* title */}
          <Title title="Ai BriefBuddy" setShowHistory={setShowHistory} />
          {/* input and button */}
          {!mail && (
            <PromptAreaForText
              placeholder="Enter Your Text Here..."
              temp={temp}
              ref={inputRef}
              onChange={changeHandler}
              clickHandler={clickHandler}
              change={true}
              requested={requested}
              processState={processState}
              buttonText="Summarize"
              icon={<MdCompress className="text-base lg:text-lg" />}
            />
          )}
          {/* input and button for link */}
          {mail && (
            <PromptAreaForMail
              placeholder="Enter Your URL Here."
              changeHandler={changeHandler}
              change={true}
              callThisFunction={callThisFunction}
              ref={inputRefs}
              buttonText="Summarize"
              icon={<MdCompress className="text-base lg:text-lg" />}
            />
          )}
          {/* result */}
          {typing && (
            <>
              <div className="w-full font-normal text-justify px-8 py-4 rounded-xl bg-[#1E1E1E] text-[#ffffff8f]  max-h-[50vh]">
                {bhetla && text}
                {bhetla && (
                  <div className="w-full text-justify flex justify-end items-center">
                    <Copy text={text}></Copy>
                  </div>
                )}
                {!bhetla && (
                  <Loading
                    label="Summarizing Text For You , This can Take Some Time.."
                    size="40px"
                  />
                )}
              </div>
              {mm && (
                <>
                  <div className="w-full px-8 text-white text-[#ffffff8f] mb-8 text-sm md:text-base lg:text-lg grid grid-cols-2 place-content-center">
                    {!(temp > 25) && <h1 className="w-full"></h1>}
                    {temp > 25 && (
                      <h1
                        className="w-full cursor-pointer  underline-offset-4 gap-1  decoration-solid underline hover:text-[#ffffff8f] text-[#fc0001] flex justify-start items-center"
                        onClick={() => {
                          let another = temp - 25;
                          setTemp(another);
                          maxmin(another);
                        }}
                      >
                        <FiMinimize2 className="font-extrabold text-2xl" />
                        Minimize{" "}
                        <h1 className="hidden lg:inline ml-2"> Length</h1>
                      </h1>
                    )}
                    <h1
                      className="w-full cursor-pointer flex decoration-solid gap-1 underline underline-offset-4 hover:text-[#ffffff8f] text-[#fc0001] justify-end items-center"
                      onClick={() => {
                        let another = temp + 25;
                        setTemp(another);
                        maxmin(another);
                      }}
                    >
                      <FiMaximize2 className="font-extrabold text-2xl"></FiMaximize2>
                      Maximize <p className="hidden lg:inline ml-2">Length</p>
                    </h1>
                  </div>
                  {!mail && (
                    <h1 className="w-full flex justify-start items-center text-[#728894]">
                      <p
                        className=" underline decoration-solid underline-offset-4   mb-2 px-8 text-sm md:text-base lg:text-lg decoration-[#728894] hover:text-white cursor-pointer hover:decoration-white"
                        onClick={() => {
                          setMail(true);
                          showmm(false);
                          setTyping(false);
                          setTemp(25);
                        }}
                      >
                        Summarize an Website Text Based On It's URl..
                      </p>
                    </h1>
                  )}
                  {mail && (
                    <h1 className="w-full flex justify-start items-center text-[#728894]">
                      <p
                        className="underline decoration-solid underline-offset-4  text-sm md:text-base lg:text-lg mb-2 decoration-[#728894] hover:text-white cursor-pointer hover:decoration-white"
                        onClick={() => {
                          setMail(false);
                          showmm(false);
                          setTyping(false);
                          setTemp(25);
                        }}
                      >
                        Summarize Text By Providing Prompt..
                      </p>
                    </h1>
                  )}
                </>
              )}
            </>
          )}
          {/* trying List */}
          <div className="w-full fle flex-col justify-center items-center gap-2 bg-[#1E1E1E] rounded-xl">
            <h1 className="w-full text-center flex justify-center gap-2 items-center py-2 text-base text-white">
              <TbBulb color="yellow" fontSize="1.5rem" />
              Don’t have idea ? Try these!
            </h1>
            {!mail && (
              <div className="w-full p-4 rounded-lg font-normal grid grid-cols-1 lg:grid-cols-2 place-content-center place-items-center gap-2">
                {[
                  [
                    "Full stack web development involves the creation of dynamic web applications that encompass both front-end and back-end development aspects. In essence, it requires proficiency in a wide range of technologies, frameworks, and tools to build a fully functional web application from start to finish.On the front-end side, full stack developers are skilled in languages such as HTML, CSS, and JavaScript, along with frameworks like React, Angular, or Vue.js. They're responsible for creating the user interface (UI) and ensuring a seamless user experience across different devices and browsers.In the back-end realm, full stack developers work with server-side languages like Node.js, Python, Ruby, or Java, as well as databases such as MySQL, MongoDB, or PostgreSQL. They handle server-side logic, database interactions, user authentication, and data management to ensure the application's functionality and performance.Additionally, full stack developers must be familiar with various development tools and technologies such as Git for version control, RESTful APIs for communication between the front-end and back-end, and cloud platforms like AWS or Azure for deployment and hosting.Overall, full stack web development requires a versatile skill set, adaptability to evolving technologies, and a holistic understanding of both front-end and back-end development processes to create robust, scalable, and efficient web applications.",
                  ],
                  [
                    "React Native is a popular open-source framework developed by Facebook for building cross-platform mobile applications using JavaScript and React. It allows developers to leverage their existing knowledge of web technologies to create native-like experiences for both iOS and Android platforms, saving time and effort in the development process.One of the key advantages of React Native is its ability to provide a truly native performance by rendering UI components using native APIs. This ensures that the applications built with React Native deliver smooth animations, fast load times, and excellent user experiences comparable to those developed with native technologies.Moreover, React Native promotes code reusability, enabling developers to write a single codebase that can be shared across multiple platforms. This not only streamlines the development process but also facilitates easier maintenance and updates, as changes made to the codebase are automatically reflected on both iOS and Android platforms.Furthermore, React Native boasts a vibrant ecosystem with a plethora of third-party libraries, tools, and community-driven resources, which enhance developer productivity and enable them to extend the framework's capabilities according to project requirements.In summary, React Native empowers developers to build high-quality mobile applications efficiently, utilizing their existing JavaScript and React skills while delivering native-like performance and user experiences across different platforms.",
                  ],
                ].map((value, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        inputRef.current.value = value;
                      }}
                      className="w-full px-8 py-4 text-justify max-h-40 overflow-scroll no-scrollbar text-sm bg-[#080b10] border-2 border-black hover:border-[#728894] hover:bg-black  rounded-md text-[#ffffffa0]"
                    >
                      {value}
                    </div>
                  );
                })}
              </div>
            )}
            {mail && (
              <div className="w-full p-4 rounded-lg  font-normal grid grid-cols-1 lg:grid-cols-2 place-content-center place-items-center gap-2">
                {[
                  ["https://en.wikipedia.org/wiki/Facebook"],
                  ["https://en.wikipedia.org/wiki/Instagram"],
                ].map((value, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        inputRefs.current.value = value;
                      }}
                      className="w-full px-8 py-4 text-justify h-20 overflow-scroll no-scrollbar text-sm bg-[#080b10] border-2 border-black hover:border-[#728894] hover:bg-black  rounded-md text-[#ffffffa0]"
                    >
                      {value}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <History
          height="660px"
          showHistory={showHistory}
          popup={isPopUp}
          showPopUp={setIsPopUP}
          isHistroyLoading={isHistroyLoading}
          setShowHistory={setShowHistory}
          history={history}
          popupHandler={popupHandler}
          updateShowing={props.updateShowing}
        />
      </div>
      {!props.showing && (
        <Bottom label="Go to All tools" navigateTo=".." userId={userId} />
      )}
    </React.Fragment>
  );
};
export default Summarizer;

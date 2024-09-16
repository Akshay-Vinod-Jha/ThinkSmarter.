import { useState, useRef, useCallback, useEffect } from "react";
import classes from "./QA.module.css";
import History from "../../UI/History";
import InputBox from "./RequiredComponents/InputBox";
import Output from "./RequiredComponents/Output";
import { HfInference } from "@huggingface/inference";
import { useDispatch } from "react-redux";
import { MdError } from "react-icons/md";
import { hidePopUp, showPopUp } from "../../store/popupSlice.jsx";
import TryThese from "./RequiredComponents/TryThese.jsx";
const HF_TOKEN = "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";
import { useLocation } from "react-router-dom";
import { readData } from "../../common-funtions/readData.jsx";
import { updateData } from "../../common-funtions/updateData.jsx";
import { MdCancel } from "react-icons/md";
import Copy from "../../UI/Copy.jsx";
import Bottom from "../../UI/Bottom.jsx";
const QA = (props) => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const location = useLocation();
  const userId = location.state.userId;
  const [ispopup, setIsPopUp] = useState(false);
  const [isHistroyLoading, setIsHistoryLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const dispatch = useDispatch();
  const questionRef = useRef();
  const contextRef = useRef();
  const [display, setDipslay] = useState("textarea");
  const [src, setSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [answer, setAnswer] = useState("Output will be display here...");
  const saveHistory = async (prompt, context, output, type) => {
    const obj = {
      prompt,
      context,
      output,
      type,
      time: new Date().toISOString(),
    };
    setHistory((history) => {
      return [obj, ...history];
    });
    await updateData(userId, {
      QA: [obj, ...history],
    });
  };

  const errorHandler = useCallback(() => {
    dispatch(
      showPopUp({
        color: "#892330",
        bgColor: "#e5c2c2",
        title: "Something went Wrong!",
        description: "Failed to Find Answer",
        icon: <MdError color="#892330" fontSize="4rem" />,
      })
    );
    setTimeout(() => {
      dispatch(hidePopUp());
    }, 5000);
  }, []);

  const getAnswer = async (context, question) => {
    window.scroll(0, 500);
    setIsLoading(true);
    try {
      const inference = new HfInference(HF_TOKEN);
      const data = await inference.questionAnswering({
        model:
          "google-bert/bert-large-uncased-whole-word-masking-finetuned-squad",
        inputs: { question, context },
      });
      setAnswer(data.answer);
      saveHistory(question, context, data.answer, "text");
    } catch (err) {
      console.log(err);
      errorHandler;
    } finally {
      setIsLoading(false);
    }
  };

  const getAnswerFromImage = async (url, question) => {
    window.scroll(0, 500);
    setIsLoading(true);

    try {
      const blob = await (await fetch(url)).blob();
      const inference = new HfInference(HF_TOKEN);
      const data = await inference.documentQuestionAnswering({
        model: "impira/layoutlm-document-qa",
        inputs: { image: blob, question },
      });
      setAnswer(data.answer);
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        saveHistory(question, reader.result, data.answer, "image");
      };
    } catch (err) {
      console.log(err.message);
      errorHandler();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await readData(userId);
      setHistory(data["QA"] ? data["QA"] : []);
      setIsHistoryLoading(false);
    };
    setIsHistoryLoading(true);
    fetchHistory();
  }, []);

  const popupHandler = (ind, arr) => {
    return (
      <div
        className={`${classes.popupp} ${arr[ind].type === "text" ? classes.popup : classes.image} `}
      >
        <MdCancel
          className={classes.cancel}
          fontSize={"2rem"}
          onClick={() => {
            setIsPopUp(false);
            props.updateShowing(false);
          }}
        />
        <div className={classes.promptContainer}>
          <div className={classes.heading}>
            <p>Context:</p>
          </div>

          {arr[ind].type === "text" ? (
            <p>{arr[ind].context}</p>
          ) : (
            <img src={arr[ind].context} className={classes.img} />
          )}
        </div>
        <div className={classes.right}>
          <div className={classes.promptContainer}>
            <div className={classes.heading}>
              <p>Question:</p>
            </div>
            <p>{arr[ind].prompt}</p>
          </div>
          <div className={classes.promptContainer}>
            <div className={classes.heading}>
              <p>Answer:</p>
              <div className={classes.copy}>
                <Copy size={".9rem"} text={arr[ind].output} />
              </div>
            </div>
            <p>{arr[ind].output}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={
        classes.QA + ` ${props.showing ? "h-[60vh] overflow-hidden" : "h-auto"}`
      }
    >
      <div className={classes.upper}>
        <InputBox
          setShowHistory={setShowHistory}
          getAnswer={getAnswer}
          isLoading={isLoading}
          getAnswerFromImage={getAnswerFromImage}
          setIsLoading={setIsLoading}
          questionRef={questionRef}
          contextRef={contextRef}
          display={display}
          setDipslay={setDipslay}
          src={src}
          setSrc={setSrc}
        />
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
      <div className={classes.lower}>
        <Output isLoading={isLoading} output={answer} />
      </div>
      <div>
        <TryThese
          setSrc={setSrc}
          questionRef={questionRef}
          getAnswerFromImage={getAnswerFromImage}
          display={display}
          trythisHandler={(context, question) => {
            window.scroll(0, 0);
            contextRef.current.value = context;
            questionRef.current.value = question;
          }}
        />
      </div>
      {!props.showing && (
        <Bottom label="Go to All tools" navigateTo=".." userId={userId} />
      )}
    </div>
  );
};

export default QA;

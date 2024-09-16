// import React from "react";
import MainBox from "./RequiredComponents/MainBox";
import TryThese from "./RequiredComponents/TryThese";
import Bottom from "../../UI/Bottom";
import classes from "./VisionVerbalizer.module.css";
import { useEffect, useState, useCallback } from "react";
import { HfInference } from "@huggingface/inference";
import Output from "./RequiredComponents/Output";
import History from "../../UI/History";
import { MdError } from "react-icons/md";
import { useDispatch } from "react-redux";
import { showPopUp, hidePopUp } from "../../store/popupSlice";
const HF_TOKEN = "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";
import { updateData } from "../../common-funtions/updateData";
import { readData } from "../../common-funtions/readData";
import { MdCancel } from "react-icons/md";
import Copy from "../../UI/Copy";
import { useLocation } from "react-router-dom";

const VisionVerbalizer = (props) => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const location = useLocation();
  const userId = location.state.userId;
  const [src, setSrc] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [ispopup, setIsPopUp] = useState(false);
  const [generatedText, setGeneratedText] = useState(
    "Generated Text will be Display Here"
  );
  const [isHistroyLoading, setIsHistoryLoading] = useState(false);

  const [isLoading, setIsLoding] = useState(false);
  const dispatch = useDispatch();
  const [history, setHistory] = useState([]);

  const saveHistory = async (base64Url, result, userId) => {
    const obj = {
      prompt: base64Url,
      output: result,
      time: new Date().toISOString(),
    };

    setHistory((history) => {
      return [obj, ...history];
    });

    await updateData(userId, {
      VISIONVERBALIZER: [obj, ...history],
    });
  };

  const errorHandler = useCallback(() => {
    dispatch(
      showPopUp({
        color: "#892330",
        bgColor: "#e5c2c2",
        title: "Something went Wrong!",
        description:
          "Provided Image Format is Not Supported, Try Another Image Format!",
        icon: <MdError color="#892330" fontSize="4rem" />,
      })
    );
    setTimeout(() => {
      dispatch(hidePopUp());
    }, 5000);
  }, []);

  const get = async (temp) => {
    console.log(temp);
    setIsLoding(true);
    try {
      window.scrollTo(0, 400);
      const response = await fetch(temp);
      const blobimage = await response.blob(response);
      const inference = new HfInference(HF_TOKEN);
      const data = await inference.imageToText({
        data: blobimage,
        model: "Salesforce/blip-image-captioning-large",
      });
      setGeneratedText(data.generated_text);
      const reader = new FileReader();
      reader.readAsDataURL(blobimage);
      reader.onloadend = () => {
        saveHistory(reader.result, data.generated_text, userId);
      };
    } catch (err) {
      console.log(err.message);
      errorHandler();
    } finally {
      setIsLoding(false);
    }
  };

  useEffect(() => {
    src && get(src);
  }, [src]);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await readData(userId);
      setHistory(data["VISIONVERBALIZER"] ? data["VISIONVERBALIZER"] : []);
      setIsHistoryLoading(false);
    };
    setIsHistoryLoading(true);
    fetchHistory();
  }, []);

  const popupHandler = (ind) => {
    return (
      <div className={classes.popup}>
        <MdCancel
          className={classes.cancel}
          fontSize={"2rem"}
          onClick={() => {
            setIsPopUp(false);
            props.updateShowing(false);
          }}
        />
        <div className={classes.imgContainer}>
          <p className={classes.inputs} style={{ color: "#fc1001" }}>
            Input
          </p>
          <img src={history[ind].prompt} />
        </div>
        <div className={classes.prompt}>
          <div>
            <Copy size="1rem" text={history[ind].output} />
          </div>
          {`Output: ${history[ind].output}`}
        </div>
      </div>
    );
  };

  return (
    <div
      className={
        classes.VisionVerbalizer +
        `   ${props.showing ? "h-[100vh] overflow-hidden" : "h-auto"}  `
      }
    >
      <div className={classes.upper}>
        <MainBox src={src} updateSrc={setSrc} setShowHistory={setShowHistory} />
        <History
          isHistroyLoading={isHistroyLoading}
          showPopUp={setIsPopUp}
          popup={ispopup}
          height="650px"
          showHistory={showHistory}
          setShowHistory={setShowHistory}
          history={history}
          popupHandler={popupHandler}
          updateShowing={props.updateShowing}
        />
      </div>
      <Output isLoading={isLoading}>{generatedText}</Output>
      <div className={classes.lower}>
        <TryThese updateSrc={setSrc} />
      </div>
      {!props.showing && (
        <Bottom label="Go to All tools" navigateTo=".." userId={userId} />
      )}
    </div>
  );
};

export default VisionVerbalizer;

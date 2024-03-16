// import React from "react";
import MainBox from "./RequiredComponets/MainBox";
import TryThese from "./RequiredComponets/TryThese";
import classes from "./TextExtraction.module.css";
import { useState, useCallback, useEffect } from "react";
import Output from "./RequiredComponets/Output";
import History from "../../UI/History";
import { MdError } from "react-icons/md";
import { useDispatch } from "react-redux";
import { showPopUp, hidePopUp } from "../../store/popupSlice";
import { getTextFromPdf } from "../../common-funtions/getTextFromPdf";
import { getTextFromImage } from "../../common-funtions/getTextFormImage";

const TextExtraction = () => {
  const [src, setSrc] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [generatedText, setGeneratedText] = useState(
    "Generated Text will be Display Here"
  );

  const [isLoading, setIsLoding] = useState(false);
  const dispatch = useDispatch();

  const errorHandler = () => {
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
    setSrc(null);
    setGeneratedText("Generated Text will be Display Here");
    setTimeout(() => {
      dispatch(hidePopUp());
    }, 5000);
  };

  const get = useCallback(async (url, fileType) => {
    window.scrollTo(0, 400);
    setIsLoding(true);
    try {
      setSrc(url);
      let text = "";
      if (fileType === "application/pdf") {
        text = await getTextFromPdf(url);
        setGeneratedText(text.join("\n\n"));
      } else {
        text = await getTextFromImage(url);
        setGeneratedText(text);
      }
    } catch (err) {
      console.log(err.message);
      errorHandler();
    } finally {
      setIsLoding(false);
    }
  });

  const getImageHandler = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => get(reader.result, file.type);
  };

  return (
    <div className={classes.VisionVerbalizer}>
      <div className={classes.upper}>
        <MainBox
          src={src}
          setSrc={setSrc}
          setShowHistory={setShowHistory}
          getImageHandler={getImageHandler}
          setSrc={setSrc}
        />
        <History
          height="650px"
          showHistory={showHistory}
          setShowHistory={setShowHistory}
          history={Array(5).fill(
            "The Generated text History from the uploaded image is displayed here."
          )}
        />
      </div>
      <Output isLoading={isLoading}>{generatedText}</Output>
      <div className={classes.lower}>
        <TryThese getImageHandler={getImageHandler} />
      </div>
    </div>
  );
};

export default TextExtraction;

import React, { useEffect, useRef, useState } from "react";
import History from "../../UI/History";
import Bottom from "../../UI/Bottom.jsx";
import Copy from "../../UI/Copy";
import Title from "../Summarizer/RequiredComponents/Title";
import BigTextarea from "./BigTextarea";
import { TbBulb } from "react-icons/tb";
import cssClasses from "./Translation.module.css";
import OrangeButton from "../../UI/OrangeButton";
import { PiDetectiveFill } from "react-icons/pi";
import { MdError } from "react-icons/md";
import { useDispatch } from "react-redux";
import { hidePopUp, showPopUp } from "../../store/popupSlice.jsx";
import Loader from "../../UI/Loader";
import Conversion from "./Conversion";
import { useLocation } from "react-router-dom";
import { readData } from "../../common-funtions/readData.jsx";
import { updateData } from "../../common-funtions/updateData.jsx";
import { MdCancel } from "react-icons/md";
const languages = [
  {
    language: "af",
    name: "Afrikaans",
  },
  {
    language: "sq",
    name: "Albanian",
  },
  {
    language: "am",
    name: "Amharic",
  },
  {
    language: "ar",
    name: "Arabic",
  },
  {
    language: "hy",
    name: "Armenian",
  },
  {
    language: "as",
    name: "Assamese",
  },
  {
    language: "ay",
    name: "Aymara",
  },
  {
    language: "az",
    name: "Azerbaijani",
  },
  {
    language: "bm",
    name: "Bambara",
  },
  {
    language: "eu",
    name: "Basque",
  },
  {
    language: "be",
    name: "Belarusian",
  },
  {
    language: "bn",
    name: "Bengali",
  },
  {
    language: "bho",
    name: "Bhojpuri",
  },
  {
    language: "bs",
    name: "Bosnian",
  },
  {
    language: "bg",
    name: "Bulgarian",
  },
  {
    language: "ca",
    name: "Catalan",
  },
  {
    language: "ceb",
    name: "Cebuano",
  },
  {
    language: "ny",
    name: "Chichewa",
  },
  {
    language: "zh",
    name: "Chinese (Simplified)",
  },
  {
    language: "zh-TW",
    name: "Chinese (Traditional)",
  },
  {
    language: "co",
    name: "Corsican",
  },
  {
    language: "hr",
    name: "Croatian",
  },
  {
    language: "cs",
    name: "Czech",
  },
  {
    language: "da",
    name: "Danish",
  },
  {
    language: "dv",
    name: "Divehi",
  },
  {
    language: "doi",
    name: "Dogri",
  },
  {
    language: "nl",
    name: "Dutch",
  },
  {
    language: "en",
    name: "English",
  },
  {
    language: "eo",
    name: "Esperanto",
  },
  {
    language: "et",
    name: "Estonian",
  },
  {
    language: "ee",
    name: "Ewe",
  },
  {
    language: "tl",
    name: "Filipino",
  },
  {
    language: "fi",
    name: "Finnish",
  },
  {
    language: "fr",
    name: "French",
  },
  {
    language: "fy",
    name: "Frisian",
  },
  {
    language: "gl",
    name: "Galician",
  },
  {
    language: "lg",
    name: "Ganda",
  },
  {
    language: "ka",
    name: "Georgian",
  },
  {
    language: "de",
    name: "German",
  },
  {
    language: "el",
    name: "Greek",
  },
  {
    language: "gn",
    name: "Guarani",
  },
  {
    language: "gu",
    name: "Gujarati",
  },
  {
    language: "ht",
    name: "Haitian Creole",
  },
  {
    language: "ha",
    name: "Hausa",
  },
  {
    language: "haw",
    name: "Hawaiian",
  },
  {
    language: "iw",
    name: "Hebrew",
  },
  {
    language: "hi",
    name: "Hindi",
  },
  {
    language: "hmn",
    name: "Hmong",
  },
  {
    language: "hu",
    name: "Hungarian",
  },
  {
    language: "is",
    name: "Icelandic",
  },
  {
    language: "ig",
    name: "Igbo",
  },
  {
    language: "ilo",
    name: "Iloko",
  },
  {
    language: "id",
    name: "Indonesian",
  },
  {
    language: "ga",
    name: "Irish Gaelic",
  },
  {
    language: "it",
    name: "Italian",
  },
  {
    language: "ja",
    name: "Japanese",
  },
  {
    language: "jw",
    name: "Javanese",
  },
  {
    language: "kn",
    name: "Kannada",
  },
  {
    language: "kk",
    name: "Kazakh",
  },
  {
    language: "km",
    name: "Khmer",
  },
  {
    language: "rw",
    name: "Kinyarwanda",
  },
  {
    language: "gom",
    name: "Konkani",
  },
  {
    language: "ko",
    name: "Korean",
  },
  {
    language: "kri",
    name: "Krio",
  },
  {
    language: "ku",
    name: "Kurdish (Kurmanji)",
  },
  {
    language: "ckb",
    name: "Kurdish (Sorani)",
  },
  {
    language: "ky",
    name: "Kyrgyz",
  },
  {
    language: "lo",
    name: "Lao",
  },
  {
    language: "la",
    name: "Latin",
  },
  {
    language: "lv",
    name: "Latvian",
  },
  {
    language: "ln",
    name: "Lingala",
  },
  {
    language: "lt",
    name: "Lithuanian",
  },
  {
    language: "lb",
    name: "Luxembourgish",
  },
  {
    language: "mk",
    name: "Macedonian",
  },
  {
    language: "mai",
    name: "Maithili",
  },
  {
    language: "mg",
    name: "Malagasy",
  },
  {
    language: "ms",
    name: "Malay",
  },
  {
    language: "ml",
    name: "Malayalam",
  },
  {
    language: "mt",
    name: "Maltese",
  },
  {
    language: "mi",
    name: "Maori",
  },
  {
    language: "mr",
    name: "Marathi",
  },
  {
    language: "mni-Mtei",
    name: "Meiteilon (Manipuri)",
  },
  {
    language: "lus",
    name: "Mizo",
  },
  {
    language: "mn",
    name: "Mongolian",
  },
  {
    language: "my",
    name: "Myanmar (Burmese)",
  },
  {
    language: "ne",
    name: "Nepali",
  },
  {
    language: "nso",
    name: "Northern Sotho",
  },
  {
    language: "no",
    name: "Norwegian",
  },
  {
    language: "or",
    name: "Odia (Oriya)",
  },
  {
    language: "om",
    name: "Oromo",
  },
  {
    language: "ps",
    name: "Pashto",
  },
  {
    language: "fa",
    name: "Persian",
  },
  {
    language: "pl",
    name: "Polish",
  },
  {
    language: "pt",
    name: "Portuguese",
  },
  {
    language: "pa",
    name: "Punjabi",
  },
  {
    language: "qu",
    name: "Quechua",
  },
  {
    language: "ro",
    name: "Romanian",
  },
  {
    language: "ru",
    name: "Russian",
  },
  {
    language: "sm",
    name: "Samoan",
  },
  {
    language: "sa",
    name: "Sanskrit",
  },
  {
    language: "gd",
    name: "Scots Gaelic",
  },
  {
    language: "sr",
    name: "Serbian",
  },
  {
    language: "st",
    name: "Sesotho",
  },
  {
    language: "sn",
    name: "Shona",
  },
  {
    language: "sd",
    name: "Sindhi",
  },
  {
    language: "si",
    name: "Sinhala",
  },
  {
    language: "sk",
    name: "Slovak",
  },
  {
    language: "sl",
    name: "Slovenian",
  },
  {
    language: "so",
    name: "Somali",
  },
  {
    language: "es",
    name: "Spanish",
  },
  {
    language: "su",
    name: "Sundanese",
  },
  {
    language: "sw",
    name: "Swahili",
  },
  {
    language: "sv",
    name: "Swedish",
  },
  {
    language: "tg",
    name: "Tajik",
  },
  {
    language: "ta",
    name: "Tamil",
  },
  {
    language: "tt",
    name: "Tatar",
  },
  {
    language: "te",
    name: "Telugu",
  },
  {
    language: "th",
    name: "Thai",
  },
  {
    language: "ti",
    name: "Tigrinya",
  },
  {
    language: "ts",
    name: "Tsonga",
  },
  {
    language: "tr",
    name: "Turkish",
  },
  {
    language: "tk",
    name: "Turkmen",
  },
  {
    language: "ak",
    name: "Twi",
  },
  {
    language: "uk",
    name: "Ukrainian",
  },
  {
    language: "ur",
    name: "Urdu",
  },
  {
    language: "ug",
    name: "Uyghur",
  },
  {
    language: "uz",
    name: "Uzbek",
  },
  {
    language: "vi",
    name: "Vietnamese",
  },
  {
    language: "cy",
    name: "Welsh",
  },
  {
    language: "xh",
    name: "Xhosa",
  },
  {
    language: "yi",
    name: "Yiddish",
  },
  {
    language: "yo",
    name: "Yoruba",
  },
  {
    language: "zu",
    name: "Zulu",
  },
  {
    language: "he",
    name: "Hebrew",
  },
  {
    language: "jv",
    name: "Javanese",
  },
  {
    language: "zh-CN",
    name: "Chinese (Simplified)",
  },
];
const Translation = (props) => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const [showHistory, setShowHistory] = useState(false);
  const senetenceRef = useRef();
  const dispatch = useDispatch();
  const location = useLocation();
  const userId = location.state.userId;
  const [ispopup, setIsPopUp] = useState(false);
  const [isHistroyLoading, setIsHistoryLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [languagecode, setLanguageCode] = useState(languages);
  const [impCode, setImpCode] = useState("en");
  const [sdl, ssdl] = useState([false, ""]);
  const [dlbe, sdlbe] = useState(false);
  const [toTranslate, setToTranslate] = useState(false);
  const [impl, setimpl] = useState("en");
  const [lastArea, sla] = useState(false);
  const [anything, sa] = useState("");
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
      Translation: [obj, ...history],
    });
  };
  useEffect(() => {
    const fetchHistory = async () => {
      const data = await readData(userId);
      setHistory(data["Translation"] ? data["Translation"] : []);
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
        <h1 className="w-full flex justify-start text-[#fc0001]  items-center text-left">
          Prompt:
        </h1>
        <h1 className="w-full flex justify-start text-white items-center">
          {arr[ind].prompt}
        </h1>
        <br />
        <h1 className="w-full flex justify-start text-[#fc0001] items-center text-left">
          Response:
        </h1>
        <h1 className="w-full flex justify-start text-white items-center">
          {arr[ind].output}
        </h1>
      </div>
    );
  };
  const closeAll = () => {
    setImpCode("en");
    ssdl([false, ""]);
    sdlbe(false);
    setToTranslate(false);
    setimpl("en");
    sla(false);
    sa("");
  };
  const anotherref = useRef();
  useEffect(() => {
    console.log(languagecode);
  }, [languagecode]);
  const detectLanguage = async (receivedvalue) => {
    const url =
      "https://google-translate1.p.rapidapi.com/language/translate/v2/detect";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Key": "6625a2fd44msh7fb777f6e5e5f32p1b33e7jsnf58f85412f51",
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      },
      body: new URLSearchParams({
        q: receivedvalue,
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result.data.detections[0][0].language);

      for (let i = 0; i < languagecode.length; i++) {
        if (
          languagecode[i].language === result.data.detections[0][0].language
        ) {
          console.log(languagecode[i].name);
          ssdl([true, languagecode[i].name]);
          setImpCode(languagecode[i].language);
        }
      }
    } catch (error) {
      console.error(error);
      ssdl([false, ""]);
      dispatch(
        showPopUp({
          color: "#892330",
          bgColor: "#e5c2c2",
          title: "Something went Wrong!",
          description: "Failed to Translate",
          icon: <MdError color="#892330" fontSize="4rem" />,
        })
      );

      // to hide popup

      setTimeout(() => {
        dispatch(hidePopUp());
      }, 5000);
      closeAll();
    } finally {
      sdlbe(false);
    }
  };
  const callTranslateFUn = async (sourceCode, languagecode, text) => {
    const url =
      "https://google-translate1.p.rapidapi.com/language/translate/v2";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Key": "6625a2fd44msh7fb777f6e5e5f32p1b33e7jsnf58f85412f51",
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      },
      body: new URLSearchParams({
        q: text,
        target: languagecode,
        source: sourceCode,
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      console.log(result.data.translations[0].translatedText);
      sla(true);
      sa(result.data.translations[0].translatedText);
      saveHistory(text, result.data.translations[0].translatedText, userId);
    } catch (error) {
      console.error(error);
      sla(false);
      dispatch(
        showPopUp({
          color: "#892330",
          bgColor: "#e5c2c2",
          title: "Something went Wrong!",
          description: "Failed to Translate",
          icon: <MdError color="#892330" fontSize="4rem" />,
        })
      );
      setTimeout(() => {
        dispatch(hidePopUp());
      }, 5000);
      closeAll();
    } finally {
      setToTranslate(false);
    }
  };

  return (
    <>
      <div
        className={`w-screen ${props.showing ? "h-[100vh] overflow-hidden" : "h-auto"} grid grid-cols-1 md:grid-cols-4 place-content-center place-items-start p-2 `}
      >
        <div className="w-[99%] p-2 col-span-1 md:col-span-3 grid grid-cols-1 gap-4 place-content-center place-items-center">
          <Title title="TranslateExpert" setShowHistory={setShowHistory} />
          <BigTextarea
            placeholder="Enter The Sentence To Translate Here.."
            ref={senetenceRef}
          />
          <div className="w-full ">
            <OrangeButton
              onClick={() => {
                sdlbe(true);
                console.log(senetenceRef.current.value);
                if (senetenceRef.current.value.trim() !== "") {
                  detectLanguage(senetenceRef.current.value);
                }
              }}
            >
              {dlbe && <Loader />}
              Click To Detect Language
              <PiDetectiveFill className="text-base" />
            </OrangeButton>
          </div>
          {sdl[0] && (
            <div className="w-full font-lexend text-white grid grid-cols-1 md:grid-cols-4 place-content-center place-items-start">
              <h1 className="w-full col-span-1 md:col-span-3">
                Detected Language
              </h1>
              <h1 className="w-full col-span-1 flex justify-center items-center bg-white py-2 rounded-lg text-[#fc0001]">
                {sdl[1]}
              </h1>
            </div>
          )}
          {sdl[0] && (
            <Conversion
              languagecode={languagecode}
              sdl={sdl}
              setimpl={setimpl}
            />
          )}
          {sdl[0] && (
            <OrangeButton
              onClick={() => {
                console.log(impl);
                setToTranslate(true);
                callTranslateFUn(impCode, impl, senetenceRef.current.value);
              }}
            >
              {toTranslate && <Loader />}
              Translate The Text
            </OrangeButton>
          )}
          {lastArea && (
            <>
              <textarea
                ref={anotherref}
                name="a"
                id="a"
                readOnly={true}
                value={anything}
                className="w-[100%] cursor-not-allowed border-2 outline-none resize-none border-[#ffffff39] h-80 font-lexend text-sm md:text-base text-white bg-black rounded-xl px-2 py-4"
              ></textarea>
              <div className="w-full flex justify-end items-center">
                <Copy text={anything} />
              </div>
            </>
          )}
          <div className="w-full flex flex-col my-4 font-lexend text-sm md:text-base lg:text-lg xl:text-xl justify-center items-center gap-2 bg-[#1E1E1E] rounded-xl">
            <h1 className="w-full text-center flex justify-center text-sm md:text-base lg:text-lg xl:text-xl gap-2 font-extrabold items-center py-2 text-white">
              <TbBulb color="yellow" fontSize="1.5rem" />
              Don’t have idea ? Try these!
            </h1>
            {
              <div className="w-full p-4 rounded-lg bg-[#1E1E1E]  font-normal grid grid-cols-1 lg:grid-cols-2 place-content-center place-items-center gap-2">
                {[
                  ["Hello! Welcome to the world of speech synthesis."],
                  ["वह बच्चों के साथ खेल रहा है"],
                ].map((value, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        senetenceRef.current.value = value;
                        window.scrollTo(0, 0);
                        closeAll();
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

export default Translation;

import classes from "./History.module.css";
import { AiOutlineMessage } from "react-icons/ai";
import { MdHistory } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import Copy from "./Copy.jsx";
import { createPortal } from "react-dom";
import { timeAgo } from "../common-funtions/timeAgo.jsx";
import { useState } from "react";
import Loading from "./Loading.jsx";
const History = ({
  history,
  showHistory,
  setShowHistory,
  height,
  popupHandler,
  popup,
  showPopUp,
  isHistroyLoading,
}) => {
  const [current, setCurrent] = useState(-1);
  const item =
    history.length !== 0 ? (
      history.map((val, ind) => {
        return (
          <div
            className={`${classes["history-item"]}`}
            key={`imagetotext${ind}`}
            onClick={() => {
              setCurrent(ind);
              showPopUp(true);
            }}
          >
            <p>{val.prompt}</p>
            <div className={classes.icons}>
              <div className={classes.timeago}>
                <AiOutlineMessage
                  className={classes.icon}
                  fontSize="1.5rem"
                  color="rgba(255,255,255,0.75)"
                />
                <p className={classes.time}> {timeAgo(val.time)}</p>
              </div>
              <Copy size="small" text={val.prompt} />
            </div>
          </div>
        );
      })
    ) : (
      <div className={classes.empty}>
        {isHistroyLoading ? (
          <Loading size="40px" label="Fetching History" />
        ) : (
          <p>No History Yet</p>
        )}
      </div>
    );
  return (
    <div
      className={`${classes["history-container"]} ${showHistory ? classes.show : classes.hide} font-lexend`}
      style={{ height: height }}
    >
      {popup &&
        createPortal(
          popupHandler(current, history),
          document.getElementById("popup")
        )}
      <div className={classes["history-title"]}>
        <h2 className={classes.histroyHeading}>
          <MdHistory fontSize="1.5rem" />
          Recent
        </h2>
        <IoClose
          fontSize={`2rem`}
          color="#728894"
          onClick={() => setShowHistory(false)}
          className={classes.close}
        />
      </div>
      <div className={classes["history-itemContainer"]}>{item}</div>
    </div>
  );
};

export default History;

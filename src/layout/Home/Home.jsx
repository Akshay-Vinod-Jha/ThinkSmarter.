// import React from "react";
import OrangeButton from "../../UI/OrangeButton";
import WhiteButton from "../../UI/WhiteButton";
import HomeAnimation from "./HomeAnimation";
import classes from "./Home.module.css";
import Reveal from "../../UI/Reveal";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();
  return (
    <div className={classes["home-cantainer"]}>
      <HomeAnimation />
      <Reveal>
        <h1 className={classes.heading}>
          {["Your", "One-Stop", "Shop", "for"].map((val, ind) => {
            return (
              <span key={`span${ind}`} className={classes.span}>
                {val}
              </span>
            );
          })}
          <br className={classes.br} />
          {["AI", "Tools", "and", "Solutions"].map((val, ind) => {
            return (
              <span className={classes.span} key={`spann${ind}`}>
                {val}
              </span>
            );
          })}
        </h1>
        <div className={classes.homeBtns}>
          <div className="w-full relative flex justify-center items-center">
            <div className="w-[100%] md:w-[50%]">
              <OrangeButton
                onClick={() => {
                  navigate("/AllToolsMainPage");
                }}
              >
                Explore Tools
              </OrangeButton>
            </div>
          </div>
          {/* <WhiteButton>Know More</WhiteButton> */}
        </div>
      </Reveal>
    </div>
  );
};

export default Home;

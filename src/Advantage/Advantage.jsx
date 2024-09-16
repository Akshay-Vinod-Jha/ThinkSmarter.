import React, { useEffect } from "react";
import { GiThink } from "react-icons/gi";
import OrangeButton from "../UI/OrangeButton";
import { FaBackward } from "react-icons/fa";
import { FaForward } from "react-icons/fa";
import AdvantageText from "./AdvantageText";
import Steps from "./Steps";
import { useNavigate } from "react-router-dom";
function Advantage(props) {
  const navigate = useNavigate();
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className="w-full flex flex-col justify-center items-center p-6 md:p-6 font-lexend">
      <div className="w-40 md:w-50 hover:scale-110 duration-150 lg:w-60 aspect-square overflow-hidden rounded-xl">
        <img
          src={props.information.imageUrl}
          alt=""
          className="w-40 md:w-50  lg:w-60 aspect-square object-cover rounded-xl "
        />
      </div>
      <h1 className="tracking-widest font-normal text-white mt-4 uppercase text-base md:text-lg lg:text-xl xl:text-xl border-b-2 border-[#728894]">
        {props.information.name}
      </h1>
      <div className="w-full border-2 border-[#72889426] hover:border-[#728894] duration-150 rounded-xl py-4 pl-3 md:pl-6 mt-8">
        <h1 className=" text-[white] text-base md:text-lg lg:text-xl xl:text-xl flex justify-start group/hii   items-start">
          Why Choose Our Expertise ?
          <GiThink className="ml-2 group-hover/hii:text-yellow-500"></GiThink>
        </h1>
        <h1 className=" mt-4   text-[#728894] text-base md:text-lg lg:text-xl xl:text-xl">
          {props.information.slogan}
        </h1>
      </div>
      <AdvantageText advantages={props.information.advantages}></AdvantageText>
      <Steps arrayOfSteps={props.information.steps}></Steps>
      <h1 className="mt-8 text-[white]  w-full justify-center items-center text-center font-lexend font-normal text-base md:text-lg lg:text-xl xl:text-xl">
        The historical records are presented on the right side;
      </h1>
      <h1 className=" text-[white] text-center mb-4 w-full justify-center items-center font-lexend font-normal text-base md:text-lg lg:text-xl xl:text-xl">
        you can also copy them for repeated utilization.
      </h1>
      <div className="w-screen h-auto flex  flex-col-reverse  md:flex-row justify-center items-center px-6 md:px-6 gap-4 my-4">
        <div className="w-full md:col-span-1 md:w-[50%] lg:w-[25%]">
          <OrangeButton onClick={props.updateState}>
            <FaBackward className="mr-2"></FaBackward>Go Back
          </OrangeButton>
        </div>
        <div className="w-full md:col-span-1 md:w-[50%] lg:w-[25%]">
          <OrangeButton
            onClick={() => {
              if (props.userId) {
                navigate(
                  `/AllToolsMainPage/${props.information.name.split(" ").join("").toUpperCase()}`,
                  { state: { userId: props.userId } }
                );
              } else {
                navigate("/SignIN");
              }
            }}
          >
            Start<FaForward className="ml-2"></FaForward>
          </OrangeButton>
        </div>
      </div>
    </div>
  );
}

export default Advantage;

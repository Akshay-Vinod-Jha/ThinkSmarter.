import { useEffect, useState } from "react";
import cssclasses from "./AllToolsMainPage.module.css";
import Advantage from "../../Advantage/Advantage";
import AllParent from "../../UI/AllParent";

import Bottom from "../../UI/Bottom";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase.config";
import OrangeButton from "../../UI/OrangeButton";
import { signOut } from "firebase/auth";
function AllToolsMainPage(props) {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const navigate = useNavigate();
  const signOutHandler = async () => {
    await signOut(auth);
    navigate("/");
  };

  const location = useLocation();
  const userId =
    location.state !== null
      ? location.state.userId
      : auth.currentUser !== null
        ? auth.currentUser.uid
        : null;

  const [state, setState] = useState(false);
  const [clicked, updateOnClicked] = useState({});
  const updateState = () => {
    setState((previousState) => {
      return !previousState;
    });
  };
  const updateClicked = (passedObj) => {
    updateOnClicked({ ...passedObj });
  };
  return (
    <>
      {userId && (
        <div className="w-full bg-black p-2 h-auto flex justify-end items-center">
          <div className="w-max">
            <OrangeButton onClick={signOutHandler}>Sign out</OrangeButton>
          </div>
        </div>
      )}
      {!state && (
        <div
          className={
            cssclasses.mainContainer +
            " p-2 flex flex-col justify-center gap-6 items-center font-lexend"
          }
        >
          <h1 className="w-full md:w-[50%] lg:w-[50%] mt-4 font-semibold tracking-widest text-white text-center text-xl md:text-2xl lg:text-3xl">
            "Welcome to the
            <span className="text-[#fc0001] scale-150">
              {" "}
              AI Integration Hub
            </span>
            : Your Gateway to Integrated Intelligence"
          </h1>
          <AllParent
            updateState={updateState}
            updateClicked={updateClicked}
          ></AllParent>
        </div>
      )}
      {state && (
        <Advantage
          userId={userId}
          information={clicked}
          updateState={updateState}
        />
      )}
      <div className="w-full bg-black">
        <div className="w-[92%] md:w-full mx-auto">
          <Bottom
            label="Go To Home"
            navigateTo="/"
            onClick={() => {
              props.updateSignOut(true);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default AllToolsMainPage;

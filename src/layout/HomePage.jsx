import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home/Home";
import SliderCantainer from "./slider/SliderCantainer";
import ImportantError from "../UI/ImportantError";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
// import React, { useEffect } from "react";
const HomePage = (props) => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full">
        <Header />
        <Home />
        <SliderCantainer />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;

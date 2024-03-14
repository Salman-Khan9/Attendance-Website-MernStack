import React from 'react'
import  ReactDOM  from 'react-dom'
import { IoSchool } from "react-icons/io5";

const Loader = () => {
    return ReactDOM.createPortal(
        <div className="wrapper">
          <div className="loader">
            <img src={<IoSchool/>} alt="Loading..." />
          </div>
        </div>,
        document.getElementById("loader")
      );
    };
    
    export const SpinnerImg = () => {
      return (
        <div className="--center-all">
          <img src={<IoSchool/>} alt="Loading..." />
        </div>
      );
    };

export default Loader
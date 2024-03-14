import React from 'react'
import  ReactDOM  from 'react-dom'
import "../Loader/loader.css"
import loader from "../images/loader.gif"

const Loader = () => {
    return ReactDOM.createPortal(
        <div className="wrapper">
          <div className="loader">
            <img src={loader} style={{mixBlendMode:"multiply"}} alt="Loading..." />
          </div>
        </div>,
        document.getElementById("loader")
      );
    };
    
    export const SpinnerImg = () => {
      return (
        <div className="--center-all">
          <img src={loader} style={{mixBlendMode:"multiply"}} alt="Loading..." />
        </div>
      );
    };

export default Loader
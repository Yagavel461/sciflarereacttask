import React from "react";
import "../SpinnerLoader/SpinnerStyle.css"

export const Spinner = () => {
  return (
    <>
    <div className="d-flex align-items-center justify-content-center" style={{marginTop:"40px"}}>
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      </div>
    </>
  );
};

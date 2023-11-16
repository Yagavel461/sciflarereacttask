// import PropTypes from 'prop-types'
import React from "react"
import { imagePath } from "../ui/ImagePath"
import { Link, useNavigate } from "react-router-dom"

export const StatusError = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-2);
      };
    return (
        <>
            <div className="sky-img">
                <div className="errorPage">
                    <div style={{ textAlign: "center", fontSize: "30px" }}>Oops! not found!</div>
                    <div className="container d-flex justify-content-center pt-3">
                        <img className="errorpage-img" src={imagePath("./404.svg")} alt="" />
                    </div>
                    <div className="pb-4" style={{ textAlign: "center" }}><button className="btn btn-primary  "  >
                        <span className="text-white" to={"/home"} onClick={goBack}>
                            Back To Previous Page <i className="bx bx-chevron-right font-size-18 d-inline-block align-middle bx-fade-right"/>
                        </span>
                    </button></div>
                </div>
            </div>
        </>
    )
}

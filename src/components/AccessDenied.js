// import PropTypes from 'prop-types'
import React from "react"
import { imagePath } from "../ui/ImagePath"

export const AccessRestricted = () => {
    return (
        <>
            <div className="text-center">
                <img src={imagePath("./Restriction.svg")} alt="" />
                <div
                    className="text-primary"
                    style={{ fontSize: "25px", fontWeight: "500" }}
                >
                    Access Restricted
                </div>
                <div className="my-3 font-size-17">
                    We Are Sorry , But You Don't Have The Access To This Page{" "}
                </div>
            </div>
        </>
    )
}

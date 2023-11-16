import React from "react";
const FormWizard = ({ merchantSlide, storeSlide, vpaSlide }) => {
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="form-wizard-steps ">
                        <div className="steps mt-3">
                            <ul>
                                <li className={merchantSlide}>
                                    <span className="bi bi-person-plus-fill font-size-16"></span> Add Merchant
                                </li>
                                <li className={storeSlide}>
                                    <span className="bi bi-shop font-size-16"></span> Add Store
                                </li>
                                <li className={vpaSlide}>
                                    <span className="bi bi-bank2 font-size-16"></span> Add VPA
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default FormWizard;
import { useEffect, useState } from "react";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Routes from "./Routes/Router";
import { ToastContainer } from "react-toastify";
import lockimg from "./assets/images/lock.svg"
import {getApiCall, setCookie, reloadWindow, updateCookie} from "./helpers/utils";
import Lottie from "lottie-react";
import LockedLottie from "./assets/LottieFiles/LockedLottie.json"


const App = () => {
    const unlock = () => {
        getApiCall("store-admin/auth/generate-token", (response) => {
            if (response.success) {
                // setCookie("StoreCsrfToken", response.data.csrfToken);
                updateCookie("StoreCsrfToken", response.data.csrfToken)
                //toast.error("Something went wrong.Please try again")
                setTimeout(() => {
                    document.getElementById("checkLockStatus").classList.remove("checkLockStatus")
                    //reloadWindow();
                }, 500);
            }
        })
    }
  return (
    <>
     <div id="checkLockStatus" className="lock-screen-blur">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes />
      </div>
    <div className="lock-screen">
        <div className="ip-lock-wrapper">
            <div className="ip-lock-content">
                {/* <img className="ip-lock-head" src={lockimg}/> */}
                <Lottie className='popupicon ip-lock-head' animationData={LockedLottie}/>
                <div className="ip-lock-head mt-0">Dashboard Locked</div>
                <div className="ip-lock-desc">Your Panel Have Been Locked Due To Security Threat.</div>
                <span  onClick={unlock} className="btn btn-primary lock-btn">Unlock it!</span>
            </div>
        </div>
    </div>
    </>
  );
};
export default App;

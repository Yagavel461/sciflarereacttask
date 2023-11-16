import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/scss/theme.scss";
import "./assets/style.css";
import "react-toastify/dist/ReactToastify.css";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { BrowserRouter, Link, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ErrorBoundary } from "react-error-boundary";
import { imagePath } from "./ui/ImagePath";
if (process.env.REACT_APP_NODE_ENV=== "production")
  console.log = () => {};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.Fragment>
      <BrowserRouter>
        <ErrorBoundary
          // fallbackRender={fallbackRender}
          fallback={
            <>
              <div className="sky-img">
                <div className="errorPage">
                  <div className="container d-flex justify-content-center p-3">
                    <img className="errorpage-img" src={imagePath("./balloon.svg")} alt="" />
                  </div>
                  <div style={{ textAlign: "center", fontSize: "28px" }}>Greetings, fellow admins!</div>
                  <div style={{ textAlign: "center", fontSize: "28px" }}>It seems our page is experiencing technical hiccups</div>
                  <div className="pb-4" style={{ textAlign: "center" }}><button className="btn btn-primary mt-2 "  >
                    <Link className="text-white" to={"/home"} onClick={() => window.reload()}>
                      Back To Homepage <i className="bx bx-chevron-right font-size-18 d-inline-block align-middle bx-fade-right" />
                    </Link>
                  </button></div>
                </div>
              </div>
            </>
          }
        >

          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </React.Fragment>
  </Provider>
);

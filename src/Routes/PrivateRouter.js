import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PageRoutes from "./PageRoutes";
import Header from "../components/Header";
let leftSideBarType = "default";
function PrivateRouter() {
  const dispatch = useDispatch();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const updateState = (actionType, value) => dispatch => {
      dispatch({type : actionType, payload : value});
      return Promise.resolve();
  };
  const {layout} = useSelector((state)=>state);
  const location = useLocation();
  useEffect(() => {
    changeBodyAttribute("data-sidebar", layout.leftSideBarTheme);
    changeBodyAttribute("data-topbar", layout.topbarTheme);
    changeBodyAttribute("data-layout-mode", layout.layoutModeType);


    document.onclick = args => {
      if (
        !args.target.closest(
          ".vertical-menu li a.has-arrow, #vertical-menu-btn"
        )
      ) {
        document.getElementsByTagName("body")[0].classList.remove("sidebar-enable");
      }
    };
  },[]);
  const changeBodyAttribute = (attribute, value) => {
    if (document.body) document.body.setAttribute(attribute, value);
    return true
  }
  const toggleMenuCallback = () => {
      if (leftSideBarType === "default") {
          dispatch(updateState("leftSidebar",{"condensed":isMobile}));
      } else if (leftSideBarType === "condensed") {
          dispatch(updateState("leftSidebar",{"default":isMobile}));
      }
  };

  return (
    <>
        <Header show={location.pathname.split('/')[1] == 'error' ? 'hide' : 'show'} toggleMenuCallback={toggleMenuCallback} />
        <Sidebar show={location.pathname.split('/')[1] == 'error' ? 'hide' : 'show'} theme={"dark"} type={"default"} isMobile={isMobile} />
        <PageRoutes show={location.pathname.split('/')[1] == 'error' ? 'hide' : 'show'}/>
    </>
  );
}

export default PrivateRouter;

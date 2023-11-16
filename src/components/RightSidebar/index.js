import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";
import { Link } from "react-router-dom";
import { ActionTypes } from "../../redux/constants/actionTypes";
import { layoutModeTypes, topBarThemeTypes, leftSideBarThemeTypes } from "../../redux/constants/layouts";
const RightSidebar = () => {
  const { layout, showRight } = useSelector((state) => state);
  const dispatch = useDispatch();
  const updateState = (actionType, value) => () => {
    dispatch({ type: actionType, payload: value });
    return Promise.resolve();
  }
  useEffect(() => {
    changeBodyAttribute("data-layout", layout.layoutType);
  }, [layout.layoutType]);

  useEffect(() => {
    changeBodyAttribute("data-layout-mode", layout.layoutModeType);
  }, [layout.layoutModeType]);

  useEffect(() => {
    changeBodyAttribute("data-topbar", layout.topbarTheme)
  }, [layout.topbarTheme]);

  useEffect(() => {
    changeBodyAttribute("data-sidebar", layout.leftSideBarTheme);
  }, [layout.leftSideBarTheme]);

  const showRightSidebarAction = () => {
    dispatch(updateState(ActionTypes.SHOW_RIGHT_SIDEBAR, { showRightSidebar: !showRight.showRightSidebar }))
  }
  const layoutModeTypeFn = (e) => {
    if (e.target.checked) {
      dispatch(updateState(ActionTypes.LAYOUT_OPTIONS, { layoutModeType: e.target.value }));
    }
  }
  const topbarThemeFn = (e) => {
    if (e.target.checked) {
      dispatch(updateState(ActionTypes.LAYOUT_OPTIONS, { topbarTheme: e.target.value }));
    }
  }
  const leftSideBarThemeFn = (e) => {
    if (e.target.checked) {
      dispatch(updateState(ActionTypes.LAYOUT_OPTIONS, { leftSideBarTheme: e.target.value }));
    }
  }
  const changeBodyAttribute = (attribute, value) => {
    if (document.body) document.body.setAttribute(attribute, value);
    return true
  }
  return (
    <React.Fragment>
      <div className="right-bar" id="right-bar">
        <SimpleBar style={{ height: "900px" }}>
          <div data-simplebar className="h-100">
            <div className="rightbar-title px-3 py-4">
              <Link
                to="#"
                onClick={e => {
                  e.preventDefault()
                  showRightSidebarAction()
                }}
                className="right-bar-toggle float-end"
              >
                <i className=" fas fa-times" />
              </Link>
              <h5 className="m-0">Settings</h5>
            </div>
            <hr className="my-0" />
            <div className="p-4">
              {/* <div className="radio-toolbar">
              <span className="mb-2 d-block">Layouts Mode</span>
              <input
                type="radio"
                id="radioLight"
                name="radioLight"
                value={layoutModeTypes.LIGHT}
                checked={layout.layoutModeType === layoutModeTypes.LIGHT}
                onChange={layoutModeTypeFn}
              />
              <label className="me-1" htmlFor="radioLight">Light</label>
              <input
                type="radio"
                id="radioDark"
                name="radioDark"
                value={layoutModeTypes.DARK}
                checked={layout.layoutModeType === layoutModeTypes.DARK}
                onChange={layoutModeTypeFn}
              />
              <label htmlFor="radioDark">Dark</label>
            </div> */}
              {/* <hr className="mt-1" /> */}
              <div className="radio-toolbar">
                <span className="mb-2 d-block" id="radio-title">
                  Topbar Theme
                </span>
                <input
                  type="radio"
                  id="radioThemeLight"
                  name="radioTheme"
                  value={topBarThemeTypes.LIGHT}
                  checked={layout.topbarTheme === topBarThemeTypes.LIGHT}
                  onChange={topbarThemeFn}
                />
                <label className="me-1" htmlFor="radioThemeLight">Light</label>
                <input
                  type="radio"
                  id="radioThemeDark"
                  name="radioTheme"
                  value={topBarThemeTypes.DARK}
                  checked={layout.topbarTheme === topBarThemeTypes.DARK}
                  onChange={topbarThemeFn}
                />
                <label className="me-1" htmlFor="radioThemeDark">Dark</label>
                {/* {layout.layoutType === "vertical" ? null : (
                <>
                  <input
                    type="radio"
                    id="radioThemeColored"
                    name="radioTheme"
                    value={topBarThemeTypes.COLORED}
                    checked={layout.topbarTheme === topBarThemeTypes.COLORED}
                    onChange={topbarThemeFn}
                  />
                  <label className="me-1" htmlFor="radioThemeColored">Colored</label>{" "}
                </>
              )} */}
              </div>
              <hr className="mt-1" />
              <div className="radio-toolbar coloropt-radio">
                <span className="mb-2 d-block" id="radio-title">
                  Left Sidebar Color Options
                </span>
                <Row>
                  <Col>
                    <input
                      type="radio"
                      id="leftsidebarThemedark"
                      name="leftsidebarTheme"
                      value={leftSideBarThemeTypes.DARK}
                      checked={layout.leftSideBarTheme === leftSideBarThemeTypes.DARK}
                      onChange={leftSideBarThemeFn}
                    />
                    <label
                      htmlFor="leftsidebarThemedark"
                      className={layout.layoutModeType === "light" ? "bg-dark rounded-circle wh-30 me-1" : "bg-light rounded-circle wh-30 me-1"}
                    ></label>

                    <input
                      type="radio"
                      id="leftsidebarThemecolored"
                      name="leftsidebarTheme"
                      value={leftSideBarThemeTypes.COLORED}
                      checked={layout.leftSideBarTheme === leftSideBarThemeTypes.COLORED}
                      onChange={leftSideBarThemeFn}
                    />
                    <label
                      htmlFor="leftsidebarThemecolored"
                      className="bg-colored rounded-circle wh-30 me-1"
                    ></label>
                    <input
                      type="radio"
                      id="leftsidebarThemewinter"
                      name="leftsidebarTheme"
                      value={leftSideBarThemeTypes.WINTER}
                      checked={layout.leftSideBarTheme === leftSideBarThemeTypes.WINTER}
                      onChange={leftSideBarThemeFn}
                    />
                    <label
                      htmlFor="leftsidebarThemewinter"
                      className="gradient-winter rounded-circle wh-30 me-1"
                    ></label>

                    <input
                      type="radio"
                      id="leftsidebarThemeladylip"
                      name="leftsidebarTheme"
                      value={leftSideBarThemeTypes.LADYLIP}
                      checked={layout.leftSideBarTheme === leftSideBarThemeTypes.LADYLIP}
                      onChange={leftSideBarThemeFn}
                    />
                    <label
                      htmlFor="leftsidebarThemeladylip"
                      className="gradient-lady-lip rounded-circle wh-30 me-1"
                    ></label>

                    <input
                      type="radio"
                      id="leftsidebarThemeplumplate"
                      name="leftsidebarTheme"
                      value={leftSideBarThemeTypes.PLUMPLATE}
                      checked={layout.leftSideBarTheme === leftSideBarThemeTypes.PLUMPLATE}
                      onChange={leftSideBarThemeFn}
                    />
                    <label
                      htmlFor="leftsidebarThemeplumplate"
                      className="gradient-plum-plate rounded-circle wh-30 me-1"
                    ></label>

                  </Col>
                </Row>
                <Row>
                  <Col>
                    {/* <input
                    type="radio"
                    id="leftsidebarThemelight"
                    name="leftsidebarTheme"
                    value={leftSideBarThemeTypes.LIGHT}
                    checked={layout.leftSideBarTheme === leftSideBarThemeTypes.LIGHT}
                    onChange={leftSideBarThemeFn}
                  />
                  <label
                    htmlFor="leftsidebarThemelight"
                    className={layout.layoutModeType === "dark" ? "bg-dark rounded-circle wh-30 me-1" : "bg-light rounded-circle wh-30 me-1"}
                  ></label> */}


                    <input
                      type="radio"
                      id="leftsidebarThemestrongbliss"
                      name="leftsidebarTheme"
                      value={leftSideBarThemeTypes.STRONGBLISS}
                      checked={layout.leftSideBarTheme === leftSideBarThemeTypes.STRONGBLISS}
                      onChange={leftSideBarThemeFn}
                    />
                    <label
                      htmlFor="leftsidebarThemestrongbliss"
                      className="gradient-strong-bliss rounded-circle wh-30 me-1"
                    ></label>
                    <input
                      type="radio"
                      id="leftsidebarThemesgreatwhale"
                      name="leftsidebarTheme"
                      value={leftSideBarThemeTypes.GREATWHALE}
                      checked={layout.leftSideBarTheme === leftSideBarThemeTypes.GREATWHALE}
                      onChange={leftSideBarThemeFn}
                    />
                    <label
                      htmlFor="leftsidebarThemesgreatwhale"
                      className="gradient-strong-great-whale rounded-circle wh-30 me-1"
                    ></label>


                    <input
                      type="radio"
                      id="leftsidebarThemebrokenBulbPink"
                      name="leftsidebarTheme"
                      value={leftSideBarThemeTypes.BROKENBULBPINK}
                      checked={layout.leftSideBarTheme === leftSideBarThemeTypes.BROKENBULBPINK}
                      onChange={leftSideBarThemeFn}
                    />
                    <label
                      htmlFor="leftsidebarThemebrokenBulbPink"
                      className="gradient-brokenBulbPink rounded-circle wh-30 me-1"
                    ></label>
                    
                  </Col>
                </Row>

              </div>
            </div>
          </div>
        </SimpleBar>
      </div>
      <div className="rightbar-overlay"></div>
    </React.Fragment>
  );
};
export default RightSidebar;
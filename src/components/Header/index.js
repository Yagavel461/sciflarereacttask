import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import logo from '../../assets/images/logo.svg';
import { imagePath } from '../../ui/ImagePath';
import { toast } from 'react-toastify';
import { ActionTypes } from '../../redux/constants/actionTypes';
import RightSidebar from '../RightSidebar';
import { useDispatch, useSelector } from 'react-redux';
import {
  textCapitalize,
  storageRemoveAll,
  reloadWindowToPath,
  removeCookie,
} from '../../helpers/utils';
import DateAndTime from './date&time';

const Header = (props) => {
  //USE SELECTOR TO FETCH DATA FROM REDUX STORE
  const { ProfileDetails } = useSelector((state) => state);
  const admindetails = ProfileDetails?.ProfileInfo;

  let location = useLocation();
  let path = location?.pathname?.replace(/^\/([^\/]*).*$/, '$1');
  const { showRight } = useSelector((state) => state);

  const dispatch = useDispatch();
  const updateState = (actionType, value) => () => {
    dispatch({ type: actionType, payload: value });
    return Promise.resolve();
  };

  const [menu, setMenu] = useState(false);
  function tToggle() {
    let body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle('sidebar-enable');
    } else {
      body.classList.toggle('vertical-collpsed');
      body.classList.toggle('sidebar-enable');
    }
  }
  useEffect(() => {}, [showRight.showRightSidebar]);

  const showRightSidebarAction = () => {
    manageBodyClass('right-bar-enabled', 'add');
    dispatch(
      updateState(ActionTypes.SHOW_RIGHT_SIDEBAR, {
        showRightSidebar: !showRight.showRightSidebar,
      })
    );
  };
  const manageBodyClass = (cssClass, action = 'toggle') => {
    switch (action) {
      case 'add':
        if (document.body) document.body.classList.add(cssClass);
        break;
      case 'remove':
        if (document.body) document.body.classList.remove(cssClass);
        break;
      default:
        if (document.body) document.body.classList.toggle(cssClass);
        break;
    }
    return true;
  };
  const handlelogout = () => {
    dispatch(updateState(ActionTypes.USER_LOGOUT, {}));
    toast.success('Logout Success');
    removeCookie('IppoStoreAdminToken');
    removeCookie('StoreCsrfToken');
    storageRemoveAll();
    reloadWindowToPath('/signin');
  };

  return (
    <React.Fragment>
      {props.show === 'show' && (
        <header id="page-topbar" >
          <div className="navbar-header">
            <div className="d-flex align-items-center">
              <div className="navbar-brand-box d-lg-none d-md-block">
                <div className="logo logo-dark">
                  <span className="logo-sm">
                    <img src={logo} alt="" height="22" />
                  </span>
                </div>
                <div className="logo logo-light">
                  <span className="logo-sm">
                    <img
                      src={imagePath('./logo-light.svg')}
                      alt=""
                      height="22"
                      className="img-filter-icon"
                    />
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  tToggle();
                }}
                className="btn btn-sm px-3 font-size-16 header-item "
                id="vertical-menu-btn"
              >
                <i className="fa fa-fw fa-bars" />
              </button>
              <div className="header_text">
                {path === 'merchant'
                  ? 'Merchants'
                  : path === 'merchantbank'
                  ? 'Merchant Bank'
                  : path === 'subuser'
                  ? 'Sub Users'
                  : path === 'pos-category'
                  ? 'Pos Category'
                  : path === 'pos-product'
                  ? 'Pos Products'
                  : path === 'pos-request'
                  ? 'Pos Request'
                  : path === 'soundbox-plans'
                  ? 'Soundbox Plans'
                  : path === 'soundbox'
                  ? 'Soundbox'
                  : path === 'dispute-detail'
                  ? 'Dispute Detail'
                  : path === 'loans/detail'
                  ? 'Loan Details'
                  : path === 'loan-transaction-detail'
                  ? 'Loan EMI Transaction Details '
                  : path === 'soundbox-upi-mandate'
                  ? 'Soundbox UPI Mandate'
                  : path === 'pos-upi-mandate'
                  ? 'POS UPI Mandate'
                  : path === 'loan-collection'
                  ? 'Loan Collection'
                  : path === 'soundbox-requests'
                  ? 'SoundBox Requests'
                  : path === 'soundbox-requests/detail'
                  ? 'SoundBox Requests Details'
                  : path === 'upi-transactions'
                  ? 'UPI Reconciliation Transactions'
                  : path === 'upisettlements'
                  ? 'UPI Settlements'
                  : textCapitalize(path)}
              </div>
            </div>
            <div className="d-flex align-items-center">
              {/* DATE AND TIME COMPONENT */}
              <DateAndTime />
              {/* USER PROFILE NAME AND MENU PART */}
              <Dropdown
                isOpen={menu}
                toggle={() => setMenu(!menu)}
                className="d-inline-block"
              >
                <DropdownToggle
                  className="btn header-item"
                  id="page-header-user-dropdown"
                  tag="button"
                  data-toggle="dropdown"
                >
                  <span className="pointer-events-none d-flex align-items-center">
                    {/* <img
                    className="rounded-circle header-profile-user"
                    src={user1}
                    alt="Header Avatar"
                  /> */}
                    <i className="bi bi-person-circle d-block  font-size-20" />
                    <span className="d-none d-md-inline-block ms-2 me-1  font-size-16">
                      {textCapitalize(
                        admindetails?.name?.full
                          ? admindetails?.name?.full
                          : 'Hi Admin'
                      )}
                    </span>
                    <i className="mdi mdi-chevron-down d-none d-xl-inline-block font-size-20 " />
                  </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <span style={{ cursor: 'pointer' }} className="dropdown-item">
                    {' '}
                    <i className="bx bx-user font-size-16 align-middle me-1" />
                    Profile
                  </span>
                  <span style={{ cursor: 'pointer' }} className="dropdown-item">
                    {/* <span className="badge bg-success float-end">11</span> */}
                    <i className="bx bx-wrench font-size-16 align-middle me-1" />
                    Settings
                  </span>
                  <div className="dropdown-divider" />
                  <span
                    style={{ cursor: 'pointer' }}
                    className="dropdown-item"
                    onClick={handlelogout}
                  >
                    <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
                    <span>Logout</span>
                  </span>
                </DropdownMenu>
              </Dropdown>
              {/* RIGHT GEAR ICON FOR SETTING */}
              <div
                onClick={showRightSidebarAction}
                className="dropdown d-inline-block"
              >
                <button
                  type="button"
                  className="btn header-item noti-icon right-bar-toggle "
                >
                  <i className="bx bx-cog bx-spin align-middle" />
                </button>
              </div>
            </div>
          </div>
        </header>
      )}
      {showRight.showRightSidebar ? <RightSidebar /> : null}
    </React.Fragment>
  );
};
export default Header;

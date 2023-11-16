import PropTypes from 'prop-types';
import React from 'react';
import SidebarContent from '../Sidebar/SidebarContent';
import { Link } from 'react-router-dom';
import { imagePath } from '../../ui/ImagePath';

const Sidebar = (props) => {
  return (
    <React.Fragment>
      {props.show == 'show' && (
        <div className="vertical-menu">
          <div className="navbar-brand-box">
            <div className="logo logo-dark">
              <span className="logo-sm">
                <img src={imagePath('./logo-light.svg')} alt="" height="22" />
              </span>
              <span className="logo-lg">
                <img src={imagePath('./IppoStore.svg')} alt="" height="44" />
              </span>
            </div>
            <div className="logo logo-light">
              <span className="logo-sm">
                <img src={imagePath('./logo-light.svg')} alt="" height="22" />
              </span>
              <span className="logo-lg">
                <img src={imagePath('./IppoStore.svg')} alt="" height="44" />
              </span>
            </div>
          </div>
          <div data-simplebar className="h-100">
            <SidebarContent />
          </div>
          <div className="sidebar-background"></div>
        </div>
      )}
    </React.Fragment>
  );
};
export default Sidebar;

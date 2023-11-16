import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap"
const VpaWizard = ({ bankTab, vpaTab, subuserTab, bankTabClick, vpaTabClick, subuserTabClick }) => {
    return (
        <>
            <Nav tabs className="nav-tabs-custom nav-justified col-lg-6 col-12 mb-3" >
                <NavItem>
                    <NavLink  className={bankTab} onClick={bankTabClick} style={{pointerEvents:"none"}}>
                        <span className="d-block d-sm-none font-size-13">Add Bank</span>
                        <span className="d-none d-sm-block font-size-14">ADD BANK</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={vpaTab} onClick={vpaTabClick} style={{pointerEvents:"none"}}>
                        <span className="d-block d-sm-none font-size-13">Add Vpa</span>
                        <span className="d-none d-sm-block font-size-14">ADD VPA</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={subuserTab} onClick={subuserTabClick} style={{pointerEvents:"none"}}>
                        <span className="d-block d-sm-none font-size-13">Add Subuser</span>
                        <span className="d-none d-sm-block font-size-14">ADD SUBUSER</span>
                    </NavLink>
                </NavItem>
            </Nav>
        </>
    );
};
export default VpaWizard;
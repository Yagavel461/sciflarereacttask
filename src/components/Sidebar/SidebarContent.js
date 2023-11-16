import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import SimpleBar from 'simplebar-react';
import MetisMenu from 'metismenujs';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getApiCall } from '../../helpers/utils';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const SidebarContent = () => {
  const [loading, set_loader] = useState(false);
  const insuranceApicall = () => {
    set_loader(true);
    getApiCall(`store-admin/insurance/create`, (response) => {
      console.log(response);
      if (response.success) {
        window.open(response?.data?.redirectionUrl);
        set_loader(false);
      } else {
        toast.error(response.message);
        set_loader(false);
      }
    });
  };
  //USE SELECTOR TO FETCH DATA FROM REDUX STORE
  const { Acl } = useSelector((state) => state);
  const WhitelistedRoutes = Acl?.getWhitelistedRoutes || [];

  const sidebarMenu = [
    {
      title: 'Home',
      icon: 'bx bx-home-circle',
      path: '/home',
    },
    {
      title: 'Business',
      icon: 'bx bx-briefcase-alt',
      path: '/#',
      childrens: [
        WhitelistedRoutes?.merchants?.is_enabled
          ? {
              title: 'Merchants',
              icon: 'bx bxs-store-alt',
              path: '/merchant',
            }
          : false,
        WhitelistedRoutes?.store?.route_list?.list?.is_enabled
          ? {
              title: 'Stores',
              icon: 'bx bx-store',
              path: '/store',
            }
          : false,
        WhitelistedRoutes?.subUsers?.route_list?.list?.is_enabled
          ? {
              title: "Sub Users",
              icon: "fa-solid fa-users",
              path: "/subuser",
            }
          : false,
        WhitelistedRoutes?.Submerchants?.route_list?.list?.is_enabled
          ? {
              title: "Sub Merchants",
              icon: "fa-solid fa-users",
              path: "/submerchant",
            }
          : false,
        // WhitelistedRoutes?.vpa?.is_enabled
        //   ? {
        //       title: "VPA",
        //       icon: "fa-solid fa-money-bill-transfer",
        //       path: "/vpa",
        //     }
        //   : false,
        // WhitelistedRoutes?.bank?.is_enabled
        //   ? {
        //       title: "Merchant Bank list",
        //       icon: "bx bxs-bank",
        //       path: "/merchantbank",
        //     }
        //   : false,
      ],
    },
    {
      title: 'POS',
      icon: 'bi bi-file-spreadsheet',
      path: '/#',
      childrens: [
        // WhitelistedRoutes?.category?.is_enabled ? {
        //   title: "Categories",
        //   icon: "bx bxs-store-alt",
        //   path: "/pos-category",
        // }:false,
        WhitelistedRoutes?.product?.route_list?.list?.is_enabled
          ? {
              title: 'Products',
              icon: 'bx bx-store',
              path: '/pos-product',
            }
          : false,
        WhitelistedRoutes?.pos_request?.route_list?.list?.is_enabled
          ? {
              title: 'Pos Request',
              icon: 'bx bx-store',
              path: '/pos-request',
            }
          : false,
          WhitelistedRoutes?.pos_request?.route_list?.pos_upi_mandate_list?.is_enabled
          ?
          {
            title: "UPI Mandate",
            icon: "bx bx-box",
            path: "/pos-upi-mandate",
          }
          : false,
      ],
    },
    WhitelistedRoutes?.Transaction?.is_enabled
    ? {
        title: 'Transactions',
        icon: 'bx bx-transfer',
        path: '/transaction',
      }
    : false,
    {
      title: 'Loans',
      icon: 'bi bi-cash-coin',
      path: '/#',
      childrens: [
        WhitelistedRoutes?.loan?.route_list?.list?.is_enabled
          ? {
              title: 'Loan List',
              icon: 'bi bi-list',
              path: '/loans',
            }
          : false,
        WhitelistedRoutes?.loan?.route_list?.loan_collection?.is_enabled
          ? {
              title: 'Loan Collection',
              icon: 'bi bi-management',
              path: '/loan-collection',
            }
          : false,
          WhitelistedRoutes?.loan?.route_list?.loan_settlement_list?.is_enabled
          ? {
              title: 'Loan Settlements',
              icon: 'bi bi-management',
              path: '/settlements',
            }
          : false,
      ],
    },

    {
      title: 'UPI',
      icon: 'bx bxs-bank',
      path: '/#',
      childrens: [
        
        WhitelistedRoutes?.pos_request?.is_enabled
          ? {
              title: 'Settlements',
              icon: 'bx bx-store',
              path: '/upisettlements',
            }
          : false,
      ],
    },
    // {
    //   title: "Payments",
    //   icon: "bx bx-transfer",
    //   path: "/#",
    //   childrens: [
    //     {
    //       title: "Transactions",
    //       icon: "bx bx-money-withdraw",
    //       path: "/transaction",
    //     },
    //     {
    //       title: "UPI",
    //       icon: "bx bx-money-withdraw",
    //       path: "/upitransaction",
    //     },
    //     {
    //       title: "Paylink",
    //       icon: "bx bx-link",
    //       path: "/paylinktransaction",
    //     },
    //     {
    //       title: "Settlement",
    //       icon: "fa-solid fa-sack-dollar",
    //       path: "/settlementtransaction",
    //     },
    //   ],
    // },
    // {
    //   title: "Your Merchants",
    //   icon: "bx bx-group",
    //   path: "/#",
    //   childrens: [
    //     {
    //       title: "Generate QR Merchant",
    //       icon: "bx bx-qr",
    //       path: "/generateqrmerchant",
    //     },
    //     {
    //       title: "Merchant Qr Request",
    //       icon: "bx bx-qr-scan",
    //       path: "/merchantqrrequest",
    //     },
    //     {
    //       title: "Blocked Merchants",
    //       icon: "fa-solid fa-user-xmark",
    //       path: "/blockedmerchant",
    //     },
    //   ],
    // },
    // {
    //   title: "Management",
    //   icon: "bx bx-list-ul",
    //   path: "/#",
    //   childrens: [
    //     {
    //       title: "Sub Admin",
    //       icon: "bi bi-people-fill",
    //       path: "/subadmins",
    //     },
    //     {
    //       title: "Categories",
    //       icon: "bx bx-category-alt",
    //       path: "/categories",
    //     },
    //     {
    //       title: "Banks",
    //       icon: "bx bxs-bank",
    //       path: "/banks",
    //     },
    //     {
    //       title: "Paylinks",
    //       icon: "bx bx-link",
    //       path: "/managementpaylink",
    //     },
    //     {
    //       title: "Disputes",
    //       icon: "bi-question-circle-fill",
    //       path: "/disputes",
    //     },
    //     {
    //       title: "Push Notification",
    //       icon: "bx bxs-bell-ring",
    //       path: "/pushnotification",
    //     },
    //   ],
    // },
    // {
    //   title: "Approvals",
    //   icon: "bi bi-hand-thumbs-up",
    //   path: "/#",
    //   childrens: [
    //     {
    //       title: "Payouts",
    //       icon: "bx bxs-navigation",
    //       path: "/payouts",
    //     },
    //     {
    //       title: "Paylinks",
    //       icon: "bx bx-link-external",
    //       path: "/approvalpaylinks",
    //     },
    //     {
    //       title: "Bank Approve",
    //       icon: "bi bi-bank2",
    //       path: "/bankapprove",
    //     },
    //   ],
    // },
    // {
    //   title: "Insurance",
    //   icon: "bi bi-shield-shaded",
    //   path: "/#",
    //   childrens: [
    //     {
    //       title: "Personal",
    //       icon: "bx bxs-user",
    //       path: "/personal",
    //     },
    //     {
    //       title: "Shop",
    //       icon: "bx bx-shopping-bag",
    //       path: "/shop",
    //     },
    //   ],
    // },
    {
      title: 'Reconciliation',
      icon: 'bx bxs-report',
      path: '/#',
      childrens: [
        WhitelistedRoutes?.VpaReconciliations?.is_enabled
          ? 
          {
              title: 'UPI',
              icon: 'bx bx-command',
              path: '/upi-transactions',
            }
          : false,
      ],
    },
    WhitelistedRoutes?.Agents?.route_list?.list?.is_enabled
      ? {
          title: 'Agents',
          icon: 'bi bi-person-lines-fill',
          path: '/agents',
        }
      : false,
      WhitelistedRoutes?.Survey?.is_enabled
      ? {
          title: 'Surveys',
          icon: 'bx bx-bar-chart-alt',
          path: '/surveys',
        }
      : false,

    WhitelistedRoutes?.admin?.is_enabled
      ? {
          title: 'Sub Admins',
          icon: 'bi bi-person-fill-gear',
          path: '/subadmin',
        }
      : false,
    // {
    //     title: "Inventory",
    //     icon: "bi bi-cart4",
    //     path: "/inventory",
    //   },
    // WhitelistedRoutes?.Soundbox?.is_enabled ?{
    //   title: "SoundBox",
    //   icon: "bi bi-speaker",
    //   path: "/soundbox",
    // }:false,
    {
      title: 'SoundBox',
      icon: 'bi bi-speaker',
      path: '/#',
      childrens: [
        WhitelistedRoutes?.Soundbox?.is_enabled ? {
          title: "SoundBox List",
          icon: "bi bi-list",
          path: "/soundbox",
        } : false,
        WhitelistedRoutes?.Soundbox?.route_list?.upi_mandate_list?.is_enabled ? {
          title: "UPI Mandate",
          icon: "bx bx-box",
          path: "/soundbox-upi-mandate",
        } : false,
        // WhitelistedRoutes?.Soundbox?.is_enabled ? {
        //   title: "Soundbox Request",
        //   icon: "bx bx-box",
        //   path: "/soundbox-requests",
        // } : false,
    
        // {
        //   title: "SoundBox Plans",
        //   icon: "bx bx-store",
        //   path: "/soundbox-plans",
        // },
        WhitelistedRoutes?.Soundbox?.route_list?.soundbox_request_list?.is_enabled ? {
          title: "SoundBox Request",
          icon: "bx bx-box",
          path: "/soundbox-requests",
        } : false
      ],
    },
    WhitelistedRoutes?.dispute?.is_enabled
      ? {
          title: 'Disputes',
          icon: 'bx bx-box',
          path: '/disputes',
        }
      : false,

  
    WhitelistedRoutes?.insurance?.route_list?.payout_list?.is_enabled
      ? {
          title: 'Insurance Payout List',
          icon: 'bi bi-wallet2',
          path: '/payout',
        }
      : false,
  ];

  // const filteredSidebarMenu = sidebarMenu
  //   .map((menu) => {
  //     if (menu.childrens && Array.isArray(menu.childrens)) {
  //       menu.childrens = menu.childrens.filter((child) => child && child.title);
  //     }
  //     return menu;
  //   })
  //   .filter((menu) => menu?.childrens && menu?.childrens.length > 0);

  // const filteredSidebarMenu = sidebarMenu
  // .map((menu) => {
  //   if (menu.childrens && Array.isArray(menu.childrens)) {
  //     menu.childrens = menu.childrens
  //       .filter((child) => child && child.title);
  //   }
  //   return menu;
  // })
  // .filter((menu) => {
  //   if (menu.childrens && menu.childrens.length > 0) {
  //     return true;
  //   }
  //   if (!menu.childrens) {
  //     return true;
  //   }
  //   return false;
  // });

  const filteredSidebarMenu = sidebarMenu
    .map((menu) => {
      if (menu.childrens && Array.isArray(menu.childrens)) {
        menu.childrens = menu.childrens.filter((child) => child && child.title);
      }
      return menu;
    })
    .filter((menu) => {
      if (menu.childrens && menu.childrens.length > 0) {
        return true;
      }
      if (menu.childrens === undefined) {
        return true;
      }
      return false;
    })
    .filter((menu) => menu !== false);

  const ref = useRef();
  const activateParentDropdown = useCallback((item) => {
    item.classList.add('active');
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== 'side-menu') {
      parent2El.classList.add('mm-show');
    }
    if (parent) {
      parent.classList.add('mm-active');
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add('mm-show'); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add('mm-active'); // li
          parent3.childNodes[0].classList.add('mm-active'); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add('mm-show'); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add('mm-show'); // li
              parent5.childNodes[0].classList.add('mm-active'); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (let i = 0; i < items.length; ++i) {
      let item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains('active')) {
        item.classList.remove('active');
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== 'side-menu') {
          parent2El.classList.remove('mm-show');
        }

        parent.classList.remove('mm-active');
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove('mm-show');

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove('mm-active'); // li
            parent3.childNodes[0].classList.remove('mm-active');

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove('mm-show'); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove('mm-show'); // li
                parent5.childNodes[0].classList.remove('mm-active'); // a tag
              }
            }
          }
        }
      }
    }
  };

  const path = useLocation();
  const activeMenu = useCallback(() => {
    const pathName = path?.pathname.split('/')[1];
    console.log('pathName: ', pathName);
    let matchingMenuItem = null;
    const ul = document.getElementById('side-menu');
    const items = ul.getElementsByTagName('a');
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname.split('/')[1]) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu('#side-menu');
    activeMenu();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  return (
    <React.Fragment>
      {loading && <Loader />}
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">Menu</li>
            {filteredSidebarMenu.map((item, index) => {
              if (item.childrens) {
                return (
                  <li key={index}>
                    <Link to={item.path} className="has-arrow">
                      <i className={item.icon}></i>
                      <span>{item.title}</span>
                    </Link>
                    <ul className="sub-menu">
                      {item.childrens.map((child, m) => (
                        <li key={m}>
                          <Link to={child.path}>{child.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              } else {
                return (
                  <li key={index}>
                    <Link to={item.path}>
                      <i className={item.icon}></i>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              }
            })}
            {WhitelistedRoutes?.insurance?.is_enabled ? (
              <li>
                <a onClick={insuranceApicall}>
                  <i
                    className="bx bxs-analyse"
                    style={{ fontSize: '20px' }}
                  ></i>
                  <span>Insurance Dekho</span>
                </a>
              </li>
            ) : (
              ''
            )}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};
SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default SidebarContent;

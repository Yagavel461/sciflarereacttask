import React, { useEffect, useState } from 'react';
import { imagePath } from '../../ui/ImagePath';
import OtpInput from 'react18-input-otp';
import { toast } from 'react-toastify';
import {
  getApiCall,
  postApiCall,
  setCookie,
  storageSetItem,
  reloadWindowToPath,
  removeCookie,
  updateCookie,
} from '../../helpers/utils';
import { useFormik } from 'formik';
import { loginSchema } from '../../ui/Formik-Yup/schemas';
import { useDispatch, useSelector } from 'react-redux';
import { ActionTypes } from '../../redux/constants/actionTypes';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  //meta title
  document.title = 'Store Admin | Login';
  let navigate = useNavigate();

  let otpLength = 6;

  const [phonecard, setPhonecard] = useState(true);
  const [wrongotp, setWrongotp] = useState(false);
  const [correctOtp, setCorrectOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [ShowPassword, setShowPassword] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [isBtnLoad, setIsBtnLoad] = useState(false);
  const dispatch = useDispatch();
  const { Acl } = useSelector((state) => state);
  const updateState = (actionType, value) => () => {
    dispatch({ type: actionType, payload: value });
    return Promise.resolve();
  };
  // useEffect(() => {
  //   dispatch(
  //     updateState(ActionTypes.GET_WHITELIST_ROUTES, {
  //       getWhitelistedRoutes: {}
  //     })
  //   );
  // }, []);
  useEffect(() => {
    if (adminId) {
      getApiCall(`store-admin/auth/route-list/${adminId}`, (response) => {
        if (response.success) {
          console.log(response?.data, 'acl');
          dispatch(
            updateState(ActionTypes.GET_WHITELIST_ROUTES, {
              getWhitelistedRoutes: response?.data,
            })
          );
          getcsrf();
        } else {
          toast.error('Error In Route List');
          removeCookie('IppoStoreAdminToken');
          removeCookie('StoreCsrfToken');
          setAdminId('');
        }
      });
    }
  }, [adminId]);

  const getcsrf = () => {
    getApiCall('store-admin/auth/generate-token', (response) => {
      setCookie('StoreCsrfToken', response.data.csrfToken);
      getAdminDetails();
    });
  };

  const getAdminDetails = () => {
    getApiCall(`store-admin/admin/get-details`, (response) => {
      if (response.success) {
        dispatch(
          updateState(ActionTypes.GET_PROFILE_DETAILS, {
            ProfileInfo: response?.data,
          })
        );
        reloadWindowToPath('/home');
      } else {
        toast.error(response.message);
      }
    });
  };

  const handleLogin = (values, actions) => {
    let data = {
      email: values.email,
      password: values.password,
    };
    setTimeout(() => {
      postApiCall('store-admin/auth/login', data, (response) => {
        console.log(response);
        if (response?.success) {
          actions.setSubmitting(false);
          if (response?.data && response?.data === 'verify_otp') {
            setPhonecard(false);
          } else {
            // setCookie("IppoStoreAdminToken", response?.data?.admin?.auth_token);
            updateCookie(
              'IppoStoreAdminToken',
              response?.data?.admin?.auth_token
            );
            setAdminId(response?.data?.admin?.admin_id);
            getcsrf();
          }
        } else {
          actions.setSubmitting(false);
          toast.error(response?.message);
        }
      });
    }, 500);
  };

  const validateOtp = () => {
    if (otp.length < otpLength) {
      toast.info('Please Enter Valid OTP');
    } else {
      let inputData = {
        email: values.email,
        password: values.password,
        otp: otp,
      };
      setIsBtnLoad(true);
      setTimeout(() => {
        postApiCall(
          'store-admin/auth/login/verify-otp',
          inputData,
          (response) => {
            if (response.success) {
              setIsBtnLoad(false);
              // setCookie(
              //   "IppoStoreAdminToken",
              //   response?.data?.admin?.auth_token
              // );
              updateCookie(
                'IppoStoreAdminToken',
                response?.data?.admin?.auth_token
              );
              storageSetItem(
                'admin_detail',
                JSON.stringify(response?.data.admin)
              );
              setAdminId(response?.data?.admin?.admin_id);
              getcsrf();
              setCorrectOtp(true);
            } else {
              setIsBtnLoad(false);
              response?.status !== 400 &&
                toast.error(
                      response?.message.toUpperCase()
                );
              setWrongotp(true);
              setOtp('');
            }
          }
        );
      }, 500);
    }
  };

  useEffect(() => {
    if (otp.length === otpLength) {
      validateOtp();
    }
  }, [otp]);

  const handleChangeOtp = (otpinput) => {
    console.log(otp);
    let REGEX = /^\d+$/;
    if (otpinput === '' || REGEX.test(otpinput)) {
      setOtp(otpinput);
      setWrongotp(false);
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      <div className="login-page">
        <section className="w-100">
          <div className="row">
            <div className="d-none d-lg-block col-lg-7 ps-5 mt-5">
              {/* <img
                style={{ height: '45px' }}
                src={imagePath('./login-ippopay-logo.svg')}
              /> */}
              <div className="login_left_title">Welcome Admin</div>
              <div className="login_left_desc mt-3 mb-3">
                Behind every exceptional customer experience
                <br /> is a highly effective administrative team
              </div>
            </div>
            <div className="col-lg-5 ps-lg-5">
              <div className="d-flex justify-content-center align-items-center p-4 login_bg">
                <div className="login form">
                  <div className="d-lg-none d-block d-flex justify-content-center align-items-center mb-5">
                    {/* <img
                      style={{ height: '35px' }}
                      src={imagePath('./login-ippopay-logo.svg')}
                    /> */}
                  </div>
                  <div className="login_right_title mb-4 ">
                    {phonecard ? (
                      <span>Login</span>
                    ) : (
                      <span>OTP Verification</span>
                    )}
                  </div>
                  <div className="login_right_desc mb-3">
                    {phonecard ? (
                      <span>Enter Admin Credentials Here</span>
                    ) : (
                      <span>Enter Your 6-Digit OTP Code</span>
                    )}
                  </div>
                  {phonecard ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      <div className="input-group mb-4">
                        <span className="input-group-text">
                          <i className="bx bx-envelope font-size-18" />
                        </span>
                        <input
                          // className={errors.email && touched.email ? "form-control form_input input-error":"form-control form_input"}
                          className="form-control form_input"
                          type="email"
                          autoComplete="off"
                          name="email"
                          id="email"
                          placeholder=" "
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <span className="form_label">Email</span>
                        {errors.email && touched.email ? (
                          <p className="login-errorMsg">{errors.email}</p>
                        ) : null}
                      </div>
                      <div className="input-group ">
                        <span
                          className="input-group-text"
                          onClick={() => setShowPassword(!ShowPassword)}
                        >
                          <i
                            className={
                              ShowPassword
                                ? 'fa fa-eye font-size-16'
                                : 'fa fa-eye-slash font-size-15'
                            }
                          />
                        </span>
                        <input
                          type={ShowPassword ? 'text' : 'password'}
                          className="form-control form_input"
                          autoComplete="off"
                          name="password"
                          id="password"
                          placeholder=" "
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <span className="form_label">Password</span>
                        {errors.password && touched.password ? (
                          <p className="login-errorMsg">{errors.password}</p>
                        ) : null}
                      </div>
                      <div className="mt-5 mb-3 ">
                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className="btn btn-primary font-size-15 w-100 login-btn"
                        >
                          {isSubmitting ? (
                            <>
                              <i className="fa fa-spinner fa-spin" />
                              <span className="ms-2">Loading</span>
                            </>
                          ) : (
                            'Send OTP'
                          )}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="row">
                      <OtpInput
                        className="otp-input-box"
                        containerStyle="justify-content-between px-3"
                        shouldAutoFocus
                        isInputNum
                        errorStyle="errorotp"
                        hasErrored={wrongotp}
                        value={otp}
                        onChange={handleChangeOtp}
                        numInputs={otpLength}
                        name='otp'
                        // onSubmit={validateOtp}
                      />
                      {/* <div className="mt-4 mb-3 ">
                        <button
                          type="button"
                          className="btn btn-primary font-size-15 w-100"
                          onClick={validateOtp}
                          disabled={isBtnLoad}
                        >
                          {isBtnLoad ? (
                            <>
                              <i className="fa fa-spinner fa-spin" />
                              <span className="ms-2">Loading</span>
                            </>
                          ) : (
                            "Login"
                          )}
                        </button>
                      </div> */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Login;

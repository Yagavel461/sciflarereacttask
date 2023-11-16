import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes } from "../../redux/constants/actionTypes";
import { toast } from "react-toastify";
import { postApiCall, getApiCall } from "../../helpers/utils";
import { Form, Formik } from "formik";
import { CustomInput, CustomSelect } from "../../ui/Formik-Yup/customForm";
import { AgentSchema } from "../../ui/Formik-Yup/schemas";
const AddAgent = () => {
  //meta title
  document.title = "Add Agent";
  const { Option } = Select;
  const dispatch = useDispatch();
  useEffect(() => {
    getRolelist();
    ReduxStoreEmpty();
    getStateList();
  }, []);
  const { Agents } = useSelector((state) => state);
  const asm_list = Agents?.asm_list;
  const tl_list = Agents?.tl_list;
  const city_list = Agents?.city_list;
  const state_list = Agents?.state_list;

  // Emptying The Redux InitialState
  const ReduxStoreEmpty = () => {
    dispatch(updateState(ActionTypes.GET_ASM_LIST, { asm_list: [] }));
    dispatch(updateState(ActionTypes.GET_TL_LIST, { tl_list: [] }));
    dispatch(updateState(ActionTypes.GET_AGENTSTATE_LIST, { state_list: [] }));
    dispatch(updateState(ActionTypes.GET_AGENTCITY_LIST, { city_list: [] }));
  };

  const getStateList = () => {
    getApiCall(`store-admin/agent/state/list`, (response) => {
      if (response.success) {
        dispatch(
          updateState(ActionTypes.GET_AGENTSTATE_LIST, {
            state_list: response?.data?.states,
          })
        );
      } else {
        toast.error(response?.message);
      }
    });
  };

  const getTlList = (asm_id) => {
    let query = asm_id ? "?asm_id=" + asm_id : "";
    getApiCall(`store-admin/agent/role-list/tl${query}`, (response) => {
      if (response.success) {
        dispatch(
          updateState(ActionTypes.GET_TL_LIST, {
            tl_list: response?.data?.agents,
          })
        );
      } else {
        toast.error(response?.message);
      }
    });
  };

  const getRolelist = (asm_id = "") => {
    let query = asm_id ? "?asm_id=" + asm_id : "";
    getApiCall(`store-admin/agent/role-list/asm${query}`, (response) => {
      if (response.success) {
        dispatch(
          updateState(ActionTypes.GET_ASM_LIST, {
            asm_list: response?.data?.agents,
          })
        );
      } else {
        toast.error(response?.message);
      }
    });
  };

  const updateState = (actionType, value) => () => {
    dispatch({ type: actionType, payload: value });
    return Promise.resolve();
  };

  const agentValues = {
    role: "",
    asm_id: "",
    tl_id: "",
    name: "",
    businessName: "",
    merchantName: "",
    phoneNumber: "",
    email: "",
    street: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
  };
  let navigate = useNavigate();

  const createAgent = (values, actions) => {
    let { asm, tl, state, city } = "";
    console.log("asm", values.asm_id);
    let createrole = values.role;
    if (createrole === "agent" || createrole === "junior-fse"  ) {
      if (values?.asm_id === "") {
        toast.error("Please select asm");
        return false;
      }
      if (createrole === "agent"  && values?.tl_id === "") {
        toast.error("Please select tl");
        return false;
      }
    } 
    if (createrole === "tl") {
      if (values.asm_id === "") {
        toast.error("Please select asm");
        return false;
      }
    }

    if (values.asm_id) {
      asm = JSON.parse(values?.asm_id);
    }
    if (values.tl_id) {
      tl = JSON.parse(values?.tl_id);
    }
    if (values.state) {
      state = JSON.parse(values?.state);
    }
    if (values.city) {
      city = JSON.parse(values?.city);
    }
    let data = {
      name: {
        full: values?.name || "",
      },
      role: values.role,
      phone: {
        national_number: values?.phoneNumber,
      },
      commission: "",
      reference: {
        asm: {
          id: asm?.asm_id || "",
          name: asm?.asm_name || "",
        },
        tl: {
          id: tl?.tl_id || "",
          name: tl?.tl_name || "",
        },
        third_party: {
          id: "",
          name: "",
        },
      },
      location: {
        flat_no: "",
        street_name: "",
        area: "",
        city: {
          name: city?.city_name || "",
          code: city?.code || "",
        },
        state: {
          name: state?.state_name,
          code: state?.code,
        },
        pincode: "",
      },
    };
    postApiCall(`store-admin/agent/create`, data, (response) => {
      console.log(response);
      if (response.success) {
        toast.success(response.message);
        navigate("/agents");
        actions.resetForm();
        actions.setSubmitting(false);
      } else {
        let message = response?.message;
        toast.info(message);
        actions.setSubmitting(false);
      }
    });
  };

  const handleChangeAsm = (value, setFieldValue) => {
    setFieldValue("asm_id", value);
    setFieldValue("tl_id",null);
    dispatch(
      updateState(ActionTypes.GET_TL_LIST, {
        tl_list: [],
      })
    );
    value = JSON.parse(value);
    getTlList(value.asm_id);
    setFieldValue("", null);
  };

  const [showTl, setShowTl] = useState(true);
  const [showAsm, setShowAsm] = useState(true);
  const handleOnRoleChange = (role, setFieldValue) => {
    setFieldValue("role", role);
    if (role === "agent") {
      setShowTl(true);
      setShowAsm(true);
    } else if (role === "tl") {
      setShowTl(false);
      setShowAsm(true);
    } else if (role === "asm") {
      setShowTl(false);
      setShowAsm(false);
    }else if(role === "junior-fse") {
      setShowTl(false);
      setShowAsm(true);
    }
  };

  const handleChangeState = (state,setFieldValue) => {
    state = JSON.parse(state);
    setFieldValue("city","");
    getCityList(state.state_name);
  };
  const getCityList = (state) => {
    getApiCall(`store-admin/agent/city/list?state=${state}`, (response) => {
      if (response.success) {
        dispatch(
          updateState(ActionTypes.GET_AGENTCITY_LIST, {
            city_list: response?.data?.cities,
          })
        );
      } else {
        toast.error(response?.message);
      }
    });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card wizard-steps-card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="card-title">Create Agent</div>
                  </div>
                  <Formik
                    initialValues={agentValues}
                    validationSchema={AgentSchema}
                    onSubmit={createAgent}
                    validateOnChange={false} 
                    validateOnBlur={false} 
                  >
                    {({ isSubmitting, setFieldValue, values }) => (
                      <Form className="row g-3 custom-form">
                        <div className="col-md-4">
                          <CustomSelect
                            label="Select Role"
                            id="role"
                            name="role"
                            placeholder="Select Role"
                            onSelect={(value) =>
                              handleOnRoleChange(value, setFieldValue)
                            }
                          >
                            <Option value="" disabled>
                              Select Role
                            </Option>
                            <Option value="agent">Agent</Option>
                            <Option value="asm">ASM</Option>
                            <Option value="tl">TL</Option>
                            <Option value="junior-fse">Junior FSE</Option>
                          </CustomSelect>
                        </div>
                        {showAsm && (
                          <div className="col-md-4">
                            <CustomSelect
                              label="Select ASM"
                              id="asm_id"
                              name="asm_id"
                              placeholder="Select ASM"
                              onChange={(value) =>
                                handleChangeAsm(value, setFieldValue)
                              }
                              showSearch
                              removeIcon
                            >
                              <Option value="" disabled>
                                Select ASM
                              </Option>
                              {asm_list.map((role, i) => (
                                <Option
                                  value={JSON.stringify({
                                    asm_name: role?.name?.full,
                                    asm_id: role?.agent_id,
                                  })}
                                  key={i}
                                >
                                  {" "}
                                  {role?.name?.full}
                                </Option>
                              ))}
                            </CustomSelect>
                          </div>
                        )}

                        {showTl && (
                          <div className="col-md-4">
                            <CustomSelect
                              label="Select TL"
                              id="tl_id"
                              name="tl_id"
                              placeholder="Select TL"
                              onChange={(value) =>
                                setFieldValue("tl_id", value)
                              }
                              showSearch
                              removeIcon
                            >
                              <Option value="" disabled>
                                Select TL
                              </Option>
                              {tl_list?.map((role) => (
                                <Option
                                  key={role}
                                  value={JSON.stringify({
                                    tl_name: role?.name?.full,
                                    tl_id: role?.agent_id,
                                  })}
                                >
                                  {role?.name?.full}
                                </Option>
                              ))}
                            </CustomSelect>
                          </div>
                        )}
                        <div className="col-md-4">
                          <CustomInput
                            label="Name"
                            type="text"
                            id="name"
                            placeholder="Enter Name"
                            name="name"
                          />
                        </div>
                        <div className="col-md-4">
                          <CustomInput
                            label="Phone Number"
                            type="text"
                            id="phoneNumber"
                            placeholder="Phone number"
                            name="phoneNumber"
                            maxLength={10}
                          />
                        </div>
                        <div className="col-md-4">
                          <CustomSelect
                            label="Select State"
                            id="state"
                            name="state"
                            placeholder="Select ASM"
                            showSearch
                            removeIcon
                            onSelect={(selectedValue) =>
                              handleChangeState(selectedValue,setFieldValue)
                            }
                            onChange={(value) => setFieldValue("state", value)}
                          >
                            <Option value="" disabled>
                              Select State
                            </Option>
                            {state_list.map((state, i) => (
                              <Option
                                value={JSON.stringify({
                                  code: state?.code,
                                  state_name: state?.name,
                                })}
                                key={i}
                              >
                                {" "}
                                {state?.name}
                              </Option>
                            ))}
                          </CustomSelect>
                        </div>
                        <div className="col-md-4">
                          <CustomSelect
                            label="Select City"
                            id="city"
                            name="city"
                            placeholder="Select City"
                            showSearch
                            removeIcon
                            onChange={(value) => setFieldValue("city", value)}
                          >
                            <Option value="" disabled>
                              Select CIty
                            </Option>
                            {city_list?.map((city, i) => (
                              <Option
                                value={JSON.stringify({
                                  code: city?.code,
                                  city_name: city?.city,
                                })}
                                key={i}
                              >
                                {" "}
                                {city?.city}
                              </Option>
                            ))}
                          </CustomSelect>
                        </div>
                        <div className="col-12 mt-4">
                          <Link to={`/agents`}>
                            <button type="submit" className="btn btn-info">
                              Back
                            </button>
                          </Link>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary ms-2"
                          >
                            Submit
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AddAgent;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Select, message, Popconfirm, Tooltip } from 'antd';
import { Modal } from 'reactstrap';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { ActionTypes } from '../../redux/constants/actionTypes';
import { CustomInput, CustomSelect } from '../../ui/Formik-Yup/customForm';
import { toast } from 'react-toastify';
import { postApiCall, deleteApiCall } from '../../helpers/utils';
import { PopConfirmModal } from '../../components/PopConfirmModal';
import userDeactive from '../../assets/LottieFiles/deactiavateuser.json';
import userActive from '../../assets/LottieFiles/activateuser.json';
import { AccessRestricted } from '../../components/AccessDenied';
import deleteicon from '../../assets/LottieFiles/delete_user.json';
import {
  patchApiCall,
  showDateTime,
  dateString,
  textCapitalize,
} from '../../helpers/utils';
import Loader from '../../components/Loader';
import { getApiCall } from '../../helpers/utils';
import Pagination from '../../components/Pagination';
import {
  InputGroupFilter,
  DropdownFilter,
  ButtonFilter,
  DateRangeFilter,
} from '../../ui/Filters';
import { Label } from 'reactstrap';
import {
  MapSchema,
  LocationSchema,
  changeroleschema,
  editSchema,
} from '../../ui/Formik-Yup/schemas';

const AgentList = () => {
  const [pageno, setPageNo] = useState(1);
  const [limit, setLimit] = useState(25);
  const [loading, set_loader] = useState(true);
  const [disable, setDisable] = useState(true);
  const [pageresponse, set_pageresponse] = useState(false);
  const [recordsLength, setrecordLength] = useState([]);
  const [reset, setReset] = useState(false);
  const [searchApiHit, set_searchApiHit] = useState(false);
  const [filter, setFilter] = useState({
    searchSelectName: '',
    searchInputName: '',
    dateFrom: '',
    dateTo: '',
    searchRole: '',
    searchStatus: '',
    searchState: '',
  });

  const locationvalues = {
    state: '',
    city: '',
    flatno: '',
    street: '',
    area: '',
    pincode: '',
  };

  const changedroleValue = {
    role: '',
  };

  // Emptying The Redux InitialState
  const ReduxStoreEmpty = () => {
    dispatch(updateState(ActionTypes.GET_AGENT_LIST, { agentList: [] }));
    dispatch(updateState(ActionTypes.GET_ASM_LIST, { asm_list: [] }));
    dispatch(updateState(ActionTypes.GET_TL_LIST, { tl_list: [] }));
  };

  const handleOnDateChange = (e, dateString) => {
    setFilter({
      ...filter,
      dateFrom: e.length > 0 ? e[0] : '',
      dateTo: e.length > 0 ? e[1] : '',
    });
  };

  const [btnClicked, setBtnClicked] = useState();

  const [searchOptionData, setSearchOptionData] = useState([
    { value: 'Agent ID', key: 'agent_id' },
    // { value: "Agent Name", key: "name.full" },
    { value: 'Phone Number', key: 'phone' },
  ]);
  const [statusData, setStatusData] = useState([
    { value: 'Active', key: 'active' },
    { value: 'Deactive', key: 'deactive' },
  ]);

  const [roleData, setRoleData] = useState([
    { value: 'All', key: '' },
    { value: 'Junior FSE', key: 'junior-fse' },
    { value: 'Agent', key: 'agent' },
    { value: 'TL', key: 'tl' },
    { value: 'ASM', key: 'asm' },
    { value: ' Branch Manager ', key: 'branch_manager' },
    { value: 'Regional Manager', key: 'regional_manager' },
    { value: 'QC', key: 'qc' },
    { value: 'Third party', key: 'third_party' },
  ]);

  const mapValues = {
    asm: '',
    tl: '',
    thirdparty: '',
  };

  const [isUpdated, setisUpated] = useState(false);
  const [agent_Modal, setagent_Modal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  const editToggle = (agent) => {
    const { agent_id, agent_name, phone } = JSON.parse(agent);
    setEditData({
      agent_id: agent_id,
      agent_name: agent_name,
      phone: phone,
    });
    setEditModal(!editModal);
  };
  const toggle = () => {
    if (editModal) {
      setEditModal(!editModal);
    } else {
      setEditModal(!editModal);
    }
  };
  const editValues = {
    name: editData.agent_name || '',
    phone: editData.phone || '',
  };

  let navigate = useNavigate();
  const [mapData, setMapData] = useState({});
  const agent_Toggle = async (agent_id, role) => {
    await setMapData({
      agent_id: agent_id || '',
      role: role || '',
    });
    if (role === 'thirdparty') {
      getthirdParty();
    }
    setagent_Modal(!agent_Modal);
  };
  const clockinAgent = (phone) => {
    let data = {
      phone_number: phone,
    };
    postApiCall(`store-admin/agent/approve-clockin`, data, (response) => {
      console.log(response);
      if (response.success) {
        getAgentList(pageno);
        toast.success(response.message);
      } else {
        toast.info(response.message);
      }
    });
  };
  const [StateData, setStateData] = useState([]);
  const getStateList = () => {
    getApiCall(`store-admin/agent/state/list`, (response) => {
      if (response.success) {
        const result = response?.data?.states?.map((item) => ({
          value: item?.name,
          key: item?.name,
        }));
        setStateData(result);
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

  const [location_Moda, setlocation_Moda] = useState(false);
  const [agentId, setAgentId] = useState(null);
  const [role, setRole] = useState(null);

  const location_Toggl = (agentid, role) => {
    setAgentId(agentid);
    setRole(role);
    setlocation_Moda(!location_Moda);
  };

  const [location_Modal, setlocation_Modal] = useState(false);
  const location_Toggle = (agentId) => {
    setAgentId(agentId);
    setlocation_Modal(!location_Modal);
  };
  const mapAgent = (values, actions) => {
    const reference = {};
    if (Object.keys(values.asm).length !== 0) {
      const asmData = JSON.parse(values.asm);
      reference.asm = { id: asmData.asm_id, name: asmData.asm_name };
    }
    if (Object.keys(values.thirdparty).length !== 0) {
      const thirdpartyData = JSON.parse(values.thirdparty);
      reference.third_party = {
        id: thirdpartyData.agent_id,
        name: thirdpartyData.name,
      };
    }
    if (Object.keys(values.tl).length !== 0) {
      const tlData = JSON.parse(values.tl);
      reference.tl = { id: tlData.tl_id, name: tlData.name };
    }
    let data = { reference: reference };
    postApiCall(
      `store-admin/agent/agent-mapping/${mapData.agent_id}`,
      data,
      (response) => {
        console.log(response);
        if (response.success) {
          setagent_Modal(false);
          toast.success(response.message);
        } else {
          toast.info(response.message);
          actions.setSubmitting(false);
        }
      }
    );
  };

  const handleChangeState = (state) => {
    state = JSON.parse(state);
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

  const mapLocation = (values, actions) => {
    let city = JSON.parse(values.city);
    let state = JSON.parse(values.state);
    let data = {
      location: {
        flat_no: values.flatno,
        street_name: values.street,
        area: values.area,
        city: {
          name: city.city_name,
          code: city.code,
        },
        state: {
          name: state.state_name,
          code: state.code,
        },
        pincode: values.pincode,
      },
    };
    postApiCall(
      `store-admin/agent/location-mapping/${agentId}`,
      data,
      (response) => {
        if (response.success) {
          setlocation_Modal(false);
          toast.success(response.message);
          getAgentList(pageno);
        } else {
          toast.info(response.message);
          actions.setSubmitting(false);
        }
      }
    );
  };

  const agentDelete = (id) => {
    deleteApiCall(
      `store-admin/agent/delete/${subuserDeleteobj.id}`,
      {},
      (response) => {
        if (response.success) {
          getAgentList(pageno);
          setDeleteModal(false);
          toast.success(response.message);
          setBtnLoad(false);
        } else {
          setDeleteModal(false);
          setBtnLoad(false);
          toast.error(response.message);
        }
      }
    );
  };
  const handleRole = (values, setFieldValue) => {
    setFieldValue('role', values);
  };

  const editAgent = (values, actions) => {
    let data = {
      agent_id: editData.agent_id,
      agent_name: values.name,
      phone: values.phone,
    };
    postApiCall(`store-admin/agent/edit-agent`, data, (response) => {
      if (response.success) {
        setEditModal(false);
        toast.success(response.message);
        getAgentList(pageno);
        setisUpated(true);
        actions.resetForm();
      } else {
        toast.info(response.message);
        actions.setSubmitting(false);
      }
    });
  };

  const changeRole = (values, actions) => {
    let data = {
      agent_id: agentId,
      new_role: values.role,
    };
    postApiCall(`store-admin/agent/change-role`, data, (response) => {
      if (response.success) {
        setlocation_Moda(false);
        toast.success(response.message);
        getAgentList(pageno);
        setisUpated(true);
        actions.resetForm();
      } else {
        toast.info(response.message);
        actions.setSubmitting(false);
      }
    });
  };

  //meta title
  document.title = 'Agents';
  const { Option } = Select;
  const { Agents } = useSelector((state) => state);
  const state_list = Agents?.state_list;
  const city_list = Agents?.city_list;
  const tl_list = Agents?.tl_list;
  const asm_list = Agents?.asm_list;
  const third_party = Agents?.third_party;
  const getAgents = Agents?.agentList;
  const dispatch = useDispatch();

  //ACL USE SELECTOR
  const { Acl } = useSelector((state) => state);
  const AgentAcl = Acl?.getWhitelistedRoutes?.Agents?.route_list;
  const isAclList = AgentAcl?.list?.is_enabled || false;
  const isAclAdd = AgentAcl?.create?.is_enabled || false;
  const isAclDetail = AgentAcl?.detail?.is_enabled || false;
  const isAclClockIn = AgentAcl?.approve_clockin?.is_enabled || false;
  const isAclupdate = AgentAcl?.update?.is_enabled || false;
  const isAclDelete = AgentAcl?.delete?.is_enabled || false;
  const isAclstatus = AgentAcl?.status?.is_enabled || false;
  const isAclmapAgent = AgentAcl?.map_agent?.is_enabled || false;
  const isAclchangeRole = AgentAcl?.change_role?.is_enabled || false;
  const isAclLocationMapping = AgentAcl?.location_mapping?.is_enabled || false;
  const isAclApproveAgent = AgentAcl?.approveagent?.is_enabled || false;

  const moreOption =
    isAclmapAgent || isAclchangeRole || isAclLocationMapping ? true : false;
  let colspan = 5;
  colspan +=
    (isAclClockIn ? 1 : 0) +
    (!isAclstatus ? 1 : 0) +
    (isAclmapAgent || isAclchangeRole || isAclLocationMapping ? 1 : 0) +
    (isAclDelete || isAclupdate ? 1 : 0);

  const updateState = (actionType, value) => () => {
    dispatch({ type: actionType, payload: value });
    return Promise.resolve();
  };

  useEffect(() => {
    ReduxStoreEmpty();
  }, []);

  useEffect(() => {
    getStateList();
    getRolelist();
  }, []);

  useEffect(() => {
    getAgentList(pageno);
  }, [limit, reset,pageno, searchApiHit]);

  const handleChangeAsm = (asm) => {
    asm = JSON.parse(asm);
    getTLlist(asm.asm_id);
  };

  const getthirdParty = (asmid) => {
    getApiCall(
      `store-admin/agent/role-list/thirdparty?asm_id=${asmid}`,
      (response) => {
        if (response.success) {
          dispatch(
            updateState(ActionTypes.GET_THIRDPARTY_LIST, {
              third_party: response?.data?.agents,
            })
          );
        } else {
          toast.error(response?.message);
        }
      }
    );
  };

  const getTLlist = (asmid) => {
    getApiCall(`store-admin/agent/role-list/tl?asm_id=${asmid}`, (response) => {
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

  //delete MODAL
  const [deleteModal, setDeleteModal] = useState(false);
  const [subuserDeleteobj, set_subuserDeleteobj] = useState({});

  const deletePopconfirm = (agent) => {
    setDeleteModal(true);
    set_subuserDeleteobj({
      id: agent?.agent_id,
      name: agent?.name?.full === '' ? '' : agent?.name?.full,
    });
  };

  const getAgentList = (page) => {
    if (isAclList) {
      setPageNo(page);
      const { searchInputName, searchSelectName, dateFrom, dateTo } = filter;
      let queryParams = '';

      if (searchInputName !== '' && searchSelectName !== '') {
        queryParams += `&${searchSelectName}=${searchInputName.trim()}`;
      }
      if (filter.searchRole) {
        queryParams += `&role=${filter.searchRole}`;
      }
      if (filter.searchState !== '') {
        queryParams += `&state=${filter.searchState}`;
      }
      if (filter.searchStatus !== '') {
        queryParams += `&status=${filter.searchStatus}`;
      }

      queryParams +=
        dateFrom !== '' ? '&from_time=' + dateString(dateFrom) : '';
      queryParams += dateTo !== '' ? '&to_time=' + dateString(dateTo) : '';

      set_loader(true);

      getApiCall(
        `store-admin/agent/agent/list?page=${page}&limit=${limit}${queryParams}`,
        (response) => {
          if (response.success) {
            console.log(response?.data?.agent);
            dispatch(
              updateState(ActionTypes.GET_AGENT_LIST, {
                agentList: response?.data?.agent,
              })
            );
            setrecordLength(response?.data?.agent?.length === limit ? 1 : 0);
            set_pageresponse(response.success);
            set_loader(false);
          } else {
            toast.error(response?.message);
            dispatch(
              updateState(ActionTypes.GET_AGENT_LIST, {
                agentList: [],
              })
            );
            set_pageresponse(response.success);
            set_loader(false);
          }
        }
      );
    } else {
      set_loader(false);
    }
  };

  const onClickSearch = () => {
    if (
      (filter.searchInputName !== '' &&
      filter.searchSelectName !== '' ) ||
      filter.searchRole !== '' ||
      filter.searchState !== '' ||
      filter.searchStatus ||
      (filter.dateTo !== '' && filter.dateTo !== '')
    ) {
      setPageNo(1);
      setReset(true);
      set_searchApiHit(!searchApiHit);
    }
  };
  const agentStatusChange = (agent_id) => {
    setBtnLoad(true);
    set_loader(true);
    patchApiCall(
      `store-admin/agent/change-status/${statusUserName.id}`,
      {},
      (response) => {
        if (response.success) {
          getAgentList(pageno);
          setBtnLoad(false);
          set_statuschange(false);
          set_loader(false);
        } else {
          toast.error(response?.message);
          setBtnLoad(false);
          set_loader(false);
          set_statuschange(false);
        }
      }
    );
  };
  const [approveAgentdet, set_approveAgentdet] = useState({});
  //  STATUS POPCONFIRM

  const [agentApprovemodal, set_agentApprovemodal] = useState(false);

  const approveAgentPopConfirm = (agent) => {
    set_agentApprovemodal(!agentApprovemodal);
    set_approveAgentdet({
      id: agent?.agent_id,
      name: agent?.name?.full === '' ? '' : agent?.name.full,
    });
  };

  const approveAgent = () => {
    setBtnLoad(true);
    // set_loader(true);
    patchApiCall(
      `store-admin/agent/approve-agent/${approveAgentdet.id}`,
      {},
      (response) => {
        if (response.success) {
          set_agentApprovemodal(false);
          getAgentList(pageno);
          setBtnLoad(false);
          set_statuschange(false);
          set_loader(false);
          toast.success(response?.message);
        } else {
          toast.error(response?.message);
          setBtnLoad(false);
          set_loader(false);
          set_statuschange(false);
        }
      }
    );
  };

  const searchOnChangeSelect = (e) => {
    setFilter({ ...filter, searchSelectName: e, searchInputName: '' });
    setDisable(false);
  };
  const searchOnchangeInput = (e) => {
    setFilter({ ...filter, searchInputName: e.target.value });
  };
  const searchOnrole = (value) => {
    setPageNo(1);
    setFilter({ ...filter, searchRole: value });
  };
  const searchOnstatus = (value) => {
    setPageNo(1);
    setFilter({ ...filter, searchStatus: value });
  };
  const searchOnstate = (value) => {
    setPageNo(1);
    setFilter({ ...filter, searchState: value });
  };

  const getRolelist = () => {
    getApiCall(`store-admin/agent/role-list/asm`, (response) => {
      if (response.success) {
        console.log(response.data.agents);
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
  // Filters --->
  const loadRecords = (page) => {
    setPageNo(page);
  };

  const [statuschange, set_statuschange] = useState(false);
  const [statusUserName, set_statusUserName] = useState({});
  const StatusPopconfirm = (agent) => {
    set_statuschange(true);
    set_statusUserName({
      id: agent?.agent_id,
      name: agent?.name.full === '' ? '' : agent?.name.full,
      status: agent?.status,
    });
  };

  const [btnLoad, setBtnLoad] = useState(false);

  const removeFilter = () => {
    setPageNo(1);
    setReset(false);
    setFilter({
      ...filter,
      searchInputName: '',
      searchSelectName: '',
      searchRole: '',
      searchStatus: '',
      searchState: '',
      dateFrom: '',
      dateTo: '',
    });
  };
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onClickSearch();
    }
  }
  return (
    <React.Fragment>
      {loading && <Loader />}
      <div className="page-content">
        {isAclList ? (
          <div className="container-fluid">
            <div className="row custom-filter">
              <div className="col-sm-6 col-lg-6 col-xl-3 mb-4">
                <PopConfirmModal
                  show={deleteModal}
                  size="sm"
                  msg={`Do You Want To Delete`}
                  username={subuserDeleteobj?.name}
                  isDisabled={btnLoad}
                  btntext={
                    btnLoad ? (
                      <>
                        <i className="fa fa-spinner fa-spin" />
                        <span className="ms-2">Loading</span>
                      </>
                    ) : (
                      'Delete Now'
                    )
                  }
                  btnclass={btnLoad ? 'btn btn-warning' : 'btn btn-danger'}
                  onButtonClick={agentDelete}
                  onCloseClick={() => setDeleteModal(false)}
                  lottie={deleteicon}
                />

                <PopConfirmModal
                  show={statuschange}
                  size="md"
                  msg={`Do You Want To Change The Status To ${textCapitalize(
                    statusUserName?.status === 'active' ? 'Deactive' : 'active'
                  )}`}
                  username={statusUserName?.name}
                  isDisabled={btnLoad}
                  btntext={
                    btnLoad ? (
                      <>
                        <i className="fa fa-spinner fa-spin" />
                        <span className="ms-2">Loading</span>
                      </>
                    ) : statusUserName?.status === 'active' ? (
                      'Deactive Now'
                    ) : (
                      'Active Now'
                    )
                  }
                  btnclass={
                    btnLoad
                      ? 'btn btn-warning'
                      : statusUserName?.status === 'active'
                      ? 'btn btn-danger'
                      : 'btn btn-success'
                  }
                  onButtonClick={agentStatusChange}
                  onCloseClick={() => set_statuschange(false)}
                  lottie={
                    statusUserName?.status === 'active'
                      ? userDeactive
                      : userActive
                  }
                />

                <PopConfirmModal
                  show={agentApprovemodal}
                  size="md"
                  msg={`Do You Want To Approve this Agent `}
                  username={approveAgentdet?.name}
                  btntext={'Approve Now'}
                  btnclass={'btn btn-success'}
                  onButtonClick={approveAgent}
                  onCloseClick={() => set_agentApprovemodal(false)}
                  lottie={userActive}
                />
                <InputGroupFilter
                  searchSelectName="searchSelectName"
                  searchSelectValue={filter.searchSelectName}
                  searchOptionData={searchOptionData}
                  Disabled={disable}
                  searchInputName="searchInputName"
                  searchInputValue={filter.searchInputName}
                  searchOnChangeSelect={searchOnChangeSelect}
                  searchOnchangeInput={searchOnchangeInput}
                  handleKeyDown={handleKeyDown}
                />
              </div>
              <div className="col-sm-6 col-lg-6 col-xl-2 mb-4">
                <DropdownFilter
                  dropdownLabel="Select Role"
                  dropdownPlaceholder="Select Role"
                  dropdownName="Select Role"
                  dropdownValue={filter?.searchRole}
                  dropdownData={roleData}
                  dropdownOnChange={searchOnrole}
                />
              </div>
              <div className="col-sm-6 col-lg-6 col-xl-3 mb-4">
                <DateRangeFilter
                  dateValue={[filter?.dateFrom, filter?.dateTo]}
                  handleOnDateChange={handleOnDateChange}
                  removeFilter={removeFilter}
                />
              </div>
              <div className="col-sm-6 col-lg-6 col-xl-2 mb-4">
                <DropdownFilter
                  dropdownLabel="Select State"
                  dropdownPlaceholder="Select State"
                  dropdownName="State"
                  dropdownValue={filter?.searchState}
                  dropdownData={StateData}
                  dropdownOnChange={searchOnstate}
                />
              </div>
              <div className="col-sm-6 col-lg-6 col-xl-2 mb-4">
                <DropdownFilter
                  dropdownLabel="Status"
                  dropdownPlaceholder="Select Status"
                  dropdownName="statusName"
                  dropdownValue={filter?.searchStatus}
                  dropdownData={statusData}
                  dropdownOnChange={searchOnstatus}
                />
              </div>
              <div className="col-sm-6 col-lg-6 col-xl-12 col-xxl-12 m-t-27 mb-4 text-center">
                <ButtonFilter
                  onClickSearch={onClickSearch}
                  removeFilter={removeFilter}
                />
              </div>
            </div>
            <div className="row mb-0">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="mb-3 row">
                      <div className="col-sm-6 my-3 my-sm-0 ">
                        <Label className="me-1">Show Records </Label>
                        <Select
                          style={{ Width: '80px' }}
                          value={limit}
                          onSelect={(event) => setLimit(parseInt(event))}
                        >
                          <Option value="25">25</Option>
                          <Option value="50">50</Option>
                          <Option value="100">100</Option>
                        </Select>
                      </div>
                      <div className="col-sm-6">
                        <div className="text-sm-end">
                          {isAclAdd ? (
                            <Link
                              to={'/agents/add'}
                              className="btn btn-primary"
                            >
                              <i className="mdi mdi-plus me-1" />
                              Add New Agent
                            </Link>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="table-rep-plugin">
                      <div
                        className="table-responsive"
                        data-pattern="priority-columns"
                        style={{
                          minHeight:
                            getAgents?.length === 1
                              ? '240px'
                              : getAgents?.length === 2
                              ? '280px'
                              : getAgents?.length === 3 || getAgents?.length === 4
                              ? '300px'
                              : getAgents?.length === 5
                              ? '340px'
                              : '',
                        }}
                      >
                        <Table className="table  table-borderless table-design">
                          <Thead>
                            <Tr>
                              <Th style={{ width: '50px' }}>S.No</Th>
                              <Th style={{ width: '150px', minWidth: '150px' }}>
                                <span>Created At</span>
                              </Th>
                              <Th style={{ width: '100px', minWidth: '100px' }}>
                                <span>Agent ID</span>
                              </Th>
                              <Th style={{ width: '140px', minWidth: '140px' }}>
                                <span>Agent Name</span>
                              </Th>

                              <Th style={{ width: '100px', minWidth: '100px' }}>
                                <span>Role</span>
                              </Th>
                              <Th style={{ width: '135px', minWidth: '135px' }}>
                                <span> Contact Number</span>
                              </Th>
                              <Th style={{ width: '120px', minWidth: '120px' }}>
                                <span> State</span>
                              </Th>
                              <Th style={{ width: '150px', minWidth: '150px' }}>
                                <span> Document Status</span>
                              </Th>
                              {isAclApproveAgent ? (
                                <Th
                                  style={{ width: '100px', minWidth: '100px' }}
                                >
                                  <span> Approval</span>
                                </Th>
                              ) : null}
                              {isAclClockIn ? (
                                <Th
                                  style={{ width: '100px', minWidth: '100px' }}
                                >
                                  <span>Is Clock In</span>
                                </Th>
                              ) : null}
                              {isAclstatus ? (
                                <Th style={{ width: '85px', minWidth: '85px' }}>
                                  <span> Status </span>
                                </Th>
                              ) : null}
                              {isAclmapAgent ||
                              isAclLocationMapping ||
                              isAclchangeRole ? (
                                <Th
                                  className="text-center"
                                  style={{ width: '60px', minWidth: '60px' }}
                                >
                                  <span> More </span>{' '}
                                </Th>
                              ) : null}
                              {isAclupdate || isAclDelete ? (
                                <Th
                                  className="text-center"
                                  style={{ width: '100px', minWidth: '50px' }}
                                >
                                  <span>Action</span>
                                </Th>
                              ) : null}
                            </Tr>
                          </Thead>
                          <Tbody>
                            {getAgents?.length > 0 ? (
                              getAgents?.map((agent, i) => (
                                <Tr>
                                  <Td>{pageno * limit - limit + (i + 1)}</Td>
                                  <Td>{showDateTime(agent?.createdAt)}</Td>
                                  <Td>
                                    {isAclDetail ? (
                                      <Link
                                        className="text-info"
                                        to={`/agents/details/${agent?.agent_id}`}
                                        target="_blank"
                                      >
                                        {agent?.agent_id}
                                      </Link>
                                    ) : (
                                      <span>{agent?.agent_id}</span>
                                    )}
                                  </Td>
                                  <Td>
                                    {agent?.name?.full?.length > 15 ? (
                                      <Tooltip title={agent?.name?.full}>
                                        {' '}
                                        {agent?.name?.full}
                                      </Tooltip>
                                    ) : (
                                      <span>{agent?.name?.full}</span>
                                    )}
                                  </Td>
                                  <Td>
                                    {agent?.role?.length > 12 ? (
                                      <Tooltip
                                        title={agent?.role
                                          ?.replace(/_/g, ' ')
                                          ?.toUpperCase()}
                                      >
                                        {agent?.role
                                          ?.replace(/_/g, ' ')
                                          ?.toUpperCase()}
                                      </Tooltip>
                                    ) : (
                                      agent?.role
                                        ?.replace(/_/g, ' ')
                                        ?.toUpperCase()
                                    )}
                                    <span></span>
                                  </Td>
                                  <Td>{agent?.phone?.national_number}</Td>
                                  <Td>{agent?.location?.state?.name}</Td>
                                  <Td>
                                    <span
                                      style={{
                                        padding: '5px 6px',
                                        minWidth: '80px',
                                      }}
                                      className={`badge font-size-12 d-inline-block
                                        ${
                                          agent?.documents?.status === 'pending'
                                            ? 'badge-soft-danger'
                                            : 'badge-soft-success'
                                        }`}
                                    >
                                      {textCapitalize(agent?.documents?.status)}
                                    </span>
                                  </Td>
                                  {isAclApproveAgent ? (
                                    <Td>
                                      {agent?.documents?.status === 'approved' ? (
                                        'Approved'
                                      ) : agent?.documents?.status ===
                                        'pending' ? (
                                        'Pending'
                                      ) : agent?.documents?.status ===
                                        'unfilled' ? (
                                        'unfilled'
                                      ) : agent?.documents?.status ===
                                        'updated' ? (
                                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                        <a
                                          onClick={() =>
                                            approveAgentPopConfirm(agent)
                                          }
                                          className="btn btn-success table-btn text-capitalize btn-sm"
                                        >
                                          Approve
                                        </a>
                                      ) : (
                                        ''
                                      )}
                                    </Td>
                                  ) : null}
                                  {isAclClockIn ? (
                                    <Td>
                                      {' '}
                                      {!agent?.is_allow_clockin ? (
                                        <button
                                          onClick={(e) =>
                                            clockinAgent(
                                              agent?.phone.national_number
                                            )
                                          }
                                          className="btn btn-success btn-sm table-btn text-capitalize"
                                        >
                                          Approve
                                        </button>
                                      ) : (
                                        'Allowed'
                                      )}
                                    </Td>
                                  ) : null}
                                  {isAclstatus ? (
                                    <Td>
                                      <button
                                        className={
                                          agent?.status === 'active'
                                            ? 'btn btn-success btn-sm '
                                            : 'btn btn-danger btn-sm '
                                        }
                                        onClick={() => StatusPopconfirm(agent)}
                                      >
                                        {agent?.status === 'active'
                                          ? 'Active'
                                          : 'Deactive'}
                                      </button>
                                    </Td>
                                  ) : null}
                                  {moreOption && (
                                    <Td className="text-center">
                                      <div className="dropdown custom-table-dropdown px-1">
                                        <span
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          <i
                                            className="mdi mdi-dots-vertical text-muted"
                                            style={{
                                              cursor: 'pointer',
                                              fontSize: '20px',
                                            }}
                                          />
                                        </span>

                                        <div className="dropdown-menu dropdown-menu-end">
                                          {agent?.role === 'agent' ||
                                          agent?.role === 'tl' ? (
                                            isAclmapAgent ? (
                                              <Link
                                                className={`dropdown-item ${
                                                  agent?.role === 'asm' ||
                                                  agent?.role ===
                                                    'branch_manager' ||
                                                  agent?.role ===
                                                    'regional_manager'
                                                    ? 'disabled'
                                                    : ''
                                                }`}
                                                onClick={() =>
                                                  agent_Toggle(
                                                    agent?.agent_id,
                                                    agent?.role
                                                  )
                                                }
                                              >
                                                Map Agent
                                              </Link>
                                            ) : (
                                              ' '
                                            )
                                          ) : (
                                            ''
                                          )}
                                          {isAclLocationMapping ? (
                                            <Link
                                              className="dropdown-item"
                                              onClick={() =>
                                                location_Toggle(agent?.agent_id)
                                              }
                                            >
                                              Map Location
                                            </Link>
                                          ) : (
                                            ''
                                          )}
                                          {isAclchangeRole
                                            ? ['agent', 'tl'].includes(
                                                agent?.role
                                              ) && (
                                                <Link
                                                  className="dropdown-item"
                                                  onClick={() =>
                                                    location_Toggl(
                                                      agent?.agent_id,
                                                      agent?.role
                                                    )
                                                  }
                                                >
                                                  Change Role
                                                </Link>
                                              )
                                            : ''}
                                        </div>
                                      </div>
                                    </Td>
                                  )}
                                  <Td className="text-center">
                                    {isAclupdate ? (
                                      <Tooltip title="Edit">
                                        <Link
                                          className="text-primary "
                                          onClick={() =>
                                            editToggle(
                                              JSON.stringify({
                                                agent_id: agent?.agent_id,
                                                agent_name: agent?.name?.full,
                                                phone:
                                                  agent?.phone?.national_number,
                                              })
                                            )
                                          }
                                        >
                                          <i className="bx bxs-edit font-size-18" />
                                        </Link>
                                      </Tooltip>
                                    ) : (
                                      ''
                                    )}

                                    {isAclDelete ? (
                                      <i
                                        title="Delete Sub User"
                                        onClick={() => deletePopconfirm(agent)}
                                        className="bx bxs-trash m-2  font-size-16"
                                        style={{
                                          cursor: 'pointer',
                                          color: '#da2b2b',
                                        }}
                                      />
                                    ) : null}
                                  </Td>
                                </Tr>
                              ))
                            ) : (
                              <Tr>
                                <Td
                                  style={{ textAlign: 'center' }}
                                  colSpan={colspan}
                                >
                                  No Data Found
                                </Td>
                              </Tr>
                            )}
                          </Tbody>
                        </Table>
                      </div>
                    </div>
                    <div className="w-100 justify-content-end d-flex">
                      <Pagination
                        handle={loadRecords}
                        list={recordsLength}
                        response={pageresponse}
                        currentpage={pageno}
                      ></Pagination>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <AccessRestricted />
        )}
      </div>
      <Modal
        isOpen={editModal}
        toggle={() => {
          toggle();
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Edit Agent
          </h5>
          <button
            type="button"
            onClick={() => setEditModal(false)}
            className="btn-close"
          ></button>
        </div>
        <div className="modal-body">
          <Formik
            initialValues={editValues}
            validationSchema={editSchema}
            onSubmit={editAgent}
          >
            {({ isSubmitting }) => (
              <Form className="row g-3 custom-form">
                <div className="mb-3">
                  <CustomInput
                    label="Agent Name"
                    type="text"
                    id="name"
                    placeholder="Enter name"
                    name="name"
                  />
                </div>
                <div className="mb-3">
                  <CustomInput
                    label="Phone Number"
                    type="text"
                    id="phone"
                    placeholder="Enter phone no"
                    name="phone"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
      <Modal
        isOpen={agent_Modal}
        toggle={() => {
          agent_Toggle();
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Map Agent
          </h5>
          <button
            type="button"
            onClick={() => setagent_Modal(false)}
            className="btn-close"
          ></button>
        </div>
        <div className="modal-body">
          <Formik
            initialValues={mapValues}
            validationSchema={MapSchema}
            onSubmit={mapAgent}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="row g-3 custom-form">
                {mapData.role !== 'asm' && (
                  <div className="mb-3">
                    <CustomSelect
                      label="Select ASM"
                      id="asm"
                      name="asm"
                      placeholder="Select ASM"
                      onSelect={(selectedValue) =>
                        handleChangeAsm(selectedValue)
                      }
                      onChange={(value) => setFieldValue('asm', value)}
                      showSearch
                      removeIcon
                    >
                      <Option value="" disabled>
                        Select ASM
                      </Option>
                      {asm_list.map((role, i) => (
                        <Option
                          value={JSON.stringify({
                            asm_name: role.name.full,
                            asm_id: role.agent_id,
                          })}
                          key={i}
                        >
                          {' '}
                          {role.name.full}
                        </Option>
                      ))}
                    </CustomSelect>
                  </div>
                )}
                {mapData.role !== 'tl' && mapData.role !== 'third_party' && (
                  <div className="mb-3">
                    <CustomSelect
                      label="Select TL"
                      id="tl"
                      name="tl"
                      placeholder="Select TL"
                      onChange={(value) => setFieldValue('tl', value)}
                      showSearch
                      removeIcon
                    >
                      <Option value="" disabled>
                        Select TL
                      </Option>
                      {tl_list?.map((role, i) => (
                        <Option
                          value={JSON.stringify({
                            tl_name: role?.name.full,
                            tl_id: role?.agent_id,
                          })}
                          key={i}
                        >
                          {' '}
                          {role?.name?.full}
                        </Option>
                      ))}
                    </CustomSelect>
                  </div>
                )}
                {mapData.role !== 'third_party' && (
                  <div className="mb-3">
                    <CustomSelect
                      label="Select Third Party"
                      id="thirdparty"
                      name="thirdparty"
                      placeholder="Select Third Party"
                      showSearch
                      removeIcon
                    >
                      <Option value="" disabled>
                        Select Third Party
                      </Option>
                      {third_party?.map((role, i) => (
                        <Option
                          value={JSON.stringify({
                            third_party_name: role?.name.full,
                            third_party_id: role?.agent_id,
                          })}
                          key={i}
                        >
                          {' '}
                          {role?.name?.full}
                        </Option>
                      ))}
                    </CustomSelect>
                  </div>
                )}

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setagent_Modal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
      <Modal
        isOpen={location_Moda}
        toggle={() => {
          location_Toggl();
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Change Role
          </h5>
          <button
            type="button"
            onClick={() => setlocation_Moda(false)}
            className="btn-close"
          ></button>
        </div>
        <div className="modal-body">
          <Formik
            initialValues={changedroleValue}
            validationSchema={changeroleschema}
            onSubmit={changeRole}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <div className="container-fluid">
                <Form className="row g-3 custom-form">
                  <div className="col-md-6">
                    <span>Current Role :</span>
                    <br />
                    <br />
                    <span> {role?.replace(/_/g, ' ').toUpperCase()}</span>
                  </div>
                  <div className="col-md-6">
                    <CustomSelect
                      label="Select Role"
                      id="role"
                      name="role"
                      placeholder="Select Role"
                      onSelect={(val) => handleRole(val, setFieldValue)}
                    >
                      <option value="">Select Role</option>
                      {(role === 'agent' || role === 'tl') && (
                        <option value="asm">Asm</option>
                      )}
                      {role === 'agent' && <option value="tl">TL</option>}
                    </CustomSelect>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={() => setlocation_Moda(false)}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                    >
                      Save
                    </button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </Modal>
      <Modal
        isOpen={location_Modal}
        toggle={() => {
          location_Toggle();
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Map Location
          </h5>
          <button
            type="button"
            onClick={() => setlocation_Modal(false)}
            className="btn-close"
          ></button>
        </div>
        <div className="modal-body">
          <Formik
            initialValues={locationvalues}
            validationSchema={LocationSchema}
            onSubmit={mapLocation}
          >
            {({ isSubmitting, setFieldValue }) => (
              <div className="conainer-fluid">
                <Form className="row g-3 custom-form">
                  <div className="col-md-6">
                    <CustomSelect
                      label="Select State"
                      id="state"
                      name="state"
                      placeholder="Select State"
                      onSelect={(selectedValue) =>
                        handleChangeState(selectedValue)
                      }
                      onChange={(value) => setFieldValue('state', value)}
                      showSearch
                      removeIcon
                    >
                      <Option value="" disabled>
                        Select State
                      </Option>
                      {state_list.map((state, i) => (
                        <Option
                          value={JSON.stringify({
                            code: state.code,
                            state_name: state.name,
                          })}
                          key={i}
                        >
                          {' '}
                          {state.name}
                        </Option>
                      ))}
                    </CustomSelect>
                  </div>
                  <div className="col-md-6">
                    <CustomSelect
                      label="Select City"
                      id="city"
                      name="city"
                      placeholder="Select City"
                      onChange={(value) => setFieldValue('city', value)}
                      showSearch
                      removeIcon
                    >
                      <Option value="" disabled>
                        Select City
                      </Option>
                      {city_list.map((city, i) => (
                        <Option
                          value={JSON.stringify({
                            code: city.code,
                            city_name: city.city,
                          })}
                          key={i}
                        >
                          {' '}
                          {city.city}
                        </Option>
                      ))}
                    </CustomSelect>
                  </div>
                  <div className="col-md-6">
                    <CustomInput
                      label="Flat No"
                      type="text"
                      id="flatno"
                      placeholder="Flat No"
                      name="flatno"
                    />
                  </div>
                  <div className="col-md-6">
                    <CustomInput
                      label="Street"
                      type="text"
                      id="street"
                      placeholder="Street"
                      name="street"
                    />
                  </div>
                  <div className="col-md-6">
                    <CustomInput
                      label="Area"
                      type="text"
                      id="area"
                      placeholder="Enter Area"
                      name="area"
                    />
                  </div>
                  <div className="col-md-6">
                    <CustomInput
                      label="Pin Code"
                      type="text"
                      id="pincode"
                      placeholder="Pin Code"
                      name="pincode"
                      maxlength="6"
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setlocation_Modal(false);
                      }}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                    >
                      Save
                    </button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </Modal>
    </React.Fragment>
  );
};
export default AgentList;

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
  const [StateData, setStateData] = useState([]);

  const [location_Moda, setlocation_Moda] = useState(false);
  const [agentId, setAgentId] = useState(null);
  const [role, setRole] = useState(null);

  const [location_Modal, setlocation_Modal] = useState(false);
  const location_Toggle = (agentId) => {
    setAgentId(agentId);
    setlocation_Modal(!location_Modal);
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
        actions.resetForm();
      } else {
        toast.info(response.message);
        actions.setSubmitting(false);
      }
    });
  };

  //meta title
  document.title = 'Users';
  const { Option } = Select;
  const { Agents } = useSelector((state) => state);
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
          } else {
            toast.error(response?.message);
            dispatch(
              updateState(ActionTypes.GET_AGENT_LIST, {
                agentList: [],
              })
            );
            set_pageresponse(response.success);

          }
        }
      );
    } else {
    
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
    patchApiCall(
      `store-admin/agent/change-status/${statusUserName.id}`,
      {},
      (response) => {
        if (response.success) {
          getAgentList(pageno);
          setBtnLoad(false);
          set_statuschange(false);
        } else {
          toast.error(response?.message);
          setBtnLoad(false);
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
          toast.success(response?.message);
        } else {
          toast.error(response?.message);
          setBtnLoad(false);
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
      {/* {loading && <Loader />} */}
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
    </React.Fragment>
  );
};
export default AgentList;

import React, { useEffect, useState } from 'react';
import { Tabs, TabPane, Modal } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Select, message, Popconfirm, Tooltip } from 'antd';
import { ActionTypes } from '../../redux/constants/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AccessRestricted } from '../../components/AccessDenied';
import {
  getApiCall,
  postApiCall,
  showDateTime,
  textCapitalize,
} from '../../helpers/utils';
import imageerror from '../../assets/images/broken_image.svg';
import { imagePath } from '../../ui/ImagePath';
import Loader from '../../components/Loader';
import { ImageViewer } from '../../components/ImageViewer';

const AgentDetails = () => {
  const { agentId } = useParams();

  //meta title
  document.title = 'Agent Details';
  useEffect(() => {
    getAgentDetails();
  }, []);
  const [loading, set_loader] = useState(true);

  const dispatch = useDispatch();
  const updateState = (actionType, value) => () => {
    dispatch({ type: actionType, payload: value });
    return Promise.resolve();
  };

  const { Acl } = useSelector((state) => state);
  const AgentAcl = Acl?.getWhitelistedRoutes?.Agents?.route_list;
  const isAclDetail = AgentAcl?.detail?.is_enabled || false;

  const { Agents } = useSelector((state) => state);
  const agent_details = Agents?.agent_details;
  console.log(agent_details);

  //USE EFFECT FOR EMPTY REDUX STATE
  useEffect(() => {
    dispatch(
      updateState(ActionTypes.GET_AGENTSTATE_LIST, {
        agent_details: {},
      })
    );
  }, []);
  const [isdataReady, setisdataReady] = useState(false);
  const getAgentDetails = async () => {
    getApiCall(`store-admin/agent/details/${agentId}`, (response) => {
      console.log(response?.data?.agent);
      if (response.success) {
        setisdataReady(true);
        dispatch(
          updateState(ActionTypes.GET_AGENTSTATE_LIST, {
            agent_details: response?.data?.agent,
          })
        );
        set_loader(false);
      } else {
        toast.error(response?.message);
        set_loader(false);
      }
    });
  };

  useEffect(() => {
    imgStorePath();
  }, [isdataReady]);
  const [SelfieImage, setSelfieImage] = useState('');
  const imgStorePath = () => {
    let a = agent_details?.agent_image || agent_details?.image;
    if (a) {
      let pattern = new RegExp('^(https?:\\/\\/)?', 'i');
      if (!!pattern.test(a)) {
        let data = {
          base_url: a,
        };
        postApiCall(`store-admin/admin/get-presigned-url`, data, (response) => {
          if (response) {
            console.log('ff', response);
            let image = response?.data?.base_url;
            setSelfieImage(image);
          } else {
            return '';
          }
        });
      } else {
        return agent_details.image_base_url + a;
      }
    }
  };

  const [OpenImageViewer, set_OpenImageViewer] = useState(false);
  const [viewImage, set_viewImage] = useState('');
  const [DocName, setDocName] = useState('');

  const ImgViewerModal = (e) => {
    set_viewImage(e.target.src);
    setDocName(e.target.name || 'image');
    const width = e.target.naturalWidth;
    if (width > 0) {
      set_OpenImageViewer(true);
    }
  };

  const handleCloseModal = () => {
    set_OpenImageViewer(false);
  };

  let navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const isbackButtonvisible = window.history.length > 1;
  return (
    <React.Fragment>
      {loading && <Loader />}
      {isAclDetail ? (
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div
                    className="card m-0"
                    style={{
                      background: '#DFEFFF',
                      borderBottomLeftRadius: '0px',
                      borderBottomRightRadius: '0px',
                    }}
                  >
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-8">
                          <div className="d-flex align-items-center">
                            <div className="pos_iconbk">
                              {/* <img src={imagePath("./posIcon.svg")} alt="" /> */}
                              <i className="bx bx-store-alt font-size-20" />
                            </div>

                            <div>
                              <span className="px-2">
                                Agent ID: <span>{agent_details?.agent_id}</span>
                              </span>
                            </div>
                          </div>
                          <div className="text-primary font-size-20 py-2 fw-bold">
                            {agent_details?.name?.full}
                          </div>
                          <div className="text-secondary">
                            {agent_details?.phone?.national_number === ''
                              ? ''
                              : agent_details?.phone?.national_number}
                          </div>
                        </div>
                        <div className="col-md-4 text-md-end">
                          <img
                            src={imagePath('./agent.png')}
                            alt=""
                            style={{ width: '110px', height: '110px' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between my-3">
                      <div className="card-title border-0">Agent Info</div>
                      {isbackButtonvisible && (
                        <button
                          className="back-btn"
                          type="button"
                          onClick={goBack}
                        >
                          <i className="bx bx-left-arrow-alt bx-flashing"></i>
                          Back
                        </button>
                      )}

                      {/* <Link to="/agents">
                      <button className="back-btn">
                        <i className="bx bx-left-arrow-alt bx-flashing"></i>
                        Back
                      </button>
                    </Link> */}
                    </div>
                    <div className="detail_bg_card">
                      <div className="row g-3">
                        <div className="col-md-4">
                          <div className="detail_title">Agent Name</div>
                          <div className="detail_desc">
                            {agent_details?.name?.full === ''
                              ? '-'
                              : textCapitalize(agent_details?.name?.full)}
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="detail_title">Current Role</div>
                          <div className="detail_desc">
                            {agent_details?.role?.length > 12 ? (
                              <Tooltip
                                title={agent_details?.role
                                  ?.replace(/_/g, ' ')
                                  ?.toUpperCase()}
                              >
                                {agent_details?.role
                                  ?.replace(/_/g, ' ')
                                  ?.toUpperCase()}
                              </Tooltip>
                            ) : (
                              agent_details?.role
                                ?.replace(/_/g, ' ')
                                ?.toUpperCase()
                            )}
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="detail_title">Mobile Number</div>
                          <div className="detail_desc">
                            {agent_details?.phone?.national_number === ''
                              ? '-'
                              : agent_details?.phone?.national_number}
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="detail_title">Address</div>
                          <div className="detail_desc">
                            {agent_details?.location && (
                              <>
                                <div className="address_line">
                                  <span className="value">
                                    {agent_details?.location?.flat_no && (
                                      <>
                                        {agent_details?.location.flat_no}
                                        {agent_details?.location.street_name !==
                                          '' &&
                                          ', ' +
                                            agent_details?.location.street_name}
                                        {agent_details?.location.area !== '' &&
                                          ', ' + agent_details?.location.area}
                                        {agent_details?.location?.pincode !==
                                          '' &&
                                          ', ' +
                                            agent_details?.location?.pincode}
                                      </>
                                    )}
                                  </span>
                                </div>
                                <div className="address_line">
                                  <span className="value">
                                    {agent_details?.location?.city?.name === ''
                                      ? ''
                                      : agent_details?.location?.city?.name +
                                        ','}
                                    {agent_details?.location?.state?.name === ''
                                      ? '-'
                                      : ', ' +
                                        agent_details?.location?.state?.name}
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="detail_title">
                            Agent Settlement Type
                          </div>
                          <div className="detail_desc">
                            {agent_details?.agent_settlement_type}
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="detail_title">Status</div>
                          <div className="detail_desc">
                            <span
                              style={{
                                padding: '5px 6px',
                                minWidth: '80px',
                              }}
                              className={`badge font-size-12 d-inline-block
                                        ${
                                          agent_details?.status === 'active'
                                            ? 'badge-soft-success'
                                            : 'badge-soft-danger'
                                        }`}
                            >
                              {textCapitalize(agent_details?.status)}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="detail_title">Created At</div>
                          <div className="detail_desc">
                            {showDateTime(agent_details?.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between my-3">
                      <div className="card-title border-0">Document Info</div>
                    </div>
                    <div className="detail_bg_card">
                      <div className="row g-3">
                        <div className="col-md-3">
                          <div className="detail_title">Aadhaar Name</div>
                          <div className="detail_desc">
                            {agent_details?.aadhaar_details?.name ||
                              'Not Updated'}
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="detail_title">Aadhaar DOB</div>
                          <div className="detail_desc">
                            {agent_details?.aadhaar_details?.dob ||
                              'Not Updated'}
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="detail_title">Aadhaar Details</div>
                          <div className="detail_desc">
                            Aadhaar No:{' '}
                            {agent_details?.documents?.aadhar?.number ||
                              'Not Updated'}
                          </div>
                        </div>
                        {agent_details?.aadhaar_details?.address && (
                          <div className="col-md-3">
                            <div className="detail_title">Aadhaar Address</div>
                            <div className="detail_desc">
                              Aadhaar Address:{' '}
                              {agent_details?.aadhaar_details?.address ||
                                'Not Updated'}
                            </div>
                          </div>
                        )}
                        <div className="col-md-3">
                          <div className="detail_title">Document Status</div>
                          <div className="detail_desc">
                            <span
                              style={{
                                padding: '5px 6px',
                                minWidth: '80px',
                              }}
                              className={`badge font-size-12 d-inline-block
                                        ${
                                          agent_details?.documents?.status ===
                                          'pending'
                                            ? 'badge-soft-danger'
                                            : 'badge-soft-success'
                                        }`}
                            >
                              {textCapitalize(agent_details?.documents?.status)}
                            </span>
                            {''}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between my-3">
                      <div className="card-title border-0">Reference Info</div>
                    </div>
                    <div className="detail_bg_card">
                      <div className="row g-3">
                        <div className="col-md-4">
                          <div className="detail_title">ASM Information</div>
                          <div className="detail_desc px-3 mt-2">
                            ASM ID: {agent_details?.reference?.asm?.id || ''}{' '}
                            <br />
                            Name: {agent_details?.reference?.asm?.name || ''}
                          </div>
                        </div>
                        {agent_details?.reference?.tl.id && (
                          <div className="col-md-4 my-3">
                            <div className="detail_title px-3">
                              TL Information
                            </div>
                            <div className="detail_desc px-3 mt-2">
                              TL ID: {agent_details?.reference?.tl?.id || ''}{' '}
                              <br />
                              Name: {agent_details?.reference?.tl?.name || ''}
                            </div>
                          </div>
                        )}
                        {agent_details?.reference?.third_party.id && (
                          <div className="col-md-4 my-3">
                            <div className="detail_title px-3">
                              Third Party Information
                            </div>
                            <div className="detail_desc px-3 mt-2">
                              Third Party ID:{' '}
                              {agent_details?.reference?.third_party?.id || ''}{' '}
                              <br />
                              Name:{' '}
                              {agent_details?.reference?.third_party?.name ||
                                ''}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row g-2">
                      <div className="col-12 mb-0 mt-0">
                        <div className="info-detail">Agent Selfie</div>
                      </div>
                      <div className="detail_bg_card">
                        <div
                          className=" store_img_frame"
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          {agent_details?.image_base_url &&
                          agent_details?.agent_image ? (
                            <img
                              src={SelfieImage}
                              onError={(e) =>
                                (e.target.alt = 'Failed to load the image')
                              }
                              className="img-fluid"
                              name="Agent Selfie Image"
                              onClick={ImgViewerModal}
                              alt="error"
                            />
                          ) : (
                            <img
                              src={imageerror}
                              className="img-fluid"
                              style={{
                                width: '150px',
                                height: '150px',
                                boxShadow:
                                  '0px 2px 8px rgba(128, 128, 128, 0.5)',
                              }}
                              alt=""
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AccessRestricted />
      )}
      {viewImage && (
        <ImageViewer
          imageUrl={viewImage}
          openModal={OpenImageViewer}
          toggle={handleCloseModal}
          imageInfo={DocName}
          imageName={DocName}
        />
      )}
    </React.Fragment>
  );
};

export default AgentDetails;

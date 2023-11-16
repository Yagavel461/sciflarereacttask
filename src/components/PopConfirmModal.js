// import PropTypes from 'prop-types'
import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Lottie from 'lottie-react';
import { Form, Formik } from 'formik';
import {
  CustomInput,
  CustomDateFilterWithDisable,
  CustomSelect,
} from '../ui/Formik-Yup/customForm';
import { Select } from 'antd';
const { Option } = Select;
export const PopConfirmModal = ({
  msg,
  size,
  btnclass,
  username,
  iconimg,
  lottie,
  show,
  btntext,
  onButtonClick,
  onCloseClick,
  isDisabled,
}) => {
  return (
    <Modal size={size} isOpen={show} toggle={onCloseClick} centered={true}>
      <div className="modal-content">
        <ModalBody className="px-4 py-5 text-center">
          <button
            type="button"
            onClick={onCloseClick}
            className="btn-close position-absolute end-0 top-0 m-3"
          ></button>
          <Lottie className="popupicon" animationData={lottie} />
          <img src={iconimg} alt="" />
          <p className="text-muted font-size-16 m-1">{msg}</p>
          <p className="font-size-16 text-info">{username}</p>
          <div className="hstack gap-2 justify-content-center mb-0">
            <button
              type="button"
              disabled={isDisabled}
              className={btnclass}
              onClick={onButtonClick}
            >
              {btntext}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCloseClick}
            >
              Close
            </button>
          </div>
        </ModalBody>
      </div>
    </Modal>
  );
};

export const DeliveryPopConfirmModal = ({
  msg,
  size,
  imagePath,
  btnclass,
  username,
  iconimg,
  lottie,
  show,
  btntext,
  onButtonClick,
  onCloseClick,
  isDisabled,
  initialValues,
  delivery_status,
  courierPartners,
  validationSchema,
}) => {
  return (
    <Modal size={size} isOpen={show} toggle={onCloseClick} centered={true}>
      <div className="modal-content">
        <ModalBody className="px-4 py-5 ">
          <button
            type="button"
            onClick={onCloseClick}
            className="btn-close position-absolute end-0 top-0 m-3"
          ></button>

          {delivery_status !== 'pending' && (
            <>
              <img src={imagePath} alt="" />
              <img src={iconimg} alt="" />
              <p className="text-muted font-size-16 m-1 text-center">{msg}</p>
            </>
          )}

          <p className="font-size-16 text-info">{username}</p>
          {delivery_status === 'pending' && (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onButtonClick}
            >
              {({ isSubmitting, setFieldValue }) => (
                <div className="conainer-fluid">
                  <Form className="row g-3 custom-form">
                    <div className="col-sm-12">
                      <CustomInput
                        label="Tracking ID"
                        type="text"
                        id="tracking_id"
                        placeholder="Enter Tracking ID"
                        name="tracking_id"
                      />
                    </div>
                    <div className="col-sm-13">
                      <CustomSelect
                        label="Courier Status"
                        id="courier_status"
                        name="courier_status"
                        placeholder="Select Courier Status"
                        onChange={(value) => setFieldValue('courier_status', value)}
                        showSearch
                        removeIcon
                      >   
                      <Option
                        value=""
                        >
                          {' '}
                         Select Courier Status
                        </Option>  
                 
                        <Option
                        value="dispatched"
                        >
                          {' '}
                         Dispatched
                        </Option>
                        <Option
                        value="intransit"
                        >
                          {' '}
                         Intransit
                        </Option>
                        <Option
                        value="delivered"
                        >
                          {' '}
                         Delivered
                        </Option>
                      </CustomSelect>
                    </div>
                    <div className="col-sm-13">
                      <CustomSelect
                        label="Courier Partner"
                        id="courier_partner"
                        name="courier_partner"
                        placeholder="Select Courier Partner"
                        onChange={(value) => setFieldValue('courier_partner', value)}
                        showSearch
                        removeIcon
                      >   
                       <Option
                        value=""
                        >
                          {' '}
                         Select Courier Partner
                        </Option>    
                       {courierPartners?.map((partner, i) => (
                        <Option
                        value={JSON.stringify({
                          partner_id: partner?.courier_partner_id,
                          partner_name: partner?.name
                        })}
                        >
                          {' '}
                          {partner?.name}
                        </Option>
                      ))}
                      </CustomSelect>
                    </div>
                    <div className="col-sm-12">
                      <CustomInput
                        label="Tracking Link "
                        type="text"
                        id="tracking_link"
                        placeholder="Enter tracking Link"
                        name="tracking_link"
                      />
                    </div>
                    <div className="col-sm-12">
                      <CustomInput
                        label="Courier ID "
                        type="text"
                        id="courier_id"
                        placeholder="Enter Courier ID"
                        name="courier_id"
                      />
                    </div>
                    <div className="col-sm-12">
                      <CustomDateFilterWithDisable
                        label="Expected delivery date"
                        type="text"
                        id=""
                        placeholder="Enter delivery date"
                        name="expected_delivery_date"
                        onChange={(value) => {
                          setFieldValue('expected_delivery_date', value);
                        }}
                        format="DD-MM-YYYY"
                      />
                    </div>
                    <div className="col-12 d-flex justify-content-end">
                      <div className="hstack gap-2 justify-content-center mb-0">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-primary"
                        >
                          {btntext}
                        </button>

                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={onCloseClick}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>
          )}
          {delivery_status !== 'pending' && (
            <div className="hstack gap-2 justify-content-center mb-0">
              <button
                type="button"
                disabled={isDisabled}
                className={btnclass}
                onClick={onButtonClick}
              >
                {btntext}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCloseClick}
              >
                Close
              </button>
            </div>
          )}
        </ModalBody>
      </div>
    </Modal>
  );
};

export const ApprovalPopConfirm = ({
  headermsg,
  msg,
  iconimg,
  username,
  lottie,
  show,
  btntext,
  onCloseClick,
}) => {
  return (
    <Modal size="md" isOpen={show} toggle={onCloseClick} centered={true}>
      <div className="modal-content">
        <ModalHeader style={{ background: '#f4f4f4' }}>
          <h5 className="mb-0">{headermsg}</h5>
          <button
            type="button"
            onClick={onCloseClick}
            className="btn-close position-absolute end-0 top-0 mt-2 me-2"
          />
        </ModalHeader>
        <ModalBody className="px-4 py-5 text-center">
          <Lottie className="popupicon" animationData={lottie} />
          <img className="pb-3" src={iconimg} alt="" />
          <p className="font-size-16 text-info mb-1">{username}</p>
          <p className="text-muted font-size-16 mb-4">{msg}</p>
          <div className="hstack gap-2 justify-content-center mb-0">
            {/* <button type="button" className="btn btn-danger" onClick={onDeleteClick}>{btntext}</button> */}
            <button
              type="button"
              className="btn btn-outline-primary w-lg"
              onClick={onCloseClick}
            >
              DONE
            </button>
          </div>
        </ModalBody>
      </div>
    </Modal>
  );
};

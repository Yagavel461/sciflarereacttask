import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { downloadImage } from '../../helpers/utils';

export const ImageViewer = ({
  imageUrl,
  openModal,
  toggle,
  imageInfo,
  imgDownload,
  imageName,
}) => {
  const [rotationAngleModal, setRotationAngleModal] = useState(0);
//   console.log(rotationAngleModal, 'aaa');

  const rotateRight = () => {
    setRotationAngleModal((prevAngle) => (prevAngle + 90) % 360);
  };

  const rotateLeft = () => {
    setRotationAngleModal((prevAngle) => (prevAngle - 90) % 360);
  };

  useEffect(() => {
    if (openModal === false) {
      setRotationAngleModal(0);
    }
  }, [openModal]);

  return (
    <>
      <Modal
        className="imageviewer"
        isOpen={openModal}
        toggle={toggle}
        centered
        size="lg"
      >
        <ModalHeader toggle={toggle}>
          {imageInfo.replace(/-/g, ' ') || 'Image Viewer'}
        </ModalHeader>
        <ModalBody>
          <div
            className={`d-flex justify-content-center align-items-center ${
              rotationAngleModal === 90 ||
              rotationAngleModal === 270 ||
              rotationAngleModal === -90 ||
              rotationAngleModal === -270
                ? 'image-rotate'
                : ''
            }`}
          >
            <img
              src={imageUrl}
              style={{
                transform: `rotate(${rotationAngleModal}deg)`,
                maxWidth: '550px',
                maxHeight: '650px',
                objectFit: 'contain',
              }}
              alt="Error"
            />
          </div>
        </ModalBody>
        <ModalFooter
          className={imgDownload && 'd-flex justify-content-between'}
        >
          <span>
            <Button
              color="primary me-2 "
              size="sm"
              title="Rotate Left"
              onClick={rotateLeft}
            >
              <i className="bi bi-arrow-counterclockwise font-size-18 "></i>
            </Button>
            <Button
              color="primary"
              size="sm"
              title="Rotate Right"
              onClick={rotateRight}
            >
              <i className="bi bi-arrow-clockwise font-size-18"></i>
            </Button>
          </span>
          <span>
            {imgDownload && (
              <Button
                color="primary ms-2 "
                size="sm"
                title="Download Now"
                onClick={() => downloadImage(imageUrl, `${imageName}.png`)}
              >
                <i className="bx bx-download bx-flashing  font-size-18 py-1"></i>
              </Button>
            )}
          </span>
        </ModalFooter>
      </Modal>
    </>
  );
};

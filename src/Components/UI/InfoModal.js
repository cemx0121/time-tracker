import { useState, forwardRef, useImperativeHandle } from "react";
import { Modal } from "react-bootstrap";
import styles from "./InfoModal.module.css";

const InfoModal = forwardRef(({ modalTitle, modalBody }, ref) => {
  const [isShown, setIsShown] = useState(false);

  const show = () => {
    setIsShown(true);
  };

  const hide = () => {
    setIsShown(false);
  };

  useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  return (
    <Modal className={styles.modal} show={isShown} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalBody}</Modal.Body>
    </Modal>
  );
});

export default InfoModal;

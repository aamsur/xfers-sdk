import React from 'react';
import PropTypes from 'prop-types';
import BootstrapModal from 'react-bootstrap/lib/Modal';
import classes from './Modal.scss';
import cx from 'classnames';

import { CloseButton } from 'XfersComponents'

const componentPropTypes = {
  customClass: PropTypes.string,
  header: PropTypes.node,
  body: PropTypes.node,
  footer: PropTypes.node,
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  showExitOnBody: PropTypes.bool,
  backHandler: PropTypes.func,
  center: PropTypes.bool,
}

const componentDefaultProps = {
  customClass: '',
  center: false,
}


function Modal({
  header,
  body,
  children,
  footer,
  showModal,
  closeModal,
  customClass,
  showExitOnBody,
  backHandler,
  center,
}) {

  let modalClass = cx(customClass, classes.modal, {[classes.center]: center});

  const close = (event) => {
    if (event) {
      event.preventDefault();
    }
    closeModal();
  }

  return (
    <BootstrapModal dialogClassName={modalClass} show={showModal} onHide={close}>
      {header &&
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title className="heading">
            {header}
          </BootstrapModal.Title>
        </BootstrapModal.Header>
      }

      <BootstrapModal.Body>
        {showExitOnBody && <CloseButton customClass={classes.closeBtn} onClick={close} />}
        {body || children}
      </BootstrapModal.Body>

      {footer &&
        <BootstrapModal.Footer>
          {footer}
        </BootstrapModal.Footer>
      }
    </BootstrapModal>
  );
}

Modal.propTypes = componentPropTypes;
Modal.defaultProps = componentDefaultProps;

export default Modal;

import React from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";

const AlertDismissible = ({ message, onClose }) => {
  return (
    <Alert
      variant="info"
      className="w-100"
      onClose={onClose}
      hidden={!message}
      dismissible
    >
      {message}
    </Alert>
  );
};

AlertDismissible.propTypes = {
  message: PropTypes.string.isRequired,
};

export default AlertDismissible;

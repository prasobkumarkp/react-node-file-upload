import React from "react";
import PropTypes from "prop-types";
import { ProgressBar } from "react-bootstrap";

const Progress = ({ percentage, isFailed = false }) => {
  return (
    <ProgressBar
      className="w-100"
      animated
      variant={isFailed ? "danger" : "success"}
      label={`${percentage} %`}
      now={percentage}
    />
  );
};

Progress.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default Progress;

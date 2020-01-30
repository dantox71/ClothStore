import React from "react";
import PropTypes from "prop-types";

const AlertItem = ({ alert }) => {
  console.log(alert);
  return (
    <div className="alert">
      <i className="fas fa-exclamation-circle"></i> {alert.message}
    </div>
  );
};

AlertItem.propTypes = {};

export default AlertItem;

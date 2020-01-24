import React from "react";
import PropTypes from "prop-types";

const AlertItem = ({ alert }) => {
  console.log(alert);
  return (
    <div class="alert">
      <i class="fas fa-exclamation-circle"></i> {alert.message}
    </div>
  );
};

AlertItem.propTypes = {};

export default AlertItem;

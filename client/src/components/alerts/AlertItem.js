import React from "react";

const AlertItem = ({ alert }) => {
  return (
    <div className="alert">
      <i className="fas fa-exclamation-circle"></i> {alert.message}
    </div>
  );
};

export default AlertItem;

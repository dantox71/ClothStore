import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AlertItem from "./AlertItem";

const Alerts = ({ alerts }) => {
  return (
    <div className="alerts">
      {alerts.map(alert => (
        <AlertItem key={alert.id} alert={alert} />
      ))}
    </div>
  );
};

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alerts.alerts
});

export default connect(mapStateToProps, {})(Alerts);

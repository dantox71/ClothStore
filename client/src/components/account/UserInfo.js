import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const UserInfo = ({ auth: { user } }) => {
  return (
    <div className="profile-top">
      <img
        className="img-rounded"
        src={`${process.env.PUBLIC_URL}/uploads/images/users/${user.image}`}
        alt="User Avatar"
      />
      <div className="image-upload">
        <label className="d-flex-column">
          <i className="far fa-images fa-2x"> </i>
          <input type="file" name="file" />
        </label>
        <a href="#!" className="btn btn-primary">
          Click To Upload
        </a>
      </div>
      <h2> {user.name} </h2>
      <p>
        You have: <span className="text-bold"> $ {user.money} </span>
      </p>
      <div className="profile-buttons">
        <Link to="/edit-account" className="btn btn-primary">
          Edit Account
        </Link>
        <a href="remove-account.html" className="btn btn-primary">
          Remove Account
        </a>
      </div>
    </div>
  );
};

UserInfo.propTypes = {};

const mapStateToPropTypes = state => ({
  auth: state.auth
});

export default connect(mapStateToPropTypes, {})(UserInfo);

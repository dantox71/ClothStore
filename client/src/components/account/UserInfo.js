import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const UserInfo = ({ auth: { user } }) => {
  return (
    <div class="profile-top">
      <img
        class="img-rounded"
        src={`${process.env.PUBLIC_URL}/uploads/images/users/${user.image}`}
        alt="User Avatar"
      />
      <div class="image-upload">
        <label class="d-flex-column">
          <i class="far fa-images fa-2x"> </i>
          <input type="file" name="file" />
        </label>
        <a href="#!" class="btn btn-primary">
          Click To Upload
        </a>
      </div>
      <h2> {user.name} </h2>
      <p>
        You have: <span class="text-bold"> $ {user.money} </span>
      </p>
      <div class="profile-buttons">
        <Link to="/edit-account" class="btn btn-primary">
          Edit Account
        </Link>
        <a href="remove-account.html" class="btn btn-primary">
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

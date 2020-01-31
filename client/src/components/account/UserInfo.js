import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAccount } from "../../actions/account";

const UserInfo = ({ deleteAccount, auth: { user } }) => {
  const onAccountDelete = () => {
    if (
      window.confirm(
        "Are sure that you want to delete your account? This operation is ireversable and You will not be able to recover your account"
      )
    ) {
      deleteAccount();
    }
  };

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
        <a href="#!" className="btn btn-primary" onClick={onAccountDelete}>
          Remove Account
        </a>
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToPropTypes = state => ({
  auth: state.auth
});

export default connect(mapStateToPropTypes, { deleteAccount })(UserInfo);

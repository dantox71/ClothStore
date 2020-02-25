import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAccount } from "../../actions/account";
import { uploadUserPhoto } from "../../actions/account";

const UserInfo = ({ uploadUserPhoto, deleteAccount, auth: { user } }) => {
  const [image, setImage] = useState("");

  const onAccountDelete = () => {
    if (
      window.confirm(
        "Are sure that you want to delete your account? This operation is ireversable and You will not be able to recover your account"
      )
    ) {
      deleteAccount();
    }
  };

  const onPhotoChange = e => {
    setImage(e.target.files[0]);
  };

  const onPhotoUpload = e => {
    window.alert("I'm still working on this feature....");

    e.preventDefault();
    // const formData = new FormData();
    // formData.append("file", image);

    // uploadUserPhoto(formData);
  };

  return (
    <div className="profile-top">
      <img
        className="img-rounded"
        src={`${process.env.PUBLIC_URL}/uploads/images/users/${user.image}`}
        alt="User Avatar"
      />
      <form className="image-upload" onSubmit={onPhotoUpload}>
        <label className="d-flex-column">
          <i className="far fa-images fa-2x"> </i>
          <input type="file" onChange={onPhotoChange} />
        </label>
        <input
          type="submit"
          value="Click To Upload"
          className="btn btn-primary"
        />
      </form>
      <h2> {user.name} </h2>
      <p>
        You have: <span className="text-bold"> ${user.money} </span>
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
  deleteAccount: PropTypes.func.isRequired,
  uploadUserPhoto: PropTypes.func.isRequired
};

const mapStateToPropTypes = state => ({
  auth: state.auth
});

export default connect(mapStateToPropTypes, { uploadUserPhoto, deleteAccount })(
  UserInfo
);

import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { editAccountData, editAccountPassword } from "../../actions/account";
import { setAlert } from "../../actions/alerts";
import { clearError } from "../../actions/account";
import Loader from "../layout/Loader";

const EditAccount = ({
  editAccountData,
  editAccountPassword,
  setAlert,
  clearError,
  auth: { isAuthenticated, loading, user },
  account: { error }
}) => {
  useEffect(() => {
    if (error) {
      setAlert(error);
      clearError();
    }
  }, [error, setAlert, clearError]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    newPassword2: ""
  });

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  const { name, email, currentPassword, newPassword, newPassword2 } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  //Edit name & email
  const editData = e => {
    if (name === "" && name === "") {
      setAlert("Enter new name or email");
    } else if (name.length < 3) {
      setAlert("New name should be at least 3 characters long");
    } else {
      editAccountData({ name, email });

      setFormData({
        ...formData,
        email: "",
        name: ""
      });
    }

    e.preventDefault();
  };

  //Edit password
  const editPassword = e => {
    if (currentPassword === "" || newPassword === "") {
      setAlert("Please fill in all fields");
    } else if (newPassword !== newPassword2) {
      setAlert("New passwords doesn't match");
    } else if (newPassword.length < 7) {
      setAlert("Password should be at least 7 characters long");
    } else if (currentPassword === newPassword) {
      setAlert("New password is the same as old");
    } else {
      editAccountPassword({ currentPassword, newPassword });

      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        newPassword2: ""
      });
    }

    e.preventDefault();
  };

  return (
    <section id="edit-account">
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <form onSubmit={editData}>
            <div className="container">
              <h1> Edit Name & Email </h1>
              <div className="form-group">
                <input
                  type="text"
                  value={name}
                  onChange={onChange}
                  name="name"
                  placeholder="Enter New Name"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  name="email"
                  onChange={onChange}
                  placeholder="Enter New Email"
                />
              </div>
              <div className="form-group">
                <input type="submit" value="Edit" className="btn btn-primary" />
              </div>
            </div>
          </form>
          <form onSubmit={editPassword}>
            <div className="container">
              <h1> Edit Password </h1>
              <div className="form-group">
                <input
                  value={currentPassword}
                  type="password"
                  name="currentPassword"
                  onChange={onChange}
                  placeholder="Enter current password"
                />
              </div>
              <div className="form-group">
                <input
                  value={newPassword}
                  type="password"
                  name="newPassword"
                  onChange={onChange}
                  placeholder="Enter new password"
                />
              </div>
              <div className="form-group">
                <input
                  value={newPassword2}
                  type="password"
                  name="newPassword2"
                  onChange={onChange}
                  placeholder="confirm new password"
                />
              </div>
              <div className="form-group">
                <input type="submit" value="Edit" className="btn btn-primary" />
              </div>
            </div>
          </form>
        </Fragment>
      )}
    </section>
  );
};

EditAccount.propTypes = {
  editAccountData: PropTypes.func.isRequired,
  editAccountPassword: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  account: state.account
});

export default connect(mapStateToProps, {
  editAccountData,
  editAccountPassword,
  setAlert,
  clearError
})(EditAccount);

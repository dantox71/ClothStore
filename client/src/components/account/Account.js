import React from "react";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loader from "../layout/Loader";

const Account = ({ auth: { user, isAuthenticated, loading } }) => {
  if (!isAuthenticated && !loading) {
    return <Redirect to="/login" />;
  }

  return (
    <section id="profile">
      <div class="container">
        {" "}
        {loading ? (
          <Loader />
        ) : (
          <div class="profile-top">
            <img
              class="img-rounded"
              src={`${process.env.PUBLIC_URL}/images/users/${user.image}`}
              alt="User Avatar"
            />
            <div class="image-upload">
              <label class="d-flex-column">
                <i class="far fa-images fa-2x"> </i>{" "}
                <input type="file" name="file" />
              </label>{" "}
              <a href="#!" class="btn btn-primary">
                Click To Upload{" "}
              </a>{" "}
            </div>
            <h2> {user.name} </h2>{" "}
            <p>
              You have: <span class="text-bold"> $ {user.money} </span>{" "}
            </p>
            <div class="profile-buttons">
              <a href="edit-account.html" class="btn btn-primary">
                Edit Account{" "}
              </a>{" "}
              <a href="remove-account.html" class="btn btn-primary">
                Remove Account{" "}
              </a>{" "}
            </div>{" "}
          </div>
        )}{" "}
      </div>{" "}
    </section>
  );
};

Account.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(Account);

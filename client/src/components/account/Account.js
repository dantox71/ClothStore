import React, { Fragment } from "react";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loader from "../layout/Loader";
import UserItems from "../items/UserItems";
import UserInfo from "./UserInfo";
import AddItem from "../items/AddItem";

const Account = ({ auth: { user, isAuthenticated, loading } }) => {
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <section id="profile">
      <div class="container">
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <UserInfo />
            <AddItem />
            <UserItems />
          </Fragment>
        )}
      </div>
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

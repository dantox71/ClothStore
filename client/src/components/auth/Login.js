import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login, clearError } from "../../actions/auth";
import { setAlert } from "../../actions/alerts";

const Login = ({
  login,
  setAlert,
  clearError,
  auth: { isAuthenticated, error }
}) => {
  useEffect(() => {
    if (error) {
      setAlert(error);
      clearError();
    }
  }, [error]);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  //Redirect if authenticated
  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  const { email, password } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    if (email === "" || password === "") {
      setAlert("Please fill in all fields");
    } else {
      login(formData);
    }

    e.preventDefault();
  };

  return (
    <section id="register">
      <form onSubmit={onSubmit}>
        <div className="container">
          <h1> Log In </h1>
          <div className="form-group">
            <input
              type="email"
              name="email"
              onChange={onChange}
              value={email}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <span>
              Don 't have an account yet ?
              <Link to="/register" className="text-bold">
                Register now!
              </Link>
            </span>

            <input type="submit" value="Login" className="btn btn-primary" />
          </div>
        </div>
      </form>
    </section>
  );
};

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { login, setAlert, clearError })(Login);

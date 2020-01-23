import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ register, auth: { isAuthenticated } }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  //Redirect if authenticated
  if (isAuthenticated) {
    // return <Redirect to="/login" />; REDIRECT TO HOMEPAGE
  }

  const { name, email, password, password2 } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    if (name === "" || email === "" || password === "" || password2 === "") {
      console.log("please fill in all required fields");
    } else if (password !== password2) {
      console.log("Password does not match");
    }

    register(formData);

    e.preventDefault();
  };

  return (
    <section id="register">
      <form onSubmit={onSubmit}>
        <div className="container">
          <h1> Register Account </h1>{" "}
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
            />
          </div>
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
            <input
              type="password"
              name="password2"
              onChange={onChange}
              value={password2}
              placeholder="Confirm your password"
            />
          </div>
          <div className="form-group">
            <span>
              Already Have an account ?
              <Link to="/login" className="text-bold">
                {" "}
                Login now!
              </Link>
            </span>
            <input type="submit" value="Register" className="btn btn-primary" />
          </div>
        </div>
      </form>
    </section>
  );
};

Register.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  register: PropTypes.func.isRequired
});

export default connect(mapStateToProps, { register })(Register);

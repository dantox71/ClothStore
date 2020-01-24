import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import cart from "./cart.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, user, loading }, logout }) => {
  const [menuOpened, toggleMenu] = useState(false);

  const guestLinks = (
    <Fragment>
      <li>
        <Link
          to="/login"
          className="btn btn-primary"
          onClick={() => toggleMenu(!menuOpened)}
        >
          Login{" "}
        </Link>{" "}
      </li>
      <li>
        <Link
          to="/register"
          className="btn btn-primary"
          onClick={() => toggleMenu(!menuOpened)}
        >
          Register{" "}
        </Link>{" "}
      </li>{" "}
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <li>
        <Link to="/profile" onClick={() => toggleMenu(!menuOpened)}>
          Welcome <span className="text-bold ml-1"> {user && user.name} </span>{" "}
        </Link>{" "}
      </li>{" "}
      <li>
        <Link to="/store"> Store </Link>{" "}
      </li>{" "}
      <li>
        <Link to="/cart" className="shopping-cart-link">
          <img src={cart} alt="Cart Icon" />
          <span className="item-counter">
            {" "}
            {user && user.cart.length}{" "}
          </span>{" "}
        </Link>{" "}
      </li>{" "}
      <li>
        <Link to="/login" onClick={() => logout()}>
          Logout <i className="fa fa-sign-out-alt"> </i>{" "}
        </Link>{" "}
      </li>{" "}
    </Fragment>
  );

  return (
    <nav id="main-navigation" className={menuOpened ? "opened" : ""}>
      <div className="container">
        <Link to="/store">
          <h1 className="brand"> ClothStore </h1>{" "}
        </Link>{" "}
        <ul className="nav-list">
          {" "}
          {isAuthenticated && !loading ? authLinks : guestLinks}{" "}
        </ul>
        <ul className="mobile-nav-buttons">
          {user && (
            <Fragment>
              <li>
                <Link to="/cart" className="shopping-cart-link">
                  <span className="item-counter"> {user.cart.length} </span>
                  <img src={cart} alt="Cart Icon" />
                </Link>
              </li>
            </Fragment>
          )}
          <li>
            <a
              href="#!"
              className="mobile-menu-toggler"
              onClick={() => toggleMenu(!menuOpened)}
            >
              <span className="line"> </span>{" "}
            </a>{" "}
          </li>{" "}
        </ul>{" "}
      </div>{" "}
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);

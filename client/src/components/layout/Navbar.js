import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import cartIcon from "./cart.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { getCartItems } from "../../actions/cart";

const Navbar = ({ auth: { isAuthenticated, user, loading, cart }, logout }) => {
  useEffect(() => {
    getCartItems();
  }, []);

  const [menuOpened, toggleMenu] = useState(false);

  const onLogout = () => {
    if (
      window.confirm(
        "Are you sure that you want to logout ? It will clear items in your cart"
      )
    ) {
      logout();
      toggleMenu(!menuOpened);
    }
  };

  const guestLinks = (
    <Fragment>
      <li>
        <Link
          to="/login"
          className="btn btn-primary"
          onClick={() => toggleMenu(!menuOpened)}
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          to="/register"
          className="btn btn-primary"
          onClick={() => toggleMenu(!menuOpened)}
        >
          Register
        </Link>
      </li>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <li>
        <Link to="/me" onClick={() => toggleMenu(!menuOpened)}>
          My Account
        </Link>
      </li>
      <li>
        <Link to="/" onClick={() => toggleMenu(!menuOpened)}>
          Home
        </Link>
      </li>
      <li>
        {isAuthenticated && (
          <Link
            to="/cart"
            className="shopping-cart-link"
            onClick={() => toggleMenu(!menuOpened)}
          >
            <img src={cartIcon} alt="Cart Icon" />
            <span className="item-counter"> {cart.length} </span>
          </Link>
        )}
      </li>
      <li>
        <Link to="/login" onClick={onLogout}>
          Logout <i className="fa fa-sign-out-alt"> </i>
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav id="main-navigation" className={menuOpened ? "opened" : ""}>
      <div className="container">
        <Link
          to="/"
          onClick={() => {
            if (menuOpened) {
              toggleMenu(!menuOpened);
            }
          }}
        >
          <h1 className="brand">
            <span className="text-bold"> Cloth </span> <i> Store </i>
          </h1>
        </Link>
        <ul className="nav-list">
          {isAuthenticated && !loading ? authLinks : guestLinks}
        </ul>
        <ul className="mobile-nav-buttons">
          {user && (
            <Fragment>
              <li>
                <Link
                  to="/cart"
                  onClick={() => {
                    if (menuOpened) {
                      toggleMenu(!menuOpened);
                    }
                  }}
                  className="shopping-cart-link"
                >
                  <span className="item-counter"> {cart.length} </span>
                  <img src={cartIcon} alt="Cart Icon" />
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
              <span className="line"> </span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  getCartItems: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout, getCartItems })(Navbar);

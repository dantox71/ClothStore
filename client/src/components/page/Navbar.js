import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import cart from "./cart.svg";

const Navbar = ({ auth: { isAuthenticated, user, loading } }) => {
  const [menuOpened, toggleMenu] = useState(false);

  const guestLinks = (
    <Fragment>
      <li>
        <a href="#!" class="btn btn-primary">
          Login{" "}
        </a>
      </li>

      <li>
        <a href="#!" class="btn btn-primary">
          Register
        </a>
      </li>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <li>
        <a href="#!">
          Welcome <span class="text-bold ml-1">{user && user.name}</span>
        </a>
      </li>
      <li>
        <a href="#!">Home</a>
      </li>
      <li>
        <a href="cart.html" class="shopping-cart-link">
          <img src={cart} alt="Cart Icon" />
          <span class="item-counter">1</span>
        </a>
      </li>
      <li>
        <a href="login.html">
          Logout <i class="fa fa-sign-out-alt"></i>
        </a>
      </li>
    </Fragment>
  );

  return (
    <nav id="main-navigation" className={menuOpened ? "opened" : ""}>
      <div class="container">
        <a href="index.html">
          <h1 class="brand">ClothStore</h1>
        </a>
        <ul class="nav-list">
          {isAuthenticated && !loading ? authLinks : guestLinks}
        </ul>

        <ul class="mobile-nav-buttons">
          <li>
            <a href="#!" class="shopping-cart-link">
              <span class="item-counter">1</span>
              <img src={cart} alt="Cart Icon" />
            </a>
          </li>
          <li>
            <a
              href="#!"
              class="mobile-menu-toggler"
              onClick={() => toggleMenu(!menuOpened)}
            >
              <span class="line"></span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(Navbar);

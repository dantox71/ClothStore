import React, { useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "../layout/Loader";
import { connect } from "react-redux";
import { getCartItems, buyItemsInCart } from "../../actions/cart";
import CartItem from "./CartItem";

const Cart = ({
  getCartItems,
  buyItemsInCart,
  cart: { items, loading },
  auth: { isAuthenticated }
}) => {
  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  const calculateTotalToPay = items => {
    const sum = items.reduce((a, b) => a + b.price, 0);

    return sum;
  };

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  const onBuyCartItems = () => {
    if (window.confirm("Are you sure you want to buy items in Your cart?")) {
      buyItemsInCart();
    }
  };

  return (
    <section id="cart">
      <div className="container">
        <h1>Items In Your Cart</h1>

        {loading ? (
          <Loader />
        ) : items.length > 0 ? (
          items.map(item => <CartItem key={item._id} item={item} />)
        ) : (
          <p>Your cart is empty</p>
        )}

        <div className="cart-bottom">
          <p>
            Total:{" "}
            <span className="text-bold">${calculateTotalToPay(items)}</span>
          </p>
          <Link to="/cart" className="btn btn-primary" onClick={onBuyCartItems}>
            Buy
          </Link>
        </div>
      </div>
    </section>
  );
};

Cart.propTypes = {
  getCartItems: PropTypes.func.isRequired,
  buyItemsInCart: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cart: state.cart,
  auth: state.auth
});

export default connect(mapStateToProps, { getCartItems, buyItemsInCart })(Cart);

import React, { useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "../layout/Loader";
import { connect } from "react-redux";
import { getCartItems, buyItemsInCart, clearCart } from "../../actions/cart";
import CartItem from "./CartItem";

const Cart = ({
  clearCart,
  getCartItems,
  buyItemsInCart,
  auth: { isAuthenticated, cart, loading }
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
    if (window.confirm("Are You sure You want to buy items in Your cart?")) {
      buyItemsInCart();
    }
  };

  const onClearCart = () => {
    if (window.confirm("Are You sure You want to clear Your cart?")) {
      clearCart();
    }
  };

  return (
    <section id="cart">
      <div className="container">
        <h1> Items In Your Cart </h1>
        {loading ? (
          <Loader />
        ) : cart.length > 0 ? (
          cart.map(cartItem => <CartItem key={cartItem._id} item={cartItem} />)
        ) : (
          <p> Your cart is empty </p>
        )}
        <div className="cart-bottom">
          <p>
            Total:
            <span className="text-bold"> $ {calculateTotalToPay(cart)} </span>
          </p>
          <Link to="/cart" className="btn btn-primary" onClick={onBuyCartItems}>
            Buy
          </Link>
          <Link to="/cart" className="btn btn-primary " onClick={onClearCart}>
            Clear Cart
          </Link>
        </div>
      </div>
    </section>
  );
};

Cart.propTypes = {
  getCartItems: PropTypes.func.isRequired,
  buyItemsInCart: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  getCartItems,
  buyItemsInCart,
  clearCart
})(Cart);

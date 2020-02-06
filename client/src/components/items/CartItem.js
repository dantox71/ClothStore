import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeItemFromCart } from "../../actions/cart";

const CartItem = ({ item, removeItemFromCart }) => {
  const onRemove = itemId => {
    if (window.confirm("Are you sure you want delete this item from cart?")) {
      removeItemFromCart(itemId);
    }
  };

  return (
    <div className="item">
      <img
        src={`${process.env.PUBLIC_URL}/uploads/images/items/${item.image}`}
        alt="Item Image"
      />
      <div className="item-description">
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <p>
          Price: <span className="text-bold">${item.price}</span>
        </p>

        <a
          href="#!"
          className="btn btn-primary"
          onClick={() => onRemove(item._id)}
        >
          Remove
        </a>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  removeItemFromCart: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

export default connect(null, { removeItemFromCart })(CartItem);

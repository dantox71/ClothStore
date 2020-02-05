import React from "react";
import PropTypes from "prop-types";

const CartItem = ({ item }) => {
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

        <a href="#!" className="btn btn-primary">
          Remove
        </a>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default CartItem;

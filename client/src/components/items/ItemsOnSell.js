import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getItemsOnSell } from "../../actions/items";
import cart from "../layout/cart.svg";
import { editItem } from "../../actions/items";
import Loader from "../layout/Loader";
import { addItemToCart } from "../../actions/cart";
import Testimionials from "../layout/Testimonials";
import Contact from "../layout/Contact";

const ItemsOnSell = ({
  getItemsOnSell,
  editItem,
  addItemToCart,
  items: { items, loading },
  auth: { user }
}) => {
  useEffect(() => {
    getItemsOnSell();
  }, [getItemsOnSell]);

  const itemStarRating = rate => {
    let elements = [];

    for (let i = 0; i < rate; i++) {
      elements.push(<i className="fa fa-star" key={i}></i>);
    }

    return elements;
  };

  const onAddItemToCart = itemId => {
    if (
      window.confirm("Are you sure that you want to add this item to cart?")
    ) {
      addItemToCart(itemId);
    }
  };

  return (
    <Fragment>
      <section id="items">
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <div className="container">
              {items.map(item => (
                <div className="item" key={item._id}>
                  <img
                    src={`${process.env.PUBLIC_URL}/uploads/images/items/${item.image}`}
                    alt="Item Image"
                    className="item-img"
                  />
                  <div className="item-menu">
                    <Link to="/cart" onClick={() => onAddItemToCart(item._id)}>
                      <img src={cart} alt="Cart Icon" />
                    </Link>
                    <div className="star-rating">
                      {itemStarRating(item.averageRating)}
                    </div>
                    <p className="text-gray">
                      Average Ratings:
                      <span className="text-bold">
                        {item.averageRating
                          ? item.averageRating
                          : "No ratings yet"}
                      </span>
                    </p>
                  </div>
                  <div className="item-info">
                    <h1> {item.name} </h1> <p> {item.description} </p>
                    <p>
                      Category:
                      <span className="text-bold"> {item.category} </span>
                    </p>
                    <p>
                      Price: <span className="text-bold"> $ {item.price} </span>
                    </p>
                    <div className="item-buttons">
                      <Link
                        to={`items/${item._id}`}
                        className="btn btn-primary"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination">
              <i className="fa fa-arrow-left"> </i>
              <span className="current"> 1 </span> <span> 2 </span>
              <span> 3 </span> <span> 4 </span> <span> 5 </span>
              <span> .... </span> <span> 12 </span>
              <i className="fa fa-arrow-right"> </i>
            </div>
          </Fragment>
        )}
      </section>
      <Testimionials />
      <Contact />
    </Fragment>
  );
};

ItemsOnSell.propTypes = {
  getItemsOnSell: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  items: state.items,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getItemsOnSell,
  addItemToCart,
  editItem
})(ItemsOnSell);

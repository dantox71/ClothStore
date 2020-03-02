import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getSingleItem } from "../../actions/items";
import Loader from "../layout/Loader";
import { setAlert } from "../../actions/alerts";
import cart from "../layout/cart.svg";
import AddItemReview from "../reviews/AddItemReview";
import ItemReviews from "../reviews/ItemReviews";
import { addItemToCart } from "../../actions/cart";

const SingleItem = ({
  addItemToCart,
  setAlert,
  match,
  getSingleItem,
  auth: { isAuthenticated },
  items: { item, loading },
  reviews: { reviews }
}) => {
  useEffect(() => {
    getSingleItem(match.params.itemId);
  }, [getSingleItem, match.params.itemId]);

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
      if (isAuthenticated) {
        addItemToCart(itemId);
      } else {
        setAlert("You have to be logged in to add item to cart");
      }
    }
  };

  return (
    <section id="item">
      <div className="container">
        {loading || !item ? (
          <Loader />
        ) : (
          <Fragment>
            <div className="item-info">
              <div className="item-info-left">
                <img
                  src={`${process.env.PUBLIC_URL}/uploads/images/items/${item.image}`}
                  alt=""
                  className="item-img"
                />

                <div className="item-menu">
                  <Link
                    to="/cart"
                    className="shopping-cart-link"
                    onClick={() => onAddItemToCart(item._id)}
                  >
                    <img src={cart} alt="Cart Icon" />
                  </Link>

                  <div className="star-rating">
                    {reviews.length > 0 && itemStarRating(item.averageRating)}
                  </div>

                  <p className="text-gray">
                    {reviews.length > 0 && item.averageRating}
                  </p>
                  <p className="text-gray">
                    {reviews.length > 1
                      ? `${reviews.length} reviews`
                      : reviews.length === 1
                      ? `${reviews.length} review`
                      : " No reviews"}
                  </p>
                </div>
              </div>
              <div className="item-info-right">
                <h1>{item.name}</h1>
                <p>{item.description}</p>
                <p>
                  Price: <span className="text-bold">${item.price}</span>
                </p>
                <a
                  href="#!"
                  className="btn btn-primary"
                  onClick={() => onAddItemToCart(item._id)}
                >
                  Add To Cart
                </a>
              </div>
            </div>
            <AddItemReview itemId={item._id} />
            <ItemReviews itemId={item._id} />
          </Fragment>
        )}
      </div>
    </section>
  );
};

SingleItem.propTypes = {
  getSingleItem: PropTypes.func.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
  reviews: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  items: state.items,
  auth: state.auth,
  reviews: state.reviews
});

export default connect(mapStateToProps, {
  getSingleItem,
  setAlert,
  addItemToCart
})(SingleItem);

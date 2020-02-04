import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getSingleItem } from "../../actions/items";
import Loader from "../layout/Loader";
import cart from "../layout/cart.svg";
import AddItemReview from "../reviews/AddItemReview";
import ItemReviews from "../reviews/ItemReviews";

const SingleItem = ({
  match,
  getSingleItem,
  items: { item, loading },
  reviews: { reviews }
}) => {
  useEffect(() => {
    getSingleItem(match.params.itemId);
  }, [getSingleItem]);

  const itemStarRating = rate => {
    let elements = [];

    for (let i = 0; i < rate; i++) {
      elements.push(<i className="fa fa-star" key={i}></i>);
    }

    return elements;
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
                  alt="Item Image"
                  className="item-img"
                />

                <div className="item-menu">
                  <Link to="/cart" className="shopping-cart-link">
                    <img src={cart} alt="Cart Icon" />
                  </Link>

                  <div className="star-rating">
                    {itemStarRating(item.averageRating)}
                  </div>

                  <p className="text-gray">{item.averageRating}</p>
                  <p className="text-gray">
                    {reviews.length}
                    {reviews.length > 1
                      ? " reviews"
                      : reviews.length === 1
                      ? " review"
                      : " No review"}
                  </p>
                </div>
              </div>
              <div className="item-info-right">
                <h1>{item.name}</h1>
                <p>{item.description}</p>
                <p>
                  Price: <span className="text-bold">${item.price}</span>
                </p>
                <a href="#!" className="btn btn-primary">
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
  items: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  items: state.items,
  reviews: state.reviews
});

export default connect(mapStateToProps, { getSingleItem })(SingleItem);

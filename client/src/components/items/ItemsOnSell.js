import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getItemsOnSell } from "../../actions/items";
import { setAlert } from "../../actions/alerts";
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
  setAlert,
  items: { items, loading },
  reviews: { reviews },
  auth: { user, isAuthenticated }
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
      if (isAuthenticated) {
        addItemToCart(itemId);
      } else {
        setAlert("You have to be logged in to add item to cart");
      }
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
              {items.length > 0 ? (
                items.map(item => (
                  <div className="item" key={item._id}>
                    <img
                      src={`${process.env.PUBLIC_URL}/uploads/images/items/${item.image}`}
                      alt=""
                      className="item-img"
                    />
                    <div className="item-menu">
                      <a href="#!" onClick={() => onAddItemToCart(item._id)}>
                        <img src={cart} alt="Cart Icon" />
                      </a>
                      <div className="star-rating">
                        {(reviews.length > 0) &
                          itemStarRating(item.averageRating)}
                      </div>

                      <p className="text-gray">
                        Average Ratings:
                        <span className="text-bold">
                          {reviews.length > 0
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
                        Price:{" "}
                        <span className="text-bold"> $ {item.price} </span>
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
                ))
              ) : (
                <div>
                  <h1>Not found </h1> <br />
                  <p>We haven't found results for Your query</p>
                </div>
              )}
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
  setAlert: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  reviews: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  items: state.items,
  auth: state.auth,
  reviews: state.reviews
});

export default connect(mapStateToProps, {
  getItemsOnSell,
  addItemToCart,
  editItem,
  setAlert
})(ItemsOnSell);

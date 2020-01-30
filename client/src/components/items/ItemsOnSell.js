import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getItemsOnSell } from "../../actions/items";
import cart from "../layout/cart.svg";
import Loader from "../layout/Loader";

const ItemsOnSell = ({
  getItemsOnSell,
  items: { items, loading },
  auth: { user }
}) => {
  useEffect(() => {
    getItemsOnSell();
  }, [getItemsOnSell]);

  return (
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
                  <Link to="/cart">
                    <img src={cart} alt="Cart Icon" />
                  </Link>

                  <div className="star-rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>

                  <p className="text-gray">4.0</p>
                  <p className="text-gray">5 ratigns</p>
                </div>
                <div className="item-info">
                  <h1>{item.name}</h1>
                  <p>{item.description}</p>
                  <p>
                    Category: <span className="text-bold">{item.category}</span>
                  </p>
                  <p>
                    Price: <span className="text-bold">${item.price}</span>
                  </p>
                  <div className="item-buttons">
                    <Link to={`items/${item._id}`} className="btn btn-primary">
                      Read More
                    </Link>

                    {user && user._id === item.user && (
                      //Show delete icon only if logged in user is owner of this item
                      <a href="#">
                        <i className="fa fa-times"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            <i className="fa fa-arrow-left"></i>
            <span className="current">1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>....</span>
            <span>12</span>
            <i className="fa fa-arrow-right"></i>
          </div>
        </Fragment>
      )}
    </section>
  );
};

ItemsOnSell.propTypes = {
  getItemsOnSell: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  items: state.items,
  auth: state.auth
});

export default connect(mapStateToProps, { getItemsOnSell })(ItemsOnSell);

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import "moment-timezone";

const ReviewItem = ({ review }) => {
  const reviewStarRating = rate => {
    let elements = [];

    for (let i = 0; i < rate; i++) {
      elements.push(<i className="fa fa-star" key={i}></i>);
    }

    return elements;
  };

  return (
    <div className="review">
      <div className="review-top">
        <img
          className="img-rounded"
          src={`${process.env.PUBLIC_URL}/uploads/images/users/${review.user.image}`}
          alt="User Avatar"
        />
        <div className="review-info">
          <p>
            Added by <span className="text-bold">{review.user.name}</span>
          </p>
          <p>
            On{" "}
            <span className="text-bold">
              <Moment format="YYYY/MM/DD">{review.createdAt}</Moment>
            </span>
          </p>
        </div>
      </div>
      <p className="review-description">{review.text}</p>
      <div className="review-star-rating">{reviewStarRating(review.rate)}</div>
    </div>
  );
};

ReviewItem.propTypes = {
  review: PropTypes.object.isRequired
};

export default ReviewItem;

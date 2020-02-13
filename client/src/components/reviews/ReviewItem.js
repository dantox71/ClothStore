import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import "moment-timezone";
import { connect } from "react-redux";
import { removeReview } from "../../actions/reviews";

const ReviewItem = ({ removeReview, review, auth: { user } }) => {
  const reviewStarRating = rate => {
    let elements = [];

    for (let i = 0; i < rate; i++) {
      elements.push(<i className="fa fa-star" key={i}></i>);
    }

    return elements;
  };

  const onReviewDelete = reviewId => {
    if (window.confirm("Are You sure You want to delete this review?")) {
      removeReview(reviewId);
    }
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

      {user && review.user._id === user._id && (
        <a
          href="#!"
          className="delete-review"
          onClick={() => onReviewDelete(review._id)}
        >
          <i class="fa fa-times"></i>
        </a>
      )}
    </div>
  );
};

ReviewItem.propTypes = {
  review: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  removeReview: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { removeReview })(ReviewItem);

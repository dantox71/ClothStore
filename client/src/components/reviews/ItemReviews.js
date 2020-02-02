import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getItemReviews } from "../../actions/reviews";
import ReviewItem from "./ReviewItem";

const ItemReviews = ({ itemId, getItemReviews, reviews: { reviews } }) => {
  useEffect(() => {
    getItemReviews(itemId);
  }, [getItemReviews]);

  return reviews.length > 0 ? (
    <div className="item-reviews">
      <h2>What other people thinks about this product?</h2>

      {reviews.map(review => (
        <ReviewItem key={review._id} review={review} />
      ))}
    </div>
  ) : (
    <p>This item has no reviews yet</p>
  );
};

ItemReviews.propTypes = {
  getItemReviews: PropTypes.func.isRequired,
  reviews: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  reviews: state.reviews
});

export default connect(mapStateToProps, { getItemReviews })(ItemReviews);

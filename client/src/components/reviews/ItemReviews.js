import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getItemReviews } from "../../actions/reviews";
import ReviewItem from "./ReviewItem";
import Loader from "../layout/Loader";

const ItemReviews = ({
  itemId,
  getItemReviews,
  reviews: { reviews, loading }
}) => {
  useEffect(() => {
    getItemReviews(itemId);
  }, [getItemReviews]);

  return loading ? (
    <Loader />
  ) : (
    <div className="item-reviews">
      <h2>What other people thinks about this product?</h2>

      {reviews.length > 0 ? (
        reviews.map(review => <ReviewItem key={review._id} review={review} />)
      ) : (
        <h1>This item has no reviews yet</h1>
      )}
    </div>
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

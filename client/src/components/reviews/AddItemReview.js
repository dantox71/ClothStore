import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addReview } from "../../actions/reviews";
import { setAlert } from "../../actions/alerts";

const AddItemReview = ({
  addReview,
  setAlert,
  itemId,
  auth: { isAuthenticated }
}) => {
  const [formData, setFormData] = useState({
    rate: "",
    text: ""
  });

  const { rate, text } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    //Add review

    if (!isAuthenticated) {
      setAlert("To add review you have be logged in");
    } else {
      addReview(itemId, formData);

      setFormData({
        rate: "",
        text: ""
      });
    }

    e.preventDefault();
  };

  return (
    <div className="item-reviews-form">
      <h1>Reviews</h1>

      <form onSubmit={onSubmit}>
        <label>
          How you rate this product in scale from 0 to 5 ?
          <input type="number" name="rate" value={rate} onChange={onChange} />
        </label>
        <textarea
          name="text"
          value={text}
          onChange={onChange}
          placeholder="Tell us what you think about this product"
        ></textarea>

        <input type="submit" className="btn btn-primary" value="Add Review" />
      </form>
    </div>
  );
};

AddItemReview.propTypes = {
  itemId: PropTypes.string.isRequired,
  addReview: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addReview, setAlert })(AddItemReview);

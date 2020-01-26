import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserItems } from "../../actions/items";

const UserItems = ({ getUserItems, items: { items } }) => {
  useEffect(() => {
    getUserItems();
  }, []);

  return (
    <div class="magazine">
      <h1>Items in your magazine:</h1>

      {items.map(item => (
        <div class="item">
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/uploads/images/items/${item.image}`}
            />
            <div class="image-upload">
              <label class="d-flex-column">
                <i class="far fa-images fa-2x"> </i>
                <input type="file" name="file" />
              </label>
              <a href="#!" class="btn btn-primary">
                Click To Upload
              </a>
            </div>
          </div>

          <div class="item-right">
            <h2>{item.name}</h2>
            <p>{item.description}</p>

            <p>
              Average Ratings: <span class="text-bold">4.0</span>
            </p>
            <p>
              Number of Ratings: <span class="text-bold">5</span>
            </p>

            <p>
              Price: <span class="text-bold">{`$${item.price}`}</span>
            </p>

            <div class="item-buttons">
              <a href="edit-item.html" class="btn btn-primary">
                Edit
              </a>
              <a href="#" class="btn btn-primary">
                Sell
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

UserItems.propTypes = {
  getUserItems: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  items: state.items
});

export default connect(mapStateToProps, { getUserItems })(UserItems);

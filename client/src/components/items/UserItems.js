import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserItems, editItem } from "../../actions/items";

const UserItems = ({ editItem, getUserItems, items: { items } }) => {
  useEffect(() => {
    getUserItems();
  }, [getUserItems]);

  const onItemSell = itemId => {
    if (window.confirm("Are You sure? It will allow others to buy this item")) {
      // sellItem(itemId);
      editItem(itemId, { onsell: true });
    }
  };

  const onItemSellCancel = itemId => {
    if (
      window.confirm(
        "Are You sure? It will return this item to Your magazine and others will not have posibility to buy it"
      )
    ) {
      editItem(itemId, { onsell: false });
    }
  };

  return (
    <div className="magazine">
      <h1>Items in your magazine:</h1>
      {items.length > 0 ? (
        items.map(item => (
          <div className="item" key={item._id}>
            <div>
              <img
                src={`${process.env.PUBLIC_URL}/uploads/images/items/${item.image}`}
                alt=""
              />
              <div className="image-upload">
                <label className="d-flex-column">
                  <i className="far fa-images fa-2x"> </i>
                  <input type="file" name="file" />
                </label>
                <a href="#!" className="btn btn-primary">
                  Click To Upload
                </a>
              </div>
            </div>

            <div className="item-right">
              <h2>{item.name}</h2>
              <p>{item.description}</p>

              <p>
                Average Ratings: <span className="text-bold">4.0</span>
              </p>
              <p>
                Number of Ratings: <span className="text-bold">5</span>
              </p>

              <p>
                Price: <span className="text-bold">{`$${item.price}`}</span>
              </p>

              <div className="item-buttons">
                <Link to={`/edit-item/${item._id}`} className="btn btn-primary">
                  Edit
                </Link>

                <a
                  href="#!"
                  className="btn btn-primary"
                  onClick={
                    item.onsell
                      ? () => onItemSellCancel(item._id)
                      : () => onItemSell(item._id)
                  }
                >
                  {item.onsell ? "Cancel" : "Sell"}
                </a>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm mb-3">You have no items </p>
      )}
    </div>
  );
};

UserItems.propTypes = {
  getUserItems: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  items: state.items
});

export default connect(mapStateToProps, { getUserItems, editItem })(UserItems);

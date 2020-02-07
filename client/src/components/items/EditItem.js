import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "../layout/Loader";
import { setAlert } from "../../actions/alerts";
import { getSingleItem, editItem } from "../../actions/items";

const EditItem = ({
  match,
  getSingleItem,
  editItem,
  items: { item, loading },
  auth: { isAuthenticated }
}) => {
  useEffect(() => {
    getSingleItem(match.params.itemId);

    if (item) {
      setFormData({
        name: item.name,
        description: item.description,
        category: item.category,
        price: item.price
      });
    }
  }, [getSingleItem, match.params.itemId]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: ""
  });

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  const { name, description, price, category } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    editItem(item._id, formData);

    setFormData({
      ...formData,
      name: "",
      description: "",
      price: ""
    });

    e.preventDefault();
  };

  return loading ? (
    <Loader />
  ) : (
    <section id="edit-item">
      <form onSubmit={onSubmit}>
        <div className="container">
          <h1> Edit Item </h1>
          <div className="form-group">
            <input
              type="name"
              name="name"
              onChange={onChange}
              value={name}
              placeholder="Product Name"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={description}
              onChange={onChange}
              name="description"
              placeholder="Product Description"
            />
          </div>
          <div className="form-group">
            <select name="category" onChange={onChange} value={category}>
              <option value="shirts">Shirts</option>
              <option value="hoodies">Hoodies</option>
              <option value="shoes">Shoes</option>
              <option value="trousers">Trousers</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="number"
              onChange={onChange}
              value={price}
              placeholder="Product Price"
              name="price"
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Edit" className="btn btn-primary" />
          </div>
        </div>
      </form>
    </section>
  );
};

EditItem.propTypes = {
  getSingleItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  items: state.items,
  auth: state.auth
});

export default connect(mapStateToProps, { getSingleItem, editItem })(EditItem);

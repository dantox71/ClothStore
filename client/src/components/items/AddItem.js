import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addItem } from "../../actions/items";
import { setAlert } from "../../actions/alerts";

const AddItem = ({ addItem, setAlert }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "shoes"
  });

  const { name, description, category, price } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    addItem(formData);

    setFormData({
      name: "",
      description: "",
      price: "",
      category: "shoes"
    });

    e.preventDefault();
  };

  return (
    <div id="add-item">
      <form onSubmit={onSubmit}>
        <div className="container">
          <h1>Add New Item</h1>

          <div className="form-group">
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter Item Name"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="description"
              value={description}
              onChange={onChange}
              placeholder="Enter Item Description"
            />
          </div>

          <div className="form-group">
            <label>
              Select Item Category
              <select name="category" value={category} onChange={onChange}>
                <option value="shirts">Shirts</option>
                <option value="hoodies">Hoodies</option>
                <option value="shoes">Shoes</option>
                <option value="trousers">Trousers</option>
              </select>
            </label>
          </div>

          <div className="form-group">
            <input
              type="number"
              name="price"
              value={price}
              onChange={onChange}
              placeholder="Price"
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Add Item" className="btn btn-primary" />
          </div>
        </div>
      </form>
    </div>
  );
};

AddItem.propTypes = {
  addItem: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default connect(null, { addItem, setAlert })(AddItem);

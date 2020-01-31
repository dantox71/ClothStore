import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { filterItems } from "../../actions/items";
import { setAlert } from "../../actions/alerts";

const ItemFilters = ({ filterItems, setAlert, items: { items } }) => {
  const [categories, setCategories] = useState({
    shirts: false,
    hoodies: false,
    shoes: false,
    trousers: false
  });

  const [price, setPrice] = useState({
    from: "",
    to: ""
  });

  const { shirts, hoodies, shoes, trousers } = categories;
  const { from, to } = price;

  const onCategoryChange = e => {
    setCategories({
      ...categories,
      [e.target.name]: e.target.checked
    });
  };

  const onPriceChange = e => {
    setPrice({
      ...price,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    //Check is there's no category selected.
    if (Object.values(categories).every(category => category === false)) {
      setAlert("Select at least one category");
    } else {
      let queryStr = "";

      //Add price filtering to query string
      queryStr += `&price[gte]=${from}&price[lte]=${to}`;

      //Add category filtering to query string
      for (let category in categories) {
        if (categories[category]) {
          queryStr += `&category[in]=${category}`;
        }
      }

      filterItems(queryStr);
    }

    e.preventDefault();
  };

  return (
    <section id="filters">
      <div className="container">
        <h1>Filters</h1>
        <form onSubmit={onSubmit}>
          <div className="filter">
            <label>
              <h2>Category:</h2>
            </label>

            <label>
              Shirts
              <input
                type="checkbox"
                value={shirts}
                onChange={onCategoryChange}
                name="shirts"
              />
            </label>
            <label>
              Hoodies
              <input
                type="checkbox"
                value={hoodies}
                onChange={onCategoryChange}
                name="hoodies"
              />
            </label>
            <label>
              Shoes
              <input
                type="checkbox"
                value={shoes}
                onChange={onCategoryChange}
                name="shoes"
              />
            </label>
            <label>
              Trousers
              <input
                type="checkbox"
                value={trousers}
                onChange={onCategoryChange}
                name="trousers"
              />
            </label>
          </div>

          <div className="filter">
            <label>
              <h2>Price($):</h2>
            </label>

            <label>
              From
              <input
                type="number"
                placeholder="$00,00"
                required
                min="0"
                name="from"
                value={from}
                onChange={onPriceChange}
              />
            </label>

            <label>
              To
              <input
                type="number"
                placeholder="$1000,00"
                name="to"
                required
                min="0"
                value={to}
                onChange={onPriceChange}
              />
            </label>
          </div>

          <input
            type="submit"
            value="Filter"
            className="btn btn-primary filter-btn"
          />
        </form>
      </div>
    </section>
  );
};

ItemFilters.propTypes = {
  filterItems: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  items: state.items
});

export default connect(mapStateToProps, { filterItems, setAlert })(ItemFilters);

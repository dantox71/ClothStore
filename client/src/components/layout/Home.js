import React, { Fragment } from "react";
import ItemsOnSell from "../items/ItemsOnSell";
import ItemsFilter from "../items/ItemsFilters";

const Home = props => {
  return (
    <Fragment>
      <ItemsFilter />
      <ItemsOnSell />
    </Fragment>
  );
};

export default Home;

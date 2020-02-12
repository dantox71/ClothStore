import React, { Fragment } from "react";

const NotFound = props => {
  return (
    <Fragment>
      <div className="not-found">
        <h1 className="text-primary p-5">Sorry, this page does not exist</h1>
        <p>:(</p>
      </div>
    </Fragment>
  );
};

export default NotFound;

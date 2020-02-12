import React from "react";
import loading from "./loading.gif";

const Loader = props => {
  return (
    <div style={loaderStyles}>
      <img src={loading} alt="Loader gif" style={{ width: "100px" }} />
    </div>
  );
};

const loaderStyles = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "85vh",
  padding: "1rem"
};

export default Loader;

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import store from "./store";
import { Provider } from "react-redux";
import Home from "./components/layout/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Item from "./components/items/Item";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Alerts from "./components/alerts/Alerts";
import Account from "./components/account/Account";
import EditAccount from "./components/account/EditAccount";
import EditItem from "./components/items/EditItem";
import { loadUser } from "./actions/auth";

const App = () => {
  //Load user if there's token in localStorage
  if (localStorage.token) {
    store.dispatch(loadUser());
  }

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/home" component={Home} />{" "}
          <Route exact path="/register" component={Register} />{" "}
          <Route exact path="/login" component={Login} />{" "}
          <Route exact path="/me" component={Account} />{" "}
          <Route exact path="/items/:itemId" component={Item} />{" "}
          <Route exact path="/edit-item/:itemId" component={EditItem} />{" "}
          <Route exact path="/edit-account" component={EditAccount} />{" "}
          <Route exact path="/edit-item/:itemId" component={EditItem} />{" "}
        </Switch>
        <Footer />
        <Alerts />
      </Router>
    </Provider>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import store from "./store";
import { Provider } from "react-redux";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Navbar from "./components/page/Navbar";
import Footer from "./components/page/Footer";
import Alerts from "./components/alerts/Alerts";
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
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
        <Footer />

        <Alerts />
      </Router>
    </Provider>
  );
};

export default App;

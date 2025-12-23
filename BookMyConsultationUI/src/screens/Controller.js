import React, { useState } from "react";
import Home from "../screens/home/Home";
import Header from "../common/header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Controller = () => {
  const baseUrl = "/api/v1/";
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("access-token") !== null);

  const loginHandler = () => {
    setIsLoggedIn(true);
  }

  const logoutHandler = () => {
    sessionStorage.removeItem("uuid");
    sessionStorage.removeItem("access-token");
    setIsLoggedIn(false);
  }

  return (
    <Router>
      <div className="main-container">
        <Header baseUrl={baseUrl} isLoggedIn={isLoggedIn} loginHandler={loginHandler} logoutHandler={logoutHandler} />
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} baseUrl={baseUrl} isLoggedIn={isLoggedIn} />}
        />
      </div>
    </Router>
  );
};

export default Controller;

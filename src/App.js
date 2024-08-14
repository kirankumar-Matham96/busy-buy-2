// import logo from './logo.svg';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./app/components/NavBar";
import { Home } from "./app/pages/Home";
import { SignUp } from "./app/pages/SignUp";
import { SignIn } from "./app/pages/SignIn";
import { Cart } from "./app/pages/Cart";
import { Purchases } from "./app/pages/Purchases";
import { ErrorPage } from "./app/pages/ErrorPage";

import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route
            errorElement={<ErrorPage />}
            exact
            path="/"
            element={<Home />}
          />
          <Route
            errorElement={<ErrorPage />}
            path="/signin"
            element={<SignIn />}
          />
          <Route
            errorElement={<ErrorPage />}
            path="/signup"
            element={<SignUp />}
          />
          <Route errorElement={<ErrorPage />} path="/cart" element={<Cart />} />
          <Route
            errorElement={<ErrorPage />}
            path="/purchases"
            element={<Purchases />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

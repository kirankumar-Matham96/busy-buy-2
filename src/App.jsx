import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { Cart } from "./pages/Cart";
import { Orders } from "./pages/Orders";
import { ErrorPage } from "./pages/ErrorPage";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <div className="pageContainer">
          <Routes>
            <Route
              exact
              path="/"
              element={<Home />}
              errorElement={<ErrorPage />}
            />
            <Route
              path="/signin"
              element={<SignIn />}
              errorElement={<ErrorPage />}
            />
            <Route
              path="/signup"
              element={<SignUp />}
              errorElement={<ErrorPage />}
            />
            <Route
              path="/cart"
              element={<Cart />}
              errorElement={<ErrorPage />}
            />
            <Route
              path="/orders"
              element={<Orders />}
              errorElement={<ErrorPage />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

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
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { Notification } from "./components/Notification";
import "./App.css";

/**
 * The `App` component is the root component of the application, responsible for setting up routing and global state management.
 *
 * It provides the following key functionalities:
 * - Wraps the entire application in a Redux `Provider` to make the Redux store available throughout the component tree.
 * - Uses `BrowserRouter` from `react-router-dom` to handle routing within the application.
 * - Renders the `NavBar` component, which is displayed on every page.
 * - Sets up routing with the `Routes` component, defining the paths and corresponding components for different pages of the application.
 * - Includes a `ProtectedRoutes` component to guard access to specific routes (such as the Cart and Orders pages) based on user authentication status.
 * - Displays a `Notification` component, which provides feedback or alerts to users.
 * - Uses the `ErrorPage` component as a fallback for any unmatched routes or error states.
 *
 * @component
 * @returns {JSX.Element} The main application layout, including routing, global components, and error handling.
 */
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <div className="pageContainer">
          <Notification />
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
              element={
                <ProtectedRoutes>
                  <Cart />
                </ProtectedRoutes>
              }
              errorElement={<ErrorPage />}
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoutes>
                  <Orders />
                </ProtectedRoutes>
              }
              errorElement={<ErrorPage />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

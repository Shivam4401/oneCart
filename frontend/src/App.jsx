import React, { useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Nav from "./components/Nav";
import { userDataContext } from "./context/UserContext";
import About from "./Pages/About";
import Collections from "./Pages/Collections";
import Product from "./Pages/Product";
import Contact from "./Pages/Contact";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import PlaceOrder from "./Pages/PlaceOrder";
import Order from "./Pages/Order";
import NotFound from "./Pages/NotFound";
import Ai from "./components/Ai";
import { ToastContainer } from "react-toastify";

const App = () => {
  const { userData } = useContext(userDataContext);
  const location = useLocation();
  return (
    <>
      <ToastContainer />
{/*       {userData && <Nav />} */}
      <Nav/>
      <Routes>
                {/* public Routes */}

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collections />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/login"
          element={
            userData ? <Navigate to={location.state?.from || "/"} /> : <Login />
          }
        />

        <Route
          path="/register"
          element={
            userData ? (
              <Navigate to={location.state?.from || "/"} />
            ) : (
              <Register />
            )
          }
        />

        <Route
          path="/"
          element={
            userData ? (
              <Home />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/about"
          element={
            userData ? (
              <About />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/collection"
          element={
            userData ? (
              <Collections />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/product"
          element={
            userData ? (
              <Product />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/contact"
          element={
            userData ? (
              <Contact />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/productdetail/:productId"
          element={
            userData ? (
              <ProductDetails />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/cart"
          element={
            userData ? (
              <Cart />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/placeorder"
          element={
            userData ? (
              <PlaceOrder />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/order"
          element={
            userData ? (
              <Order />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Ai />
    </>
  );
};

export default App;

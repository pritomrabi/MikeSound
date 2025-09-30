import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Layout from "./Layout";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import ErrorPage from "./Pages/ErrorPage";
import SingleProduct from "./Pages/SingleProduct";
import ViewCart from "./Pages/ViewCart";
import Checkout from "./Pages/Checkout";
import Categories from "./Pages/Categories";
import Support from "./Pages/Support";
import OrderHistory from "./Pages/OrderHistory";
import SpecialOffers from "./Pages/SpecialOffers";
import Registration from "./Auth/Registration";
import Login from "./Auth/Login";
import Forgot from "./Auth/Forgot";
import OTP from "./Auth/OTP";
import Wishlist from "./Pages/Wishlist";
import Discount from "./Pages/Discount";
import Headphone from "./Pages/Headphone";
import Speakers from "./Pages/Speakers";
import Gaming from "./Pages/Gaming";
import Earbud from "./Pages/Earbud";

function App() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  // Apply theme to <html> tag
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path="/"
          element={
            <Layout
              toggleTheme={() => setDarkMode(!darkMode)}
              darkMode={darkMode}
            />
          }
          errorElement={<ErrorPage />}
        >
          <Route index element={<Home />} />
          <Route path="/headphone" element={<Headphone />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="/gaming" element={<Gaming />} />
          <Route path="/earbud" element={<Earbud />} />
          <Route path="/support" element={<Support />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/singleproduct" element={<SingleProduct />} />
          <Route path="/SpecialOffers" element={<SpecialOffers />} />
          <Route path="/discount" element={<Discount />} />
          <Route path="/orderhistory" element={<OrderHistory />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/viewcart" element={<ViewCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/categories/:slug" element={<Categories />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/otp" element={<OTP />} />
      </Route>
    )
  );

  return (
    <div className="bg-white text-primary dark:bg-black dark:text-white min-h-screen transition-colors duration-300">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

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
import Contact from "./Pages/Contact";
import Shop from "./Pages/Shop";
import ErrorPage from "./Pages/ErrorPage";
import SingleProduct from "./Pages/SingleProduct";
import ViewCart from "./Pages/ViewCart";
import Checkout from "./Pages/Checkout";
import Categories from "./Pages/Categories";

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
          <Route path="contact" element={<Contact />} />
          <Route path="shop" element={<Shop />} />
          <Route path="/singleproduct" element={<SingleProduct />} />
          <Route path="/viewcart" element={<ViewCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/categories/:slug" element={<Categories />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        {/* <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/otp" element={<OTP />} /> */}
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

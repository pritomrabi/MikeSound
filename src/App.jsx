import AnimatedCursor from "react-animated-cursor";
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
import Discount from "./Pages/Discount";
import Headphone from "./Pages/Headphone";
import Speakers from "./Pages/Speakers";
import Gaming from "./Pages/Gaming";
import Earbud from "./Pages/Earbud";
import Preloader from "./Components/Preloader";
// import Payment from "./Pages/Payment";
import Privacy from "./Pages/Privacy";
import ReturnsPolicy from "./Pages/ReturnsPolicy";
import Terms from "./Pages/Terms";

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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500); // 1.5 sec or adjust
    return () => clearTimeout(timer);
  }, []);
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
          <Route path="/contact" element={<Support />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/singleproduct/:id" element={<SingleProduct />} />
          <Route path="/discount/:type" element={<Discount />} />
          <Route path="/viewcart" element={<ViewCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/categories/:slug" element={<Categories />} />
          {/* <Route path="/payment" element={<Payment />} /> */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/returnsPolicy" element={<ReturnsPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Route>
    )
  );

  return (
    <div className="bg-white text-primary dark:bg-black dark:text-white min-h-screen transition-colors duration-300">
      {loading && <Preloader />}
      <AnimatedCursor
        innerSize={10}
        outerSize={10}
        color="220, 20, 60"
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={5}
        clickables={[
          'a',
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          'label[for]',
          'select',
          'textarea',
          'button',
          '.link'
        ]}
      />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

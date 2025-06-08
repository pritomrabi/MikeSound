import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Blog from "./Pages/Blog";
import Shop from "./Pages/Shop";
import ErrorPage from "./Pages/ErrorPage";
import Registration from "./Auth/Registration";
import Login from "./Auth/Login";
import Forgot from "./Auth/Forgot";
import OTP from "./Auth/OTP";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} />
          <Route path="shop" element={<Shop />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot" element={<Forgot />}></Route>
        <Route path="/otp" element={<OTP />}></Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;

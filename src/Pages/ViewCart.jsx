import React, { useEffect } from "react";
import ViewBanner from "../Components/ViewCart/ViewBanner";
import ViewShopping from "../Components/ViewCart/ViewShopping";

const ViewCart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="md:pt-20 pt-16">
      <ViewBanner />
      <ViewShopping />
    </div>
  );
};

export default ViewCart;

import React from "react";
import ViewBanner from "../Components/ViewCart/ViewBanner";
import ViewShopping from "../Components/ViewCart/ViewShopping";

const ViewCart = () => {
  return (
    <div className="pt-20">
      <ViewBanner />
      <ViewShopping />
    </div>
  );
};

export default ViewCart;

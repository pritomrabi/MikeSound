import React from "react";
import CheckoutBanner from "../Components/Checkout/CheckoutBanner";
import CheckoutDetails from "../Components/Checkout/CheckoutDetails";

const Checkout = () => {
  return (
    <div className="pt-20">
      <CheckoutBanner />
      <CheckoutDetails />
    </div>
  );
};

export default Checkout;

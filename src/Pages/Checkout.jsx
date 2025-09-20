import React from "react";
import CheckoutBanner from "../Components/Checkout/CheckoutBanner";
import CheckoutDetails from "../Components/Checkout/CheckoutDetails";

const Checkout = () => {
  return (
    <div className="md:pt-20 pt-16">
      <CheckoutBanner />
      <CheckoutDetails />
    </div>
  );
};

export default Checkout;

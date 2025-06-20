import React from "react";
import CheckoutLeft from "./CheckoutLeft";
import CheckoutRight from "./CheckoutRight";

const CheckoutDetails = () => {
  return (
    <section>
      <div className="container mx-auto flex flex-col lg:flex-row px-4 py-10 gap-10">
        <CheckoutLeft />
        <CheckoutRight />
      </div>
    </section>
  );
};

export default CheckoutDetails;

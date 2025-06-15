import React from "react";
import CheckoutName from "../../Utilities/CheckoutName";

const CheckoutLeft = () => {
  return (
    <div className="w-[50%] font-Lato font-normal text-primary text-sm">
      <div className=" space-y-4">
        <div>
          <CheckoutName name="Full Name" />
          <div className="pt-2">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className=" w-full px-3 py-2 border border-gray-300 rounded shadow-xs outline-none "
            />
          </div>
        </div>
        <div>
          <CheckoutName name="Company name (optional)" />
          <div className="pt-2">
            <input
              type="text"
              name="name"
              className=" w-full px-3 py-2 border border-gray-300 rounded shadow-xs outline-none "
            />
          </div>
        </div>
        <div>
          <CheckoutName name="Country / Region" />
          <div className="pt-2">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className=" w-full px-3 py-2 border border-gray-300 rounded shadow-xs outline-none "
            />
          </div>
        </div>
        <div>
          <CheckoutName name="Street address *" />
          <div className="pt-2">
            <input
              type="text"
              name="name"
              placeholder="House number and street name"
              className=" w-full px-3 py-2 border border-gray-300 rounded shadow-xs outline-none "
            />
          </div>
        </div>
        <div>
          <CheckoutName name="Town / City" />
          <div className="pt-2">
            <input
              type="text"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded shadow-xs outline-none "
            />
          </div>
        </div>
        <div>
          <CheckoutName name="District" />
          <div className="pt-2">
            <input
              type="text"
              name="name"
              placeholder="Select an option"
              className=" w-full px-3 py-2 border border-gray-300 rounded shadow-xs outline-none "
            />
          </div>
        </div>
        <div>
          <CheckoutName name="Postcode / ZIP (optional)" />
          <div className="pt-2">
            <input
              type="text"
              name="name"
              className=" w-full px-3 py-2 border border-gray-300 rounded shadow-xs outline-none "
            />
          </div>
        </div>
        <div>
          <CheckoutName name="Email address" />
          <div className="pt-2">
            <input
              type="text"
              name="name"
              placeholder="Enter your email address"
              className=" w-full px-3 py-2 border border-gray-300 rounded shadow-xs outline-none "
            />
          </div>
        </div>
        <div>
          <CheckoutName name="Phone" />
          <div className="pt-2">
            <input
              type="text"
              name="name"
              className=" w-full px-3 py-2 border border-gray-300 rounded shadow-xs outline-none placeholder:text-xs"
            />
          </div>
        </div>
        <div>
          <CheckoutName name="Order notes (optional)" />
          <div className="pt-2">
            <textarea
              placeholder="Notes about your order,e.g. special notes for delivery"
              className="border border-gray-300  w-full outline-none rounded px-5 py-2 "
              rows={5}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutLeft;

import React from "react";
import CheckoutName from "../../Utilities/CheckoutName";

const CheckoutLeft = ({ addressData, setAddressData }) => {

  const handleChange = (e) => {
    setAddressData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="lg:w-[50%] w-full font-Lato font-normal text-primaryd dark:text-white text-sm">
      <div className="space-y-4">
        {[
          { label: "Full Name *", name: "full_name", placeholder: "Full Name" },
          { label: "Email address ***", name: "email", placeholder: "Enter your correct email" },
          { label: "Phone **", name: "phone", placeholder: "01XXXXXXXXX" },
          { label: "Street address *", name: "line1", placeholder: "House number and street name" },
          { label: "Town / City", name: "city", placeholder: "City" },
          { label: "Postcode / ZIP (optional)", name: "postal_code", placeholder: "ZIP" },
        ].map((field, idx) => (
          <div key={idx}>
            <CheckoutName name={field.label} />
            <div className="pt-2">
              <input
                type="text"
                name={field.name}
                value={addressData[field.name] || ""}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded shadow-xs outline-none"
              />
            </div>
          </div>
        ))}

        <div>
          <CheckoutName name="Order notes (optional)" />
          <div className="pt-2">
            <textarea
              name="note"
              value={addressData.note || ""}
              onChange={handleChange}
              placeholder="Notes about your order"
              className="border border-gray-300 w-full outline-none rounded px-5 py-2"
              rows={5}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutLeft;

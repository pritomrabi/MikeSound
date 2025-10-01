import React, { useState } from "react";
import { PiMinusThin } from "react-icons/pi";
import { HiOutlinePlusSmall } from "react-icons/hi2";
const ViewLeftCart = () => {
  const [quantity, setQuantity] = useState(1);
  const [coupon, setCoupon] = useState("");

  const handleCouponApply = (e) => {
    e.preventDefault();
    // Add coupon apply logic here
    alert(`Applying coupon: ${coupon}`);
  };

  return (
    <div className="lg:w-[65%] w-full">
      <form className="w-full sm:px-4 px-0 py-10">
        {/* Cart Table */}
        <div className="overflow-x-auto">
          <table className="w-full sm:text-lg text-sm text-primary-default dark:text-primary-dark font-medium font-Roboto text-left">
            <thead className="border-b border-gray-300">
              <tr>
                <th className="p-2"></th>
                <th className="p-2"></th>
                <th className="p-2">Product</th>
                <th className="p-2">Price</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b pb-4 border-gray-300">
                <td className="p-2 text-primary-default dark:text-primary-dark hover:text-secandari duration-300 cursor-pointer sm:text-xl text-sm">
                  ×
                </td>
                <td className="p-2">
                  <img
                    src="https://woodmart.xtemos.com/wp-content/uploads/2017/04/fashion-product-3.jpg"
                    alt="Product"
                    className="sm:w-20 w-20 h-12 sm:h-20 object-cover"
                  />
                </td>
                <td className="p-2">
                  <p className="text-primary-default dark:text-primary-dark sm:text-sm text-xs font-Lato font-medium">
                    Wkinny Fit Suit - XXL
                  </p>
                </td>
                <td className="p-2 text-primary-default dark:text-primary-dark sm:text-sm text-xs font-Monrope font-medium">
                  $599.00
                </td>
                <td>
                  <div className="flex sm:w-20 w-14 border rounded border-gray-300">
                    <button
                      className="sm:p-2 p-1 cursor-pointer"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <PiMinusThin size={10} />
                    </button>
                    <div className="sm:px-2 px-1 py-1 font-medium font-Monrope text-secandari-default sm:text-sm text-xs">
                      {quantity}
                    </div>
                    <button
                      className="sm:p-2 p-1 cursor-pointer"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <HiOutlinePlusSmall size={10} />
                    </button>
                  </div>
                </td>
                <td className="p-2 text-brand sm:text-sm text-xs font-Monrope font-medium">
                  $ 599.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Cart actions */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4  border-gray-300 py-4">
          <form onSubmit={handleCouponApply} className="flex gap-2">
            <input
              type="text"
              placeholder="Coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="border border-gray-300 px-3 sm:py-2 py-1 rounded sm:w-48 w-10 outline-none font-Monrope font-medium text-sm"
            />
            <button
              type="submit"
              className="bg-brand cursor-pointer text-white text-xs sm:text-base px-4 py-2 rounded "
            >
              Apply Coupon
            </button>
          </form>
        </div>
      </form>
    </div>
  );
};

export default ViewLeftCart;

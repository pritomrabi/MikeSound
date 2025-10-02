import React, { useState } from "react";
import { PiMinusThin } from "react-icons/pi";
import { HiOutlinePlusSmall } from "react-icons/hi2";

const ViewLeftCart = () => {
  const [quantity, setQuantity] = useState(1);
  const [coupon, setCoupon] = useState("");

  const handleCouponApply = (e) => {
    e.preventDefault();
    alert(`Applying coupon: ${coupon}`);
  };

  return (
    <div className="w-full lg:w-[65%] px-2 sm:px-4 py-6">
      <form className="w-full">

        {/* Cart Table for desktop */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-xs sm:text-sm md:text-base text-primary-default dark:text-primary-dark font-medium font-Roboto text-left border-collapse">
            <thead className="border-b border-gray-300">
              <tr>
                <th className="p-2"></th>
                <th className="p-2">Product</th>
                <th className="p-2">Price</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="p-2 cursor-pointer">×</td>
                <td className="p-2 flex items-center gap-4">
                  <img
                    src="https://woodmart.xtemos.com/wp-content/uploads/2017/04/fashion-product-3.jpg"
                    alt="Product"
                    className="w-20 h-20 object-cover rounded"
                  />
                  <p className="text-primary-default dark:text-primary-dark text-sm font-Lato font-medium">
                    Wkinny Fit Suit - XXL
                  </p>
                </td>
                <td className="p-2">$599.00</td>
                <td className="p-2">
                  <div className="flex items-center w-24 border rounded border-gray-300 justify-between px-2 py-1">
                    <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                      <PiMinusThin size={12} />
                    </button>
                    <div className="text-center w-full">{quantity}</div>
                    <button type="button" onClick={() => setQuantity(quantity + 1)}>
                      <HiOutlinePlusSmall size={12} />
                    </button>
                  </div>
                </td>
                <td className="p-2 text-brand">$599.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="sm:hidden space-y-4">
          <div className="border p-3 rounded-lg flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <p className="cursor-pointer text-lg">×</p>
              <img
                src="https://woodmart.xtemos.com/wp-content/uploads/2017/04/fashion-product-3.jpg"
                alt="Product"
                className="w-20 h-20 object-cover rounded"
              />
            </div>
            <p className="text-primary-default dark:text-primary-dark font-Lato font-medium">
              Wkinny Fit Suit - XXL
            </p>
            <p className="text-primary-default">$599.00</p>

            {/* Quantity vertical */}
            <div className="flex flex-col w-24 border rounded border-gray-300 p-1">
              <button
                type="button"
                className="py-1"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <PiMinusThin size={12} />
              </button>
              <div className="text-center py-1">{quantity}</div>
              <button
                type="button"
                className="py-1"
                onClick={() => setQuantity(quantity + 1)}
              >
                <HiOutlinePlusSmall size={12} />
              </button>
            </div>
            <p className="text-brand font-Monrope font-medium">$599.00</p>
          </div>
        </div>

        {/* Coupon Section */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-gray-300 pt-4">
          <form onSubmit={handleCouponApply} className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded w-full sm:w-48 text-sm sm:text-base font-Monrope outline-none"
            />
            <button
              type="submit"
              className="bg-brand hover:bg-brand/90 text-white px-4 py-2 rounded text-sm sm:text-base w-full sm:w-auto"
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

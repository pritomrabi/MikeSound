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
    <div className="w-[65%]">
      <form className="w-full px-4 py-10">
        {/* Cart Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-lg text-primary-default dark:text-primary-dark font-medium font-Roboto text-left">
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
                <td className="p-2 text-primary-default dark:text-primary-dark hover:text-secandari duration-300 cursor-pointer text-xl">
                  ×
                </td>
                <td className="p-2">
                  <img
                    src="https://woodmart.xtemos.com/wp-content/uploads/2017/04/fashion-product-3.jpg"
                    alt="Product"
                    className="w-20 h-20 object-cover"
                  />
                </td>
                <td className="p-2">
                  <p className="text-primary-default dark:text-primary-dark text-sm font-Lato font-medium">
                    Wkinny Fit Suit - XXL
                  </p>
                </td>
                <td className="p-2 text-primary-default dark:text-primary-dark text-sm font-Monrope font-medium">
                  $599.00
                </td>
                <td>
                  <div className="flex w-20 border rounded border-gray-300">
                    <button
                      className="p-2 cursor-pointer"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <PiMinusThin size={10} />
                    </button>
                    <div className="px-2 py-1 font-medium font-Monrope text-secandari-default text-sm">
                      {quantity}
                    </div>
                    <button
                      className="p-2 cursor-pointer"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <HiOutlinePlusSmall size={10} />
                    </button>
                  </div>
                </td>
                <td className="p-2 text-brand text-sm font-Monrope font-medium">
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
              className="border border-gray-300 px-3 py-2 rounded w-48 outline-none"
            />
            <button
              type="submit"
              className="bg-brand cursor-pointer text-white  px-4 py-2 rounded "
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

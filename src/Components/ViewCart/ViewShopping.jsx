import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addtoCart, removeFromcart } from "../../redux/reducer/ProductSlice";

const ViewShopping = () => {
  const cartItems = useSelector((state) => state.cartList.product || []);
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleIncrease = (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;
    dispatch(addtoCart({ ...item, quantity: (item.quantity || 1) + 1 }));
  };

  const handleDecrease = (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item || (item.quantity || 1) <= 1) return;
    dispatch(addtoCart({ ...item, quantity: item.quantity - 1 }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromcart(id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const handleApplyCoupon = () => {
    if (couponCode === "DISCOUNT10") {
      const disc = subtotal * 0.1;
      setDiscount(disc);
      setMessage("✅ Coupon applied: 10% off");
    } else {
      setDiscount(0);
      setMessage("❌ Coupon not match");
    }
  };

  const total = subtotal - discount;

  return (
    <section className="bg-[#fdfeff] dark:bg-[#212020] dark:text-white py-10">
      <div className="container mx-auto flex flex-col lg:flex-row gap-10 px-4">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white dark:bg-[#212020] dark:text-white rounded-2xl shadow p-4 max-h-[400px] overflow-y-auto">
            <div className="flex items-center border-b pb-3 font-Nunito-font text-[10px] sm:text-sm md:text-lg font-semibold text-gray-600 dark:text-white">
              <div className="w-1/12 hidden sm:block text-center">Remove</div>
              <div className="w-2/12 text-center">Thumbnail</div>
              <div className="w-4/12">Product</div>
              <div className="w-2/12 text-center">Price</div>
              <div className="w-2/12 text-center">Quantity</div>
              <div className="w-2/12 text-center">Subtotal</div>
            </div>
            {cartItems.length === 0 && (
              <p className="text-center py-4 text-gray-500 dark:text-white">Cart is empty</p>
            )}

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex dark:text-white flex-row md:flex-row items-center py-4 border-b last:border-b-0 gap-4 text-[10px] sm:text-xs md:text-base font-Nunito-font"
              >
                <div
                  onClick={() => handleRemove(item.id)}
                  className="md:w-1/12 text-red-500 cursor-pointer hover:text-red-700 flex justify-center"
                >
                  <MdDelete className="text-xs sm:text-sm md:text-base" />
                </div>

                <div className="md:w-2/12 flex justify-center">
                  <img
                    src={item.image || "https://via.placeholder.com/150"}
                    alt={item.name || "Product"}
                    className="md:w-24 sm:w-20 w-14 h-14 sm:h-20 md:h-24 object-cover rounded-lg"
                  />
                </div>

                <div className="md:w-4/12">
                  <p className="font-medium text-gray-800 dark:text-white text-[9px] sm:text-xs md:text-base">
                    {(item.title || "").substring(0, 30)}...
                  </p>
                  {item.color_name && (
                    <p className="text-gray-600 text-sm">Color: {item.color_name}</p>
                  )}
                </div>

                <div className="md:w-2/12 text-gray-700 dark:text-white md:text-center">
                  ৳ {(item.price || 0).toFixed(2)}
                </div>

                <div className="md:w-fit flex md:justify-center">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className="md:px-2 px-1 text-gray-600 hover:text-black"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity || 1}
                      readOnly
                      className="md:w-12 w-6 text-center border-x"
                    />
                    <button
                      onClick={() => handleIncrease(item.id)}
                      className="md:px-2 px-1 text-gray-600 hover:text-black"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="md:w-2/12 font-semibold text-green-600 md:text-center">
                  ৳ {((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Coupon */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Coupon code"
                className="flex-1 md:flex-none border rounded-lg px-3 py-2 outline-none"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-400"
              >
                Apply Coupon
              </button>
            </div>
          </div>
          {message && <p className="mt-2 text-sm font-medium text-blue-600">{message}</p>}
        </div>

        {/* Cart Totals */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white dark:bg-[#212020] rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600 dark:text-white">Subtotal</span>
              <span className="text-gray-800 dark:text-white">৳ {subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between py-2 border-b text-red-600">
                <span>Discount</span>
                <span>-৳ {discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between py-4 font-semibold text-lg">
              <span>Total</span>
              <span className="text-green-600">৳ {total.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              className="bg-brand text-white p-3 mt-4 rounded-xl font-medium justify-end mx-auto flex w-fit"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewShopping;

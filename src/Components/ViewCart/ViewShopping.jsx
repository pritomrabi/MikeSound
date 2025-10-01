import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const ViewShopping = () => {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState("");
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "IMAGE Skincare, VITAL C Hydrating Face Serum, with Vitamin C and Hyaluronic Acid,",
      price: 1290,
      quantity: 2,
      image:
        "https://woodmart.xtemos.com/wp-content/uploads/2017/04/fashion-product-3.jpg",
    },
    {
      id: 2,
      name: "PCA SKIN Vitamin B3 Brightening Serum, Anti Aging Serum for Dark Spots and Skin",
      price: 990,
      quantity: 1,
      image:
        "https://woodmart.xtemos.com/wp-content/uploads/2017/04/fashion-product-2.jpg",
    },
  ]);

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // remove item
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // subtotal calculate
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // apply coupon on update cart
  const handleUpdateCart = () => {
    if (couponCode.toUpperCase() === "SAVE10") {
      setDiscount(subtotal * 0.1);
      setMessage("✅ Coupon applied: 10% discount");
    } else if (couponCode.toUpperCase() === "SAVE20") {
      setDiscount(subtotal * 0.2);
      setMessage("✅ Coupon applied: 20% discount");
    } else if (couponCode.trim() !== "") {
      setDiscount(0);
      setMessage("❌ Invalid coupon code");
    } else {
      setDiscount(0);
      setMessage("");
    }
  };

  const total = subtotal - discount;

  return (
    <section className="bg-[#fdfeff] py-10">
      <div className="container mx-auto flex flex-col lg:flex-row gap-10 px-4">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-2xl shadow p-4 max-h-[400px] overflow-y-auto">
            {/* Desktop Table Header */}
            <div className="flex items-center border-b pb-3 font-Nunito-font text-[10px] sm:text-sm md:text-lg font-semibold text-gray-600">
              <div className="w-1/12 hidden sm:block text-center">Remove</div>
              <div className="w-2/12 text-center">Thumbnail</div>
              <div className="w-4/12">Product</div>
              <div className="w-2/12 text-center">Price</div>
              <div className="w-2/12 text-center">Quantity</div>
              <div className="w-2/12 text-center">Subtotal</div>
            </div>
            {/* Product Rows */}
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-row md:flex-row items-center py-4 border-b last:border-b-0 gap-4 text-[10px] sm:text-xs md:text-base font-Nunito-font"
              >
                {/* Remove */}
                <div
                  onClick={() => removeItem(item.id)}
                  className="md:w-1/12 text-red-500 cursor-pointer hover:text-red-700 flex justify-center"
                >
                  <MdDelete className="text-xs sm:text-sm md:text-base" />
                </div>

                {/* Thumbnail */}
                <div className="md:w-2/12 flex justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="md:w-24 sm:w-20 w-14 h-14 sm:h-20 md:h-24 object-cover rounded-lg"
                  />
                </div>

                {/* Product Info */}
                <div className="md:w-4/12">
                  <p className="font-medium text-gray-800 text-[9px] sm:text-xs md:text-base">{item.name.substring(0, 30)}...</p>

                </div>

                {/* Price */}
                <div className="md:w-2/12 text-gray-700 md:text-center">
                  ৳ {item.price.toFixed(2)}
                </div>

                {/* Quantity */}
                <div className="md:w-fit flex md:justify-center">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="md:px-2 px-1 text-gray-600 hover:text-black "
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      readOnly
                      className="md:w-12 w-6 text-center border-x"
                    />
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="md:px-2 px-1 text-gray-600 hover:text-black"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="md:w-2/12 font-semibold text-green-600 md:text-center">

                  ৳ {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Coupon & Update Cart */}
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
                onClick={handleUpdateCart}
                className="bg-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-400 "
              >
                Apply Coupon
              </button>
            </div>
          </div>

          {/* Coupon Message */}
          {message && (
            <p className="mt-2 text-sm font-medium text-blue-600">{message}</p>
          )}
        </div>

        {/* Cart Totals */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-800">৳ {subtotal.toFixed(2)}</span>
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
            <Link to="/checkout" className=" bg-Dark text-white bg-brand p-3 mt-4 rounded-xl font-medium justify-end mx-auto flex w-fit">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewShopping;

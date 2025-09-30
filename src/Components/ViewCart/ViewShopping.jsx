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
            <div className="hidden md:flex items-center border-b pb-3 font-Nunito-font font-semibold text-gray-600">
              <div className="w-1/12 text-center">Remove</div>
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
                className="flex flex-col md:flex-row md:items-center py-4 border-b last:border-b-0 gap-4 font-Nunito-font"
              >
                {/* Remove */}
                <div
                  onClick={() => removeItem(item.id)}
                  className="md:w-1/12 text-red-500 cursor-pointer hover:text-red-700 flex justify-center"
                >
                  <MdDelete size={22} />
                </div>

                {/* Thumbnail */}
                <div className="md:w-2/12 flex justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </div>

                {/* Product Info */}
                <div className="md:w-4/12 text-sm">
                  <p className="font-medium text-gray-800">{item.name}</p>

                </div>

                {/* Price */}
                <div className="md:w-2/12 text-gray-700 md:text-center">
                  <span className="md:hidden font-semibold">Price: </span>
                  ৳ {item.price.toFixed(2)}
                </div>

                {/* Quantity */}
                <div className="md:w-2/12 flex md:justify-center">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-2 text-gray-600 hover:text-black"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      readOnly
                      className="w-12 text-center border-x"
                    />
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-2 text-gray-600 hover:text-black"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="md:w-2/12 font-semibold text-green-600 md:text-center">
                  <span className="md:hidden font-semibold">Subtotal: </span>
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

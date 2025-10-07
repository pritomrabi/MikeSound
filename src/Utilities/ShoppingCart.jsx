import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { PiMinusThin } from "react-icons/pi";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addtoCart, removeFromcart } from "../redux/reducer/ProductSlice";

const ShoppingCart = ({ setShop }) => {
  const cartItems = useSelector(state => Array.isArray(state.cartList?.product) ? state.cartList.product : []);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // Loading optional for Redux-only

  const handleIncrease = (id, color) => {
    const item = cartItems.find((i) => i.id === id && i.color_name === color);
    if (item) {
      dispatch(addtoCart({ ...item, quantity: (item.quantity || 1) + 1 }));
    }
  };

  const handleDecrease = (id, color) => {
    const item = cartItems.find((i) => i.id === id && i.color_name === color);
    if (item && item.quantity > 1) {
      dispatch(addtoCart({ ...item, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromcart(id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  return (
    <div className="absolute w-full top-0 left-0 flex transition-all duration-500 h-screen">
      <div
        onClick={() => setShop(false)}
        className="fixed right-0 lg:w-[55%] xl:w-[65%] md:w-[35%] sm:w-[40%] w-[5%] cursor-pointer h-full z-40"
      ></div>

      <div className="fixed right-0 bg-white dark:bg-[#1a1a1a] xl:w-[35%] lg:w-[45%] md:w-[65%] sm:w-[60%] w-[85%] h-[98%] items-center top-1 bottom-2 shadow-md rounded-l-2xl px-1 sm:px-4 md:px-8 py-4 z-50">
        <p
          onClick={() => setShop(false)}
          className="absolute -left-5 border-[4px] text-white bg-brand duration-100 p-2 w-fit rounded-full drop-shadow-sm cursor-pointer"
        >
          <RxCross2 className="text-lg" />
        </p>

        <h2 className="text-xl font-medium text-center text-primary-default dark:text-primary-dark font-Roboto border-b border-secandari pb-4 uppercase">
          Shopping Cart
        </h2>

        <div className="py-10 h-full">
          <div className="h-[68%] w-full overflow-y-scroll">
            {loading ? (
              <p>Loading cart...</p>
            ) : (
              <ul className="space-y-2 px-5">
                {cartItems.length === 0 && <p className="text-center">Cart is empty</p>}
                {cartItems.map((item) => (
                  <li key={item.id} className="flex items-center gap-4 pb-3 mr-5">
                    <img
                      src={item.image || "https://via.placeholder.com/150"}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <p className="text-base font-Lato font-medium text-primary-default dark:text-primary-dark duration-200 pb-1">
                        {item.title}
                      </p>
                      {item.color_name && (
                        <p className="text-base font-Lato font-medium text-primary-default dark:text-primary-dark duration-200 pb-1">
                          {item.color_name}
                        </p>
                      )}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-gray-300">
                        <div className="flex border rounded border-gray-300">
                          <button
                            className="p-2 cursor-pointer"
                            onClick={() => handleDecrease(item.id, item.color_name)}
                          >
                            <PiMinusThin />
                          </button>
                          <div className="px-2 py-1 font-medium font-Monrope text-secandari text-sm">
                            {item.quantity || 1}
                          </div>
                          <button
                            className="p-2 cursor-pointer"
                            onClick={() => handleIncrease(item.id, item.color_name)}
                          >
                            <HiOutlinePlusSmall />
                          </button>
                        </div>
                        <p className="text-sm text-primary-default dark:text-primary-dark font-normal font-Monrope">
                          {(item.quantity || 1) + " X "}
                          <span className="font-semibold text-secandari px-1">
                            $ {item.price || 0}
                          </span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-primary-default dark:text-primary-dark border-primary-default dark:border-primary-dark rounded-full p-1 border cursor-pointer duration-200 hover:text-secandari hover:border-secandari"
                    >
                      <RxCross2 className="text-[10px]" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="items-end">
            <div className="flex justify-between px-5 mt-6 border-y border-secandari">
              <p className="py-4 font-semibold text-xl text-primary-default dark:text-primary-dark font-NunitoFont">
                Subtotal :
              </p>
              <span className="text-brand font-medium font-Monrope text-lg pt-4">
                $ {subtotal}
              </span>
            </div>

            <div className="mt-4 px-5 flex justify-between">
              <Link
                to="/viewcart"
                onClick={() => setShop(false)}
                className="sm:px-8 px-4 py-2 rounded-md font-NunitoFont font-medium sm:text-lg text-base text-primary-default dark:text-primary-dark border border-primary-default dark:border-primary-dark hover:text-secandari hover:border-secandari duration-400"
              >
                View Cart
              </Link>
              <Link
                to="/checkout"
                onClick={() => setShop(false)}
                className="bg-brand text-white duration-300 font-NunitoFont font-medium sm:text-lg text-base sm:px-8 px-4 py-2 rounded-md"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;

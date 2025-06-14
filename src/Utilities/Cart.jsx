import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
const Cart = ({ setIsOpen }) => {
  return (
    <div className="absolute w-full top-0 left-0 flex transition-all duration-500 h-screen">
      <div
        onClick={() => setIsOpen(true)}
        className="lg:w-[55%] xl:w-[65%] md:w-[35%] sm:w-[40%] w-[5%] h-full cursor-pointer fixed top-0 left-0 z-40"
      ></div>
      <div className="fixed right-0  bg-white xl:w-[35%] lg:w-[45%] md:w-[65%] sm:w-[60%] w-[85%] h-[98%] items-center top-1 bottom-2  shadow-md rounded-l-2xl px-1 sm:px-4 md:px-8 py-4 z-50">
        <p
          onClick={() => setIsOpen(true)}
          className=" absolute -left-5 border-[4px] text-white bg-brand duration-100 p-2 w-fit rounded-full drop-shadow-sm cursor-pointer"
        >
          <RxCross2 className=" text-lg" />
        </p>
        <div className="p-16">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search for products"
              className="w-full border border-secandari  rounded-2xl py-4 pl-4 pr-10 text-sm text-gray-700 placeholder-gray-500 outline-none font-Lato font-normal"
            />
            <button
              type="submit"
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand"
            >
              <FiSearch size={20} />
            </button>
          </div>
          <ul className="flex flex-col items-start space-y-4 mt-8 text-primary font-Lato font-medium text-lg">
            <Link
              to="/"
              onClick={() => setIsOpen(true)}
              className="hover:text-brand duration-100"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setIsOpen(true)}
              className="hover:text-brand duration-100"
            >
              Shop
            </Link>
            <Link
              to="/blog"
              onClick={() => setIsOpen(true)}
              className="hover:text-brand duration-100"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(true)}
              className="hover:text-brand duration-100"
            >
              Contact
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cart;

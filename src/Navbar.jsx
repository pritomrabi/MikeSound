import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";
import { FiAlignRight } from "react-icons/fi";
import Cart from "./Cart";
import ShoppingCart from "./ShoppingCart";
import Search from "./Search";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [shop, setShop] = useState(false);
  const [search, setSearch] = useState(false);
  return (
    <section className="bg-[#fdfeff] p-6 shadow-2xl w-full">
      <div className="container mx-auto flex">
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="text-2xl font-bold text-primary font-Lato">
            Fashion Flat
          </Link>
          <div className=" items-center space-x-6 text-base font-Lato text-primary font-medium hidden md:block">
            <Link to="/" className="hover:text-brand duration-100">
              Home
            </Link>
            <Link to="/" className="hover:text-brand duration-100">
              Shop
            </Link>
            <Link to="/" className="hover:text-brand duration-100">
              Blog
            </Link>
            <Link to="/" className="hover:text-brand duration-100">
              Contact
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/registration"
              className="text-base text-primary font-medium  font-Lato hover:underline hover:text-secandari duration-100"
            >
              Login/Register
            </Link>
            {search ? (
              <RxCross2
                className="text-2xl text-primary cursor-pointer hover:text-secandari duration-100 md:block hidden"
              />
            ) : (
              <IoSearchOutline
                onClick={() => setSearch(true)}
                className="text-2xl text-primary cursor-pointer hover:text-secandari duration-100 md:block hidden"
              />
            )}

            <FaRegHeart className="text-xl text-primary cursor-pointer hover:text-secandari duration-100 " />

            <div
              onClick={() => setShop(true)}
              className="relative inline-block"
            >
              <PiShoppingCartSimpleLight className="text-xl text-primary cursor-pointer hover:text-secandari duration-100 " />
              <span className="bg-brand text-white text-[8px] rounded-full w-3 h-3 absolute -top-1 -left-1 text-center flex items-center justify-center ">
                0
              </span>
            </div>
            {isOpen ? (
              <FiAlignRight
                onClick={() => setIsOpen(false)}
                className="text-xl text-primary cursor-pointer hover:text-secandari duration-100 block md:hidden"
              />
            ) : (
              <Cart setIsOpen={setIsOpen} />
            )}
          </div>
        </div>
      </div>
      {search && <Search setSearch={setSearch} />}
      {shop && <ShoppingCart setShop={setShop} />}
    </section>
  );
};

export default Navbar;

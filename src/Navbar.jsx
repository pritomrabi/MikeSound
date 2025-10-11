import { Link, useLocation } from "react-router-dom";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FiAlignLeft } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import Search from "./Utilities/Search";
import ShoppingCart from "./Utilities/ShoppingCart";
import Cart from "./Utilities/Cart";
import ThemeToggle from "./Utilities/ThemeToggle";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [shop, setShop] = useState(false);
  const [search, setSearch] = useState(false);

  const location = useLocation();
  const disableCartPopup = ["/viewcart", "/checkout"].includes(location.pathname);

  useEffect(() => {
    setShop(false);
  }, [location.pathname]);

  const cartItems = useSelector(state =>
    Array.isArray(state.cartList?.product) ? state.cartList.product : []
  );

  const totalItems = cartItems.length;

  const menuItems = [
    { title: "Home", path: "" },
    { title: "Headphone", path: "headphone" },
    { title: "Speakers", path: "speakers" },
    { title: "Earbud", path: "earbud" },
    { title: "Gaming", path: "gaming" },
    { title: "Shop", path: "shop" },
  ];

  return (
    <section className="shadow w-full fixed top-0 z-50 bg-brand text-white">
      <div className="px-4">
        <div className="container mx-auto flex items-center justify-between w-full">
          {/* MOBILE NAVBAR STRUCTURE */}
          <div className="flex items-center justify-between w-full md:hidden">
            {/* Left: Menu */}
            <div>
              {isOpen ? (
                <FiAlignLeft
                  onClick={() => setIsOpen(false)}
                  className="text-xl cursor-pointer block md:hidden"
                />
              ) : (
                <Cart setIsOpen={setIsOpen} />
              )}
            </div>
            {/* Center: Logo */}
            <Link
              to="/"
              className="text-2xl font-bold text-brand font-Lato bg-transparent"
            >
              <img src="/logo.jpg" alt="logo" className="w-36 bg-transparent" />
            </Link>
            {/* Right: Cart */}
            <div onClick={() => setShop(true)} className="relative cursor-pointer">
              <PiShoppingCartSimpleLight className="text-3xl" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
          </div>
          {/* DESKTOP NAVBAR STRUCTURE */}
          <div className="hidden md:flex items-center justify-between w-full">
            <Link
              to="/"
              className="text-2xl font-bold text-brand font-Lato bg-transparent"
            >
              <img src="/logo.jpg" alt="logo" className="w-36 bg-transparent" />
            </Link>

            <div className="flex space-x-6 text-xl font-Lato font-medium text-primary-default dark:text-primary-dark">
              {menuItems.map((menu, i) => (
                <Link key={i} to={`/${menu.path}`} className="hover:text-white duration-100">
                  {menu.title}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {search ? (
                <RxCross2
                  onClick={() => setSearch(false)}
                  className="text-2xl cursor-pointer"
                />
              ) : (
                <IoSearchOutline
                  onClick={() => setSearch(true)}
                  className="text-3xl cursor-pointer"
                />
              )}
              <div onClick={() => setShop(true)} className="relative cursor-pointer">
                <PiShoppingCartSimpleLight className="text-2xl" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-2 bg-black dark:bg-brand text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Search Section */}
        {search && <Search setSearch={setSearch} />}
        {/* Shopping Cart Popup */}
        {shop && !disableCartPopup && <ShoppingCart setShop={setShop} />}
      </div>
    </section >
  );
};

export default Navbar;

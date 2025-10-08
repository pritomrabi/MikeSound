import { Link, useLocation } from "react-router-dom";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FiAlignRight } from "react-icons/fi";
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
    { title: "Headphone", path: "headphone" },
    { title: "Speakers", path: "speakers" },
    { title: "Earbud", path: "earbud" },
    { title: "Gaming", path: "gaming" },
    { title: "Shop", path: "shop" },
  ];

  return (
    <section className="shadow w-full fixed top-0 z-50 bg-[#fdfeff] dark:bg-[#1a1a1a]">
      <div className="p-6">
        <div className="container mx-auto flex overflow-visible">
          <div className="flex items-center justify-between w-full">

            <Link to="/" className="sm:text-2xl text-xl font-bold text-brand font-Lato">
              Mike Sound
            </Link>

            <div className="hidden md:flex items-center md:space-x-3 lg:space-x-6 md:text-sm lg:text-lg font-Lato text-primary-default dark:text-primary-dark font-medium">
              {menuItems.map((menu, i) => (
                <Link key={i} to={`/${menu.path}`} className="hover:text-brand duration-100">
                  {menu.title}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <ThemeToggle />

              {search ? (
                <RxCross2
                  onClick={() => setSearch(false)}
                  className=" text-2xl cursor-pointer md:block hidden"
                />
              ) : (
                <IoSearchOutline
                  onClick={() => setSearch(true)}
                  className="sm:text-3xl  cursor-pointer md:block hidden"
                />
              )}

              <div onClick={() => setShop(true)} className="relative inline-block">
                <PiShoppingCartSimpleLight className="text-2xl  cursor-pointer" />
                {totalItems > 0 && (
                  <span className="bg-brand text-white text-[8px] rounded-full w-3 h-3 absolute -top-1 -left-1 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>

              {isOpen ? (
                <FiAlignRight
                  onClick={() => setIsOpen(false)}
                  className="text-xl  cursor-pointer block md:hidden"
                />
              ) : (
                <Cart setIsOpen={setIsOpen} />
              )}
            </div>
          </div>
        </div>

        {search && <Search setSearch={setSearch} />}
        {shop && !disableCartPopup && <ShoppingCart setShop={setShop} />}
      </div>
    </section>
  );
};

export default Navbar;

import { Link, useLocation } from "react-router-dom";
// import { FaRegUserCircle } from "react-icons/fa";
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
  // === Menus with subcategories ===
  const menuItems = [
    { title: "Headphone", path: "headphone", sub: ["Wireless Headphones", "Noise Cancelling", "Over-Ear", "On-Ear"] },
    { title: "Speakers", path: "speakers", sub: ["Bluetooth Speakers", "Home Theater", "Portable", "Smart Speakers"] },
    { title: "Earbud", path: "earbud", sub: ["Wireless Earbuds", "Gaming Earbuds", "Noise Cancelling"] },
    { title: "Gaming", path: "gaming", sub: ["Gaming Headset", "Gaming Chair", "Accessories"] },
    { title: "Shop", path: "shop" },
    // { title: "Support", path: "support" },
  ];

  return (
    <section className="shadow w-full fixed top-0 z-50 bg-[#fdfeff] dark:bg-[#1a1a1a]">
      {/* <Header /> */}
      <div className="p-6">
        <div className="container mx-auto flex overflow-visible">
          <div className="flex items-center justify-between w-full">

            {/* Logo */}
            <Link to="/" className="sm:text-2xl text-xl font-bold text-brand font-Lato">
              Mike Sound
            </Link>

            {/* ===== Main Menu ===== */}
            <div className="hidden md:flex items-center md:space-x-3 lg:space-x-6 md:text-sm lg:text-lg font-Lato text-primary-default dark:text-primary-dark font-medium">
              {menuItems.map((menu, i) =>
                menu.sub ? (
                  <div key={i} className="relative group">
                    <Link to={`/${menu.path}`} className="hover:text-brand duration-100">
                      {menu.title}
                    </Link>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block bg-white dark:bg-gray-900 shadow-lg rounded-lg mt-2 p-3 w-48">
                      <ul className="space-y-2 text-sm">
                        {menu.sub.map((item, idx) => (
                          <li key={idx}>
                            <Link
                              to={`/${menu.path}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                              className="block hover:text-brand duration-100"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link key={i} to={`/${menu.path}`} className="hover:text-brand duration-100">
                    {menu.title}
                  </Link>
                )
              )}
            </div>

            {/* ===== Right Section ===== */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <ThemeToggle />

              {search ? (
                <RxCross2
                  onClick={() => setSearch(false)}
                  className="sm:text-2xl text-xl cursor-pointer md:block hidden"
                />
              ) : (
                <IoSearchOutline
                  onClick={() => setSearch(true)}
                  className="sm:text-3xl text-xl cursor-pointer md:block hidden"
                />
              )}

              <div onClick={() => setShop(true)} className="relative inline-block">
                <PiShoppingCartSimpleLight className="sm:text-2xl text-xl cursor-pointer" />
                {totalItems > 0 && (
                  <span className="bg-brand text-white text-[8px] rounded-full w-3 h-3 absolute -top-1 -left-1 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>

              {/* <Link to="/login">
                <FaRegUserCircle className="sm:text-2xl text-xl cursor-pointer" />
              </Link> */}
              {isOpen ? (
                <FiAlignRight
                  onClick={() => setIsOpen(false)}
                  className="sm:text-xl text-lg cursor-pointer block md:hidden"
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

import { FaFacebook, FaWhatsapp, FaFacebookMessenger, FaPhoneAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { BiChevronUp } from "react-icons/bi";
import { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BsShop } from "react-icons/bs";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { useSelector } from "react-redux";
import ShoppingCart from "./Utilities/ShoppingCart";
import ThemeToggle from "./Utilities/ThemeToggle";
import FloatingChat from "./Utilities/FloatingChat";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shop, setShop] = useState(false);

  const location = useLocation();
  const disableCartPopup = ["/viewcart", "/checkout"].includes(location.pathname);

  useEffect(() => {
    setShop(false);
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cartItems = useSelector(state =>
    Array.isArray(state.cartList?.product) ? state.cartList.product : []
  );
  const totalItems = cartItems.length;

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {/* Desktop Footer */}
      <footer className=" bg-brand text-sm pt-12 pb-6 font-Lato">
        <div className="container mx-auto justify-center px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <Link to="/">
                <h4 className="text-2xl font-bold text-white font-Monrope">
                  Mike Sound
                </h4>
              </Link>
              <p className="text-white/90 font-normal font-Nunito-font w-[95%] text-base mt-2">
                We provide the best wellness services to help you relax and rejuvenate.
                Our team is dedicated to offering a soothing experience tailored to your needs.
              </p>
            </div>
            <div>
              <h4 className="text-2xl text-white font-bold font-Nunito-font mb-4">Quick Links</h4>
              <ul className="text-white/90 text-base font-medium font-Monrope space-y-2 flex flex-col">
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms & Conditions</Link>
                <Link to="/returnsPolicy">Refund and Returns Policy</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/payment">Payment</Link>
              </ul>
            </div>
            <div>
              <h4 className="text-2xl text-white font-bold font-Nunito-font mb-4">Contact</h4>
              <ul className="text-white/90 text-base font-medium font-Monrope space-y-2">
                <li>
                  Email:{" "}
                  <Link to="mailto:eurosespabd@gmail.com" className="">
                    eurosespabd@gmail.com
                  </Link>
                </li>
                <li>
                  Phone:{" "}
                  <Link to="tel:+8801911552077" className="">
                    +8801911552077
                  </Link>
                </li>
                <li>Location: Dhaka, Bangladesh</li>
              </ul>
            </div>
            <div>
              <h4 className="text-2xl text-white font-bold font-Nunito-font mb-4">Follow Us</h4>
              <div className="flex space-x-4 text-white">
                <Link to="https://www.facebook.com" className="hover:text-[#1877F2]">
                  <FaFacebook className="text-xl" />
                </Link>
                <Link to="https://wa.me/+880" className="hover:text-[#25D366]">
                  <FaWhatsapp className="text-xl" />
                </Link>
                <Link to="https://m.me/" className="hover:text-[#0084FF]">
                  <FaFacebookMessenger className="text-xl" />
                </Link>
                <Link to="tel:+8801911552077" className="hover:text-[#34B7F1]">
                  <FaPhoneAlt className="text-xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-white/20 pt-6 pb-14 md:pb-0 text-center">
            <p className="text-white/90 font-Nunito-font text-sm">
              © 2025 Mike Sound. All Rights Reserved.
            </p>
            <button
              onClick={scrollToTop}
              className={`fixed bottom-16 right-2 sm:right-4 md:right-8 z-10 p-2 rounded-md text-white transition-transform duration-200 shadow-md cursor-pointer ${isVisible ? "scale-100 bg-red-600" : "scale-0"
                } hover:bg-red-700`}
              title="Go to top"
              aria-label="Scroll to top"
            >
              <BiChevronUp className="w-6 h-6" />
            </button>
            <FloatingChat />
          </div>
        </div>
      </footer>
      {/* Mobile Bottom Navigation */}
      <footer className="md:hidden fixed bottom-0 left-0 w-full bg-brand   shadow z-50">
        <div className="flex justify-around items-center py-2.5 text-white dark:text-white">
          <Link to="/" className="flex flex-col items-center text-sm hover:text-red-600">
            <AiOutlineHome size={22} />
            <span className="text-xs mt-1 font-medium">Home</span>
          </Link>

          <Link to="/shop" className="flex flex-col items-center text-sm hover:text-red-600 dark:text-white">
            <BsShop size={22} />
            <span className="text-xs mt-1 font-medium">Shop</span>
          </Link>
          <p className="flex flex-col items-center text-sm hover:text-red-600 dark:text-white">
            <ThemeToggle />
            <span className="text-xs mt-1 font-medium">Dark</span>
          </p>
        </div>
        {shop && !disableCartPopup && <ShoppingCart setShop={setShop} />}
      </footer>
    </>
  );
};

export default Footer;

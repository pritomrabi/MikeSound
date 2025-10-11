import { FaFacebook, FaWhatsapp, FaFacebookMessenger, FaPhoneAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { BiChevronUp } from "react-icons/bi";
import { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsShop } from "react-icons/bs";
import { useSelector } from "react-redux";
import ShoppingCart from "./Utilities/ShoppingCart";
import ThemeToggle from "./Utilities/ThemeToggle";
import FloatingChat from "./Utilities/FloatingChat";
import { getFooter } from "./api/api";

const Footer = () => {
  const location = useLocation(); // hooks top level
  const [isVisible, setIsVisible] = useState(false);
  const [shop, setShop] = useState(false);
  const [footer, setFooter] = useState(null);

  const disableCartPopup = ["/viewcart", "/checkout"].includes(location.pathname);

  const cartItems = useSelector(state =>
    Array.isArray(state.cartList?.product) ? state.cartList.product : []
  );
  const totalItems = cartItems.length;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchFooter = async () => {
      const data = await getFooter();
      setFooter(data);
    };
    fetchFooter();
  }, []);

  useEffect(() => {
    setShop(false);
  }, [location.pathname]);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!footer) return null;

  return (
    <>
      {/* Desktop Footer */}
      <footer className="bg-brand text-sm pt-12 pb-6 font-Lato">
        <div className="container mx-auto px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <Link
                to="/"
                className="text-2xl font-bold text-brand font-Lato bg-transparent"
              >
                <img src="/logo.jpg" alt="logo" className="w-36 bg-transparent" />
              </Link>
              <p className="text-white/90 font-normal font-NunitoFont w-[95%] text-base mt-2">
                {footer.description}
              </p>
            </div>
            <div>
              <h4 className="text-2xl text-white font-bold font-NunitoFont mb-4">Quick Links</h4>
              <ul className="text-white/90 text-base font-medium font-Monrope space-y-2 flex flex-col">
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms & Conditions</Link>
                <Link to="/returnsPolicy">Refund and Returns Policy</Link>
                <Link to="/contact">Contact</Link>
              </ul>
            </div>
            <div>
              <h4 className="text-2xl text-white font-bold font-NunitoFont mb-4">Contact</h4>
              <ul className="text-white/90 text-base font-medium font-Monrope space-y-2">
                <li>Email: <Link to={`mailto:${footer.email}`}>{footer.email}</Link></li>
                <li>Phone: <Link to={`tel:${footer.phone}`}>{footer.phone}</Link></li>
                <li>Location: {footer.location}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-2xl text-white font-bold font-NunitoFont mb-4">Follow Us</h4>
              <div className="flex space-x-4 text-white">
                {footer.facebook && (
                  <Link to={footer.facebook} className="hover:text-[#1877F2]">
                    <FaFacebook className="text-xl" />
                  </Link>
                )}
                {footer.whatsapp && (
                  <Link to={footer.whatsapp} className="hover:text-[#25D366]">
                    <FaWhatsapp className="text-xl" />
                  </Link>
                )}
                {footer.messenger && (
                  <Link to={footer.messenger} className="hover:text-[#0084FF]">
                    <FaFacebookMessenger className="text-xl" />
                  </Link>
                )}
                {
                  footer.phone && (
                    <Link to={`tel:${footer.phone}`} className="hover:text-[#34B7F1]">
                      <FaPhoneAlt className="text-xl" />
                    </Link>

                  )
                }
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-white/20 pt-6 pb-14 md:pb-0 text-center">
            <p className="text-white/90 font-NunitoFont text-sm">{footer.copyright}</p>
            <button
              onClick={scrollToTop}
              className={`fixed bottom-20 right-2 sm:right-4 md:right-8 z-10 p-2 rounded-md text-white transition-transform duration-200 shadow-md cursor-pointer ${isVisible ? "scale-100 bg-[#340007d5]" : "scale-0"}`}
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
      <footer className="md:hidden fixed bottom-0 left-0 w-full bg-brand shadow z-40">
        <div className="flex justify-around items-center py-2.5 text-white">
          <Link to="/" className="flex flex-col items-center text-sm ">
            <AiOutlineHome size={22} />
            <span className="text-xs mt-1 font-medium">Home</span>
          </Link>

          <Link to="/shop" className="flex flex-col items-center text-sm ">
            <BsShop size={22} />
            <span className="text-xs mt-1 font-medium">Shop</span>
          </Link>

          <p className="flex flex-col items-center text-sm ">
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

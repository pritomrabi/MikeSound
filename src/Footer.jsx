import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" bg-[#f2f6fce3] dark:bg-[#1a1a1a] text-sm pt-12 pb-6 font-Lato">
      <div className="container mx-auto justify-center px-10 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/">
              <h4 className="text-2xl font-bold text-brand font-Monrope">
                Mike Sound
              </h4>
            </Link>
            <p className="text-secandari font-normal font-Nunito-font w-[95%] text-sm mt-2">
              We provide the best wellness services to help you relax and rejuvenate. Our team is dedicated to offering a soothing experience tailored to your needs.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="text-2xl font-semibold font-Nunito-font mb-4">Quick Links</h4>
            <ul className="text-secandari text-sm font-Monrope space-y-2 flex flex-col">
              <Link className="hover:text-brand" to="/shop">Shop</Link>
              <Link className="hover:text-brand" to="/headphone">Headphone</Link>
              <Link className="hover:text-brand" to="/speakers">Speakers</Link>
              <Link className="hover:text-brand" to="/earbud">Earbud</Link>
              <Link className="hover:text-brand" to="/Gaming">Gaming</Link>
              <Link className="hover:text-brand" to="/support">Support</Link>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 className="text-2xl font-semibold font-Nunito-font mb-4">Contact</h4>
            <ul className="text-secandari text-sm font-Monrope space-y-2">
              <li>Email: <Link className="hover:text-brand" to="mailto:eurosespabd@gmail.com"></Link></li>
              <li>Phone: <Link className="hover:text-brand" to="tel:+8801911552077"></Link></li>
              <li>Location:</li>
            </ul>
          </div>
          {/* Social Links */}
          <div>
            <h4 className="text-2xl font-semibold font-Nunito-font mb-4">Follow Us</h4>
            <div className="flex space-x-4 text-secandari">
              <Link
                to="https://www.facebook.com"
                aria-label="Facebook"
                className="hover:text-[#1877F2]" // Facebook Blue
              >
                <FaFacebook className="text-xl" />
              </Link>

              <Link
                to="https://wa.me/+880"
                aria-label="WhatsApp"
                className="hover:text-[#25D366]" // WhatsApp Green
              >
                <FaWhatsapp className="text-xl" />
              </Link>

              <Link
                to="https://m.me/"
                aria-label="Messenger"
                className="hover:text-[#0084FF]" // Messenger Blue
              >
                <FaFacebookMessenger className="text-xl" />
              </Link>

              <Link
                to="tel:+8801911552077"
                aria-label="Phone"
                className="hover:text-[#34B7F1]" // Phone Accent (light blue)
              >
                <FaPhoneAlt className="text-xl" />
              </Link>
            </div>

          </div>
        </div>
        <div className="mt-8 border-t border-secandari pt-6 text-center">
          <p className="text-secandari font-Nunito-font text-xs sm:text-sm">
            © 2025 Mike Sound. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

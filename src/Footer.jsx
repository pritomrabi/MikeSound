import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" bg-[#fdfeff] dark:bg-[#1a1a1a] text-sm pt-12 pb-6">
      <div className="container mx-auto justify-center px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Branding */}
        <div>
          <Link to="/">
            <h4 className="text-2xl font-bold text-brand font-Monrope">
              Tamim Vai 60$
            </h4>
          </Link>
          <p className="text-gray-400 font-normal font-Nunito-font w-[95%] text-sm mt-2">
            We provide the best wellness services to help you relax and rejuvenate. Our team is dedicated to offering a soothing experience tailored to your needs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-2xl font-semibold font-Monrope mb-4">Quick Links</h4>
          <ul className="text-gray-400 text-sm font-Monrope space-y-2 flex flex-col">
            <Link className="hover:text-emerald-400" to="/services">Services</Link>
            <Link className="hover:text-emerald-400" to="/about">About Us</Link>
            <Link className="hover:text-emerald-400" to="/contact">Contact</Link>
            <Link className="hover:text-emerald-400" to="/faq">FAQ</Link>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-2xl font-semibold font-Monrope mb-4">Contact</h4>
          <ul className="text-gray-400 text-sm font-Monrope space-y-2">
            <li>Email: <Link className="hover:text-emerald-400" to="mailto:eurosespabd@gmail.com">eurosespabd@gmail.com</Link></li>
            <li>Phone: <Link className="hover:text-emerald-400" to="tel:+8801911552077">+880 1911-552077</Link></li>
            <li>Location: Gulshan 2, Road 41, House 7/a, Dhaka 1212, Bangladesh.</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-2xl font-semibold font-Monrope mb-4">Follow Us</h4>
          <div className="flex space-x-4 text-gray-400">
            <Link
              href="https://www.facebook.com/share/16A3MYTHnv"
              aria-label="Facebook"
              className="hover:text-emerald-400"
            >
              <FaFacebook className="text-xl" />
            </Link>
            <Link
              href="https://wa.me/+8801911552077"
              className="hover:text-emerald-400"
            >
              <FaWhatsapp className="text-xl" />
            </Link>
            <Link
              href="https://m.me/EuRose.Spa"
              className="hover:text-emerald-400"
            >
              <FaFacebookMessenger className="text-xl" />
            </Link>
            <Link
              href="tel:+8801911552077"
              className="hover:text-emerald-400"
            >
              <FaPhoneAlt className="text-xl" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center">
        <p className="text-gray-400 font-Nunito-font text-sm">
          © 2025 Tamim Vai. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

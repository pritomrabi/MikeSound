import { useState } from "react";
import { FaWhatsapp, FaFacebookMessenger, FaPhoneAlt } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

const FloatingChat = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-16 left-4 flex flex-col items-end space-y-3 z-50">
      {/* Contact Icons */}
      <div
        className={`flex flex-col items-center space-y-3 transition-all duration-300 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <a
          href="https://wa.me/+8801911552077"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <FaWhatsapp className="text-white text-xl" />
        </a>

        <a
          href="https://m.me/username"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <FaFacebookMessenger className="text-white text-xl" />
        </a>

        <a
          href="tel:+8801911552077"
          className="bg-emerald-500 p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <FaPhoneAlt className="text-white text-xl" />
        </a>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-brand text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        {open ? (
          <IoMdClose className="text-2xl" />
        ) : (
          <IoChatbubbleEllipses className="text-2xl" />
        )}
      </button>
    </div>
  );
};

export default FloatingChat;

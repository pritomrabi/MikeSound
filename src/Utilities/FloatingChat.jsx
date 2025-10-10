import { useState, useEffect } from "react";
import { FaWhatsapp, FaFacebookMessenger, FaPhoneAlt } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { getFooter } from "../api/api";
import { motion, AnimatePresence } from "framer-motion";

const FloatingChat = () => {
  const [open, setOpen] = useState(false);
  const [footer, setFooter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const data = await getFooter();
        setFooter(data);
      } catch (error) {
        console.error("Failed to fetch footer data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFooter();
  }, []);

  if (loading || !footer) return null;

  const hasAnyContact = footer.whatsapp || footer.messenger || footer.phone;

  if (!hasAnyContact) return null;

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  const contactButtons = [
    {
      id: "whatsapp",
      show: !!footer.whatsapp,
      href: footer.whatsapp,
      icon: FaWhatsapp,
      bgColor: "bg-green-500",
      label: "WhatsApp",
    },
    {
      id: "messenger",
      show: !!footer.messenger,
      href: footer.messenger,
      icon: FaFacebookMessenger,
      bgColor: "bg-blue-500",
      label: "Messenger",
    },
    {
      id: "phone",
      show: !!footer.phone,
      href: `tel:${footer.phone}`,
      icon: FaPhoneAlt,
      bgColor: "bg-emerald-500",
      label: "Phone",
    },
  ];

  return (
    <div className="fixed bottom-20 left-4 flex flex-col items-end space-y-3 z-50">
      {/* Contact Icons */}
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-col items-center space-y-3"
          >
            {contactButtons.map(
              (button) =>
                button.show && (
                  <motion.a
                    key={button.id}
                    variants={staggerItem}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    href={button.href}
                    target={button.id !== "phone" ? "_blank" : undefined}
                    rel={
                      button.id !== "phone"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={button.label}
                    className={`${button.bgColor} p-3 rounded-full shadow-lg transition-shadow hover:shadow-xl`}
                  >
                    <button.icon className="text-white text-xl" />
                  </motion.a>
                )
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat menu" : "Open chat menu"}
        className="bg-[#f50827] text-white p-4 rounded-full shadow-lg transition-shadow hover:shadow-xl"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <IoMdClose className="text-2xl" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <IoChatbubbleEllipses className="text-2xl" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default FloatingChat;
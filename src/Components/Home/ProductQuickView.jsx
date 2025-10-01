import { useState } from "react";
import { PiMinusThin } from "react-icons/pi";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { AiFillStar } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

const ProductQuickView = ({ setQuickView }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const product = {
    title: "Arabic Aura Watch",
    category: "Watches",
    subcategory: "Casual",
    brand: "No Brand",
    description: "Simple and stylish Arabic aura watch with black dial and Arabic numerals.",
    price: 289,
    oldPrice: 1999,
    discount: 86,
    rating: 4,
    sold: 321,
    warranty_period: 12,
    model_number: "AAW-2025",
    power_type: "Battery",
    connector_type: "USB-C",
    variations: [
      { id: 1, color: "Black", price: 289, stock: 50 },
      { id: 2, color: "Silver", price: 310, stock: 20 },
      { id: 3, color: "Gold", price: 350, stock: 10 },
    ],
    images: [
      "home.jpg",
      "contact-2.jpg",
      "contact-1.jpg",,
      "contact-1.jpg",
      "home.jpg",
      "home.jpg",
    ],
  };

  const handleVariationSelect = (variation) => setSelectedVariation(variation);
  const totalPrice = selectedVariation ? selectedVariation.price * quantity : product.price * quantity;

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div
      className="fixed top-0 inset-0 bg-[rgba(0,0,0,0.2)] z-50 h-full w-full overflow-auto px-4 py-5 md:py-20 flex items-start justify-center"
      onClick={() => setQuickView(false)}
    >
      <div
        className="bg-[#fdfeff] dark:bg-[#1a1a1a] w-full max-w-full md:max-w-3xl lg:max-w-5xl rounded-lg shadow-lg flex flex-col md:flex-row mt-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-black hover:text-primary cursor-pointer transition duration-200 z-10"
          onClick={() => setQuickView(false)}
        >
          <IoClose size={25} />
        </button>

        {/* Left: Images */}
        <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
          <div
            className="relative w-full h-64 sm:h-80 md:h-[400px] lg:h-[450px] rounded overflow-hidden cursor-grab"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedIndex}
                src={product.images[selectedIndex]}
                alt="Product"
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: isZooming ? 2 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`, transition: "transform 0.2s ease-out" }}
              />
            </AnimatePresence>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 mt-3 overflow-x-auto w-full scrollbar-hide">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Thumb-${i}`}
                className={`w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 object-cover rounded border cursor-pointer ${selectedIndex === i ? "border-orange-500" : "border-gray-300"}`}
                onClick={() => setSelectedIndex(i)}
              />
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 p-4 md:p-10 flex flex-col">
          <p className="text-sm text-black mb-1">
            {product.category} / {product.subcategory} / {product.title}
          </p>
          <h2 className="text-xl sm:text-2xl text-primary font-medium mb-2">
            {product.title}
          </h2>

          <p className="text-lg sm:text-xl font-semibold text-black mb-2">
            ৳{selectedVariation ? selectedVariation.price : product.price}
            <span className="line-through text-gray-400 text-sm ml-2">
              ৳{product.oldPrice}
            </span>
            <span className="ml-2 text-brand">-{product.discount}%</span>
          </p>

          <div className="flex items-center gap-1 mb-2 flex-wrap">
            {[...Array(product.rating)].map((_, i) => (
              <AiFillStar key={i} className="text-yellow-400" />
            ))}
            <span className="text-xs text-gray-500 ml-2">
              ({product.sold} sold)
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-2">
            Brand: <span className="text-blue-600 cursor-pointer">{product.brand}</span>
          </p>

          <p className="text-secandari text-sm mb-4">{product.description}</p>

          <div className="text-gray-600 text-sm mb-4 space-y-1">
            {product.warranty_period > 0 && (
              <p>Warranty: <span className="font-medium">{product.warranty_period} months</span></p>
            )}
            <p>Model Number: <span className="font-medium">{product.model_number}</span></p>
            <p>Power Type: <span className="font-medium">{product.power_type}</span></p>
            <p>Connector Type: <span className="font-medium">{product.connector_type}</span></p>
          </div>

          <div className="mb-4 flex gap-2 flex-wrap items-center">
            <p className="font-medium text-base mb-1 w-full sm:w-auto">Color:</p>
            <div className="flex gap-2 flex-wrap">
              {product.variations.map((variation) => (
                <button
                  key={variation.id}
                  onClick={() => handleVariationSelect(variation)}
                  className={`px-3 py-1 text-xs sm:text-sm rounded font-medium cursor-pointer ${selectedVariation?.id === variation.id
                    ? "bg-yellow-600 text-white border-yellow-600"
                    : "border border-gray-300 text-gray-700 bg-gray-100"
                    }`}
                >
                  {variation.color}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 border-b pb-4 border-gray-300">
            <div className="flex border rounded w-fit border-gray-300 items-center gap-3">
              <button
                className="p-2 cursor-pointer"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <PiMinusThin size={14} />
              </button>
              <div className="px-3 py-2 font-medium text-sm">{quantity}</div>
              <button
                className="p-2 cursor-pointer"
                onClick={() => setQuantity(quantity + 1)}
              >
                <HiOutlinePlusSmall size={14} />
              </button>
            </div>
            <p className="text-lg font-semibold text-black sm:ml-4">
              Total: ৳{totalPrice}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
            <button className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-6 py-2 rounded">Add to Cart</button>
            <button className="bg-brand cursor-pointer text-white px-6 py-2 rounded">Shop Now</button>
            <button className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-6 py-2 rounded">WhatsApp</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ProductQuickView;

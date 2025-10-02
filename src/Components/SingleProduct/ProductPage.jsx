import { useState } from "react";
import { PiMinusThin } from "react-icons/pi";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { AiFillStar } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";

const ProductPage = () => {
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
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <div
            className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] rounded overflow-hidden cursor-grab"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
          >
            {/* Discount badge fixed */}
            <span className="absolute top-2 left-2 z-20 bg-red-600 text-white text-sm px-2 py-1 rounded">
              -{product.discount}%
            </span>

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
                style={{
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  transition: "transform 0.4s ease-out",
                }}
              />
            </AnimatePresence>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Thumb-${i}`}
                className={`w-20 h-20 p-1.5 sm:w-24 sm:h-24 flex-shrink-0 object-cover rounded border cursor-pointer ${selectedIndex === i ? "border-orange-500" : "border-gray-300"
                  }`}
                onClick={() => setSelectedIndex(i)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col gap-3">
          <p className="text-sm text-black">
            {product.category} / {product.subcategory} / {product.title}
          </p>
          <h2 className="text-xl sm:text-2xl font-medium text-primary">
            {product.title}
          </h2>

          {/* Only current price */}
          <p className="text-lg sm:text-xl font-semibold text-red-600">
            ৳{selectedVariation ? selectedVariation.price : product.price}
          </p>

          <div className="flex items-center gap-1 mb-1">
            {[...Array(product.rating)].map((_, i) => (
              <AiFillStar key={i} className="text-yellow-400" />
            ))}
            <span className="text-xs text-gray-500 ml-2">
              ({product.sold} sold)
            </span>
          </div>

          <p className="text-gray-600 text-sm">
            Brand: <span className="text-blue-600">{product.brand}</span>
          </p>
          <p className="text-secandari text-sm">{product.description}</p>

          <div className="text-gray-600 text-sm space-y-1">
            {product.warranty_period > 0 && (
              <p>
                Warranty:{" "}
                <span className="font-medium">
                  {product.warranty_period} months
                </span>
              </p>
            )}
            <p>
              Model Number:{" "}
              <span className="font-medium">{product.model_number}</span>
            </p>
            <p>
              Power Type: <span className="font-medium">{product.power_type}</span>
            </p>
            <p>
              Connector Type:{" "}
              <span className="font-medium">{product.connector_type}</span>
            </p>
          </div>

          {/* Color Selection */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <p className="font-medium text-base mb-1 w-full">Color:</p>
            <div className="flex flex-wrap gap-2">
              {product.variations.map((variation) => (
                <button
                  key={variation.id}
                  onClick={() => handleVariationSelect(variation)}
                  className={`px-3 py-1 text-xs rounded font-medium cursor-pointer ${selectedVariation?.id === variation.id
                      ? "bg-yellow-600 text-white border-yellow-600"
                      : "border border-gray-300 text-gray-700 bg-gray-100"
                    }`}
                >
                  {variation.color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Total */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-3 border-b pb-3 border-gray-300">
            <div className="flex items-center border rounded w-fit border-gray-300">
              <button
                className="p-2 cursor-pointer"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <PiMinusThin size={14} />
              </button>
              <div className="px-4 py-2 font-medium text-sm">{quantity}</div>
              <button
                className="p-2 cursor-pointer"
                onClick={() => setQuantity(quantity + 1)}
              >
                <HiOutlinePlusSmall size={14} />
              </button>
            </div>
            <p className="text-lg font-semibold text-black ml-0 sm:ml-4">
              Total: ৳{totalPrice}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-6 py-2 rounded">Add to Cart</button>
            <button className="bg-brand cursor-pointer text-white px-6 py-2 rounded">Shop Now</button>
            <button className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-6 py-2 rounded">WhatsApp</button>
          </div>
          {/* Share Section */}
          <div className="flex items-center gap-4 mt-4">
            <span className="font-medium text-sm text-gray-700">Share:</span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF className="text-blue-600 cursor-pointer" size={20} />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter className="text-sky-500 cursor-pointer" size={20} />
            </a>
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

export default ProductPage;

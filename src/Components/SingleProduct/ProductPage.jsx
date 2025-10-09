import { useEffect, useState } from "react";
import { PiMinusThin } from "react-icons/pi";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { AiFillStar } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { addtoCart } from "../../redux/reducer/ProductSlice";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ProductPage = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState(
    product.variations ? product.variations[0] : null
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const dispatch = useDispatch();
  useEffect(() => {
    setSelectedVariation(product.variations ? product.variations[0] : null);
    setSelectedIndex(0);
    setQuantity(1);
  }, [product]);

  const handleVariationSelect = (variation) => setSelectedVariation(variation);
  const totalPrice = selectedVariation
    ? selectedVariation.final_price * quantity
    : product.price * quantity;

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const textDescription = product.description
    ? product.description.replace(/<[^>]+>/g, "").substring(0, 200)
    : "";

  const handleAddToCart = () => {
    dispatch(addtoCart({
      id: product.id,
      title: product.title,
      price: selectedVariation?.final_price || product.price,
      quantity,
      image: product.images[0]?.image || "https://via.placeholder.com/150",
      variation: selectedVariation?.id || null, // add this line
    }));

    toast.success("Product added to cart successfully!");
  };
  const navigate = useNavigate();
  const handleShopNow = () => {
    dispatch(addtoCart({
      id: product.id,
      title: product.title,
      price: selectedVariation?.final_price || product.price,
      quantity,
      image: product.images[0]?.image || "https://via.placeholder.com/150",
    }));
    navigate("/checkout");
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="colored"
      />
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <div
            className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] rounded overflow-hidden cursor-grab"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
          >
            {product.discount > 0 && (
              <span className="absolute top-2 left-2 z-20 bg-red-600 text-white text-sm px-2 py-1 rounded">
                -{product.discount}%
              </span>
            )}
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedIndex}
                src={product.images[selectedIndex]?.image || "https://via.placeholder.com/300x300"}
                alt={product.title}
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
          <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
            {product.images.map((imgObj, i) => (
              <img
                key={i}
                src={imgObj.image || "https://via.placeholder.com/300x300"}
                alt={`Thumb-${i}`}
                className={`w-20 h-20 p-1.5 sm:w-24 sm:h-24 flex-shrink-0 object-cover rounded border cursor-pointer ${selectedIndex === i ? "border-orange-500" : "border-gray-300"}`}
                onClick={() => setSelectedIndex(i)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col gap-3">
          <p className="text-sm text-black">
            {product.category_name} / {product.subcategory_name} / {product.title}
          </p>
          <h2 className="text-xl sm:text-2xl font-medium text-primary">{product.title}</h2>

          <p className="text-lg sm:text-xl font-semibold text-red-600">
            ৳{selectedVariation ? selectedVariation.price : product.price}
          </p>

          <div className="flex items-center gap-1 mb-1">
            {[...Array(product.rating)].map((_, i) => (
              <AiFillStar key={i} className="text-yellow-400" />
            ))}
            <span className="text-xs text-gray-500 ml-2">({product.sold} sold)</span>
          </div>

          <p className="text-gray-600 text-sm">
            Brand: <span className="text-blue-600">{product?.brand_name}</span>
          </p>
          <p className="text-secandari text-sm">
            Description: <span className="text-primary">{textDescription}</span>
          </p>
          <div className="text-gray-600 text-sm space-y-1">
            {product.warranty_period > 0 && (
              <p>
                Warranty: <span className="font-medium">{product.warranty_period} months</span>
              </p>
            )}
            <p>
              Model Number: <span className="font-medium">{product.model_number}</span>
            </p>
            <p>
              Power Type: <span className="font-medium">{product.power_type}</span>
            </p>
            <p>
              Connector Type: <span className="font-medium">{product.connector_type}</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <p className="font-medium text-base mb-1 w-full">Color:</p>
            <div className="flex flex-wrap gap-2">
              {product.variations.map((variation) => (
                <button
                  key={variation.id}
                  onClick={() => handleVariationSelect(variation)}
                  className={`px-3 py-1 text-xs rounded font-medium cursor-pointer ${selectedVariation?.id === variation.id
                    ? "bg-yellow-600 text-white border-yellow-600"
                    : "border border-gray-300 text-gray-700 bg-gray-100"}`}
                >
                  {variation.color_name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-3 border-b pb-3 border-gray-300">
            <div className="flex items-center border rounded w-fit border-gray-300">
              <button className="p-2 cursor-pointer" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <PiMinusThin size={14} />
              </button>
              <div className="px-4 py-2 font-medium text-sm">{quantity}</div>
              <button className="p-2 cursor-pointer" onClick={() => setQuantity(quantity + 1)}>
                <HiOutlinePlusSmall size={14} />
              </button>
            </div>
            <p className="text-lg font-semibold text-black ml-0 sm:ml-4">
              Total: ৳{totalPrice}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="bg-brand text-white px-6 py-2 rounded"
              onClick={handleShopNow}
            >
              Shop Now
            </button>

            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded">WhatsApp</button>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <span className="font-medium text-sm text-gray-700">Share:</span>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noreferrer">
              <FaFacebookF className="text-blue-600 cursor-pointer" size={20} />
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noreferrer">
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

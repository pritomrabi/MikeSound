import { useState } from "react";
import { PiMinusThin } from "react-icons/pi";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";

const ProductQuickView = ({ setQuickView }) => {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVariation, setSelectedVariation] = useState(null);

  const images = ["home.jpg", "home.jpg", "home.jpg"];

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
      { id: 3, color: "Gold", price: 350, stock: 10 }
    ]
  };

  const handleVariationSelect = (variation) => {
    setSelectedVariation(variation);
  };

  const totalPrice = selectedVariation
    ? selectedVariation.price * quantity
    : product.price * quantity;

  return (
    <div
      className="fixed top-0 inset-0 bg-[rgba(0,0,0,0.2)] z-50 h-full w-full overflow-auto px-4 md:py-20 py-5 flex items-start justify-center"
      onClick={() => setQuickView(false)} // wrapper click closes modal
    >
      <div
        className="bg-[#fdfeff] dark:bg-[#1a1a1a] w-full max-w-full md:max-w-3xl lg:max-w-5xl rounded-lg shadow-lg flex flex-col md:flex-row mt-5 relative"
        onClick={(e) => e.stopPropagation()} // inner click does not close modal
      >
        <button
          className="absolute top-4 right-4 text-black hover:text-primary cursor-pointer transition duration-200"
          onClick={() => setQuickView(false)}
        >
          <IoClose size={25} />
        </button>

        {/* Left: Images */}
        <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
          <img
            src={images[currentImageIndex]}
            alt={`Product Image ${currentImageIndex + 1}`}
            className="md:h-[400px] sm:h-[250px] h-[250px] w-full object-cover rounded mb-4"
          />
          <div className="flex gap-2 overflow-x-auto">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setCurrentImageIndex(index)}
                className={`min-w-[60px] h-16 object-cover border-2 rounded cursor-pointer ${index === currentImageIndex
                  ? "border-yellow-600"
                  : "border-gray-400 hover:border-secandari transition duration-200"
                  }`}
                alt={`Thumbnail ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="w-full md:w-1/2 md:p-6 p-0 px-4 md:px-0">
          <p className="text-sm text-black mb-2">
            {product.category} / {product.subcategory} / {product.title}
          </p>
          <h2 className="text-2xl text-primary font-medium mb-2">
            {product.title}
          </h2>

          <p className="text-xl font-semibold text-black mb-2">
            ৳{selectedVariation ? selectedVariation.price : product.price}
            <span className="line-through text-gray-400 text-sm ml-2">
              ৳{product.oldPrice}
            </span>
            <span className="ml-2 text-brand">-{product.discount}%</span>
          </p>

          <div className="flex items-center gap-1 mb-2">
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

          <div className="mb-4 flex gap-3 flex-wrap items-center">
            <p className="font-medium text-base mb-1">Color:</p>
            <div className="flex gap-2 flex-wrap">
              {product.variations.map((variation) => (
                <button
                  key={variation.id}
                  onClick={() => handleVariationSelect(variation)}
                  className={`px-2.5 py-1.5 text-xs rounded font-medium cursor-pointer ${selectedVariation?.id === variation.id
                    ? "bg-yellow-600 text-white border-yellow-600"
                    : "border border-gray-300 text-gray-700 bg-gray-100"
                    }`}
                >
                  {variation.color}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 border-b pb-4 border-gray-300">
            <div className="flex border rounded w-fit border-gray-300 items-center gap-4">
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
            <p className="text-lg font-semibold text-black ml-4">
              Total: ৳{totalPrice}
            </p>
          </div>

          <div className="flex gap-4 mt-4">
            <button className="bg-brand text-white px-6 py-2 rounded cursor-pointer">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;

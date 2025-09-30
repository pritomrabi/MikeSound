import { useState } from "react";
import { PiMinusThin } from "react-icons/pi";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { AiFillStar } from "react-icons/ai";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVariation, setSelectedVariation] = useState(null);

  // Local Product Data
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
    warranty_period: 12, // months
    model_number: "AAW-2025",
    power_type: "Battery",
    connector_type: "USB-C",
    variations: [
      { id: 1, color: "Black", price: 289, stock: 50 },
      { id: 2, color: "Silver", price: 310, stock: 20 },
      { id: 3, color: "Gold", price: 350, stock: 10 }
    ],
    images: ["home.jpg", "home.jpg", "home.jpg"]
  };

  const handleVariationSelect = (variation) => {
    setSelectedVariation(variation);
  };

  const totalPrice = selectedVariation
    ? selectedVariation.price * quantity
    : product.price * quantity;

  return (
    <div className="container mx-auto md:px-4 px-2 md:py-8 py-2">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Section */}
        <div className="w-full md:w-1/2 md:p-5 p-3 flex flex-col md:flex-row gap-3">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:h-[450px] md:w-[100px] order-2 md:order-1 justify-center">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-[80px] h-[80px] md:w-[100px] md:h-[100px] object-cover border-2 cursor-pointer ${
                  idx === currentImageIndex
                    ? "border-yellow-600"
                    : "border-gray-300 hover:border-yellow-500 transition"
                }`}
                alt={`Thumbnail ${idx + 1}`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="relative overflow-hidden rounded-md flex justify-center items-center flex-1 order-1 md:order-2">
            <img
              src={product.images[currentImageIndex]}
              alt={`Product ${currentImageIndex + 1}`}
              className="w-full max-h-[350px] sm:max-h-[450px] object-cover rounded-md"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 md:p-6 p-0 px-4 md:px-0">
          <p className="text-sm text-black mb-2">
            {product.category} / {product.subcategory} / {product.title}
          </p>
          <h2 className="text-2xl text-primary font-medium mb-2">
            {product.title}
          </h2>

          <p className="text-xl font-semibold text-red-600 mb-2">
            ৳{selectedVariation ? selectedVariation.price : product.price}
            <span className="line-through text-gray-400 text-sm ml-2">
              ৳{product.oldPrice}
            </span>
            <span className="ml-2 text-green-600">-{product.discount}%</span>
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

          {/* Warranty, Model, Power, Connector */}
          <div className="text-gray-600 text-sm mb-4 space-y-1">
            {product.warranty_period > 0 && (
              <p>Warranty: <span className="font-medium">{product.warranty_period} months</span></p>
            )}
            <p>Model Number: <span className="font-medium">{product.model_number}</span></p>
            <p>Power Type: <span className="font-medium">{product.power_type}</span></p>
            <p>Connector Type: <span className="font-medium">{product.connector_type}</span></p>
          </div>

          {/* Color Selection */}
          <div className="mb-4 flex gap-3 flex-wrap items-center">
            <p className="font-medium text-base mb-1">Color:</p>
            <div className="flex gap-2 flex-wrap">
              {product.variations.map((variation) => (
                <button
                  key={variation.id}
                  onClick={() => handleVariationSelect(variation)}
                  className={`px-2.5 py-1.5 text-xs rounded font-medium cursor-pointer ${
                    selectedVariation?.id === variation.id
                      ? "bg-yellow-600 text-white border-yellow-600"
                      : "border border-gray-300 text-gray-700 bg-gray-100"
                  }`}
                >
                  {variation.color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Total Price */}
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
              <p className="text-lg font- font-semibold text-black ml-4">
                Total: ৳{totalPrice}
              </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded cursor-pointer">
              Add to Cart
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded cursor-pointer">
              WhatsAPP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

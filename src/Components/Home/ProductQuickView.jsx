import { useState } from "react";
import { PiMinusThin } from "react-icons/pi";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
const ProductQuickView = ({ setQuickcart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("XS");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const sizes = ["XS", "XL", "XXL"];
  const images = ["home.jpg", "home.jpg", "home.jpg"];

  const product = {
    title: "Arabic Aura Watch",
    price: "৳289",
    oldPrice: "৳1999",
    sold: 321,
    rating: 4,
    discount: "-86%",
    brand: "No Brand",
    color: "Black",
    description:
      "Simple and stylish Arabic aura watch with black dial and Arabic numerals."
  };

  return (
    <div className="fixed top-0 inset-0 bg-[rgba(0,0,0,0.2)] bg-opacity-40 z-50 h-full w-full overflow-auto px-4 md:py-20 py-5 flex items-start justify-center">
      <div className="bg-[#fdfeff] dark:bg-[#1a1a1a] w-full max-w-full md:max-w-3xl lg:max-w-5xl rounded-lg shadow-lg flex flex-col md:flex-row mt-5">
        {/* Left: Image Slider */}
        <button className="absolute top-4 right-4 text-white  cursor-pointer transition duration-200 block  md:hidden">
          <IoClose onClick={() => setQuickcart(false)} size={25} />
        </button>
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
        <div className="w-full md:w-1/2 p-6 relative">
          <button className="absolute top-4 right-4 text-secandari hover:text-primary hover:dark:text-primary-dark cursor-pointer transition duration-200 hidden md:block">
            <IoClose onClick={() => setQuickcart(false)} size={25} />
          </button>
          <p className="text-sm text-black mb-2">Watches / Casual / Arabic Aura</p>
          <h2 className="text-2xl text-primary dark:text-primary-dark font-medium mb-2">
            {product.title}
          </h2>

          <p className="text-xl font-semibold text-red-600 mb-2">
            {product.price}
            <span className="line-through text-gray-400 text-sm ml-2">
              {product.oldPrice}
            </span>
            <span className="ml-2 text-green-600">{product.discount}</span>
          </p>

          <div className="flex items-center gap-1 mb-2">
            {[...Array(product.rating)].map((_, i) => (
              <AiFillStar key={i} className="text-yellow-400" />
            ))}
            <span className="text-xs text-gray-500 ml-2">
              ({product.sold} ratings)
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-2">
            Brand: <span className="text-blue-600 cursor-pointer">{product.brand}</span>
          </p>
          <p className="text-gray-600 text-sm mb-4">
            Color Family: <span className="font-medium">{product.color}</span>
          </p>

          <p className="text-secandari text-sm mb-4">{product.description}</p>

          {/* Size Selection */}
          <div className="mb-4 flex gap-3 flex-wrap items-center">
            <p className="font-medium text-base mb-1">Size:</p>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-2.5 py-1.5 text-[10px] rounded font-medium cursor-pointer ${selectedSize === size
                    ? "bg-yellow-600 text-white border-yellow-600"
                    : "border border-gray-300 text-gray-700 bg-gray-100"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Cart */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 border-b pb-4 border-gray-300">
            <div className="flex border rounded w-fit border-gray-300">
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
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded cursor-pointer">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;

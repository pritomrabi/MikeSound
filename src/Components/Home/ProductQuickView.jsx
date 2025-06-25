import { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterest,
  FaLinkedinIn,
} from "react-icons/fa";
import { PiMinusThin } from "react-icons/pi";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

const ProductQuickView = ({ setQuickcart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("XS");
  const sizes = ["XS", "XL", "XXL"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ["home.jpg", "home.jpg", "home.jpg", "home.jpg"];

  return (
    <div className="fixed top-0 inset-0 bg-[rgba(0,0,0,0.2)] bg-opacity-40 z-50 h-full w-full overflow-auto px-4 py-6 flex items-start justify-center">
      <div className="bg-[#fdfeff] dark:bg-[#1a1a1a] w-full max-w-full md:max-w-3xl lg:max-w-5xl rounded-lg shadow-lg flex flex-col md:flex-row mt-5">
        {/* Left: Image Slider */}
        <button className="absolute top-4 right-4 text-white  cursor-pointer transition duration-200 block  md:hidden">
          <IoClose onClick={() => setQuickcart(false)} size={25} />
        </button>
        <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
          <img
            src={images[currentImageIndex]}
            alt={`Product Image ${currentImageIndex + 1}`}
            className="max-h-[400px] w-full object-cover rounded mb-4"
          />
          <div className="flex gap-2 overflow-x-auto">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setCurrentImageIndex(index)}
                className={`min-w-[60px] h-16 object-cover border-2 rounded cursor-pointer ${
                  index === currentImageIndex
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

          <h2 className="text-2xl text-primary dark:text-primary-dark font-Lato font-medium mb-2 pt-4">
            Wini Dress Top Layer
          </h2>
          <p className="text-xl text-brand font-Monrope font-semibold ">
            $199.00
          </p>
          <p className="text-secandari text-sm font-Lato font-normal my-4">
            Posuere in netus a eu varius adipiscing suspendisse elementum vitae
            tempor suspendisse ullamcorper aenean taciti morbi potenti cursus id
            tortor. Cursus nulla consectetur a eros adipiscing himenaeos nam
            taciti id turpis a scelerisque vel habitasse.
          </p>

          {/* Size Selection */}
          <div className="mb-4 flex gap-3 pb-2 flex-wrap items-center">
            <p className="font-medium font-Lato text-base text-primary dark:text-primary-dark mb-1">
              Size:
            </p>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-2.5 py-1.5 text-[10px] text-primary font-Nunito-font rounded font-medium cursor-pointer
                  ${
                    selectedSize === size
                      ? "bg-yellow-600 text-white border-yellow-600"
                      : "border-gray-300 text-gray-700 bg-gray-100"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 border-b pb-4 border-gray-300">
            <div className="flex border rounded border-gray-300">
              <button
                className="p-2 cursor-pointer"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <PiMinusThin size={14} />
              </button>
              <div className="px-4 py-2 font-medium font-Monrope text-secandari text-sm">
                {quantity}
              </div>
              <button
                className="p-2 cursor-pointer"
                onClick={() => setQuantity(quantity + 1)}
              >
                <HiOutlinePlusSmall size={14} />
              </button>
            </div>
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded cursor-pointer text-base font-Monrope font-normal transition duration-200">
              Add to Cart
            </button>
          </div>

          {/* SKU and Category */}
          <p className="text-sm text-secandari font-Lato font-medium mb-1">
            <strong className="text-primary dark:text-primary-dark">
              SKU:
            </strong>{" "}
            N/A
          </p>
          <p className="text-sm text-secandari font-Lato font-medium mb-4">
            <strong className="text-primary dark:text-primary-dark">
              Category:
            </strong>{" "}
            Fashion Flat
          </p>

          {/* Social Share */}
          <div className="flex gap-3 text-gray-600 dark:text-primary-dark text-sm">
            <FaFacebookF className="hover:text-blue-600 duration-500 cursor-pointer" />
            <FaTwitter className="hover:text-blue-400 duration-500 cursor-pointer" />
            <FaPinterest className="hover:text-red-600 duration-500 cursor-pointer" />
            <FaLinkedinIn className="hover:text-blue-700 duration-500 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;

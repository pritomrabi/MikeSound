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
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] bg-opacity-40 flex justify-center items-center z-50 h-full">
      <div className="bg-white max-w-5xl w-full rounded-lg overflow-hidden shadow-lg flex">
        {/* Left: Image */}
        {/* Left: Image Slider */}
        <div className="w-1/2 p-4 flex flex-col items-center justify-center">
          {/* Main Image */}
          <img
            src={images[currentImageIndex]}
            alt={`Product Image ${currentImageIndex + 1}`}
            className="max-h-[400px] w-full object-cover rounded mb-4"
          />

          {/* Thumbnails */}
          <div className="flex gap-2">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-16 h-16 object-cover border-2 rounded cursor-pointer ${
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
        <div className="w-1/2 p-6 relative ">
          <button className="absolute top-4 right-4 text-secandari hover:text-primary cursor-pointer transition duration-200">
            <IoClose onClick={() => setQuickcart(false)} size={25} />
          </button>

          <h2 className="text-2xl text-primary font-Lato font-medium mb-2 pt-4">
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
          {/* Size */}
          <div className="mb-4 flex gap-5 pb-2">
            <p className="font-medium font-Lato text-base text-primary mb-2">
              Size :
            </p>
            <div className="flex gap-2 items-center justify-center">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={` px-2.5 py-1.5 text-[10px] text-primary font-Nunito-font rounded font-medium cursor-pointer
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
          <div className="flex items-center gap-4 mb-4 border-b pb-4 border-gray-300">
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
            <strong className="text-primary">SKU :</strong> N/A
          </p>
          <p className="text-sm text-secandari font-Lato font-medium mb-4">
            <strong className="text-primary">Category:</strong> Fashion Flat
          </p>

          {/* Share */}
          <div className="flex gap-3 text-gray-600 text-sm">
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

import { useState } from "react";
import { PiMinusThin } from "react-icons/pi";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { AiOutlineShoppingCart, AiFillStar } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";

const ProductPage = ({ type = "bigdeal" }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("XS");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quickView, setQuickView] = useState(false);

  const sizes = ["XS", "XL", "XXL"];
  const images = ["home.jpg", "home.jpg", "home.jpg"];

  const product = {
    title: "Wini Dress Top Layer",
    price: "$199.00",
    oldPrice: "$249.00",
    sold: 120,
    rating: 4.5,
    discount: type === "bigdeal" ? "20%" : null,
    description:
      "Posuere in netus a eu varius adipiscing suspendisse elementum vitae tempor suspendisse ullamcorper aenean taciti morbi potenti cursus id tortor.",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Section */}
        <div className="w-full md:w-1/2 p-4 flex flex-col gap-4">
          <div className="relative overflow-hidden rounded-md">
            <img
              src={images[currentImageIndex]}
              alt={`Product ${currentImageIndex + 1}`}
              className="w-full max-h-[450px] object-cover rounded-md"
            />
            {type === "bigdeal" && (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                {product.discount}
              </span>
            )}
            <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition bg-black/30">
              <button className="text-white text-xl hover:text-gray-200">
                <AiOutlineShoppingCart />
              </button>
              <button
                onClick={() => setQuickView(true)}
                className="text-white text-xl hover:text-gray-200"
              >
                <LuSearch />
              </button>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-[100px] h-24 object-cover border-2 cursor-pointer ${idx === currentImageIndex
                    ? "border-yellow-600"
                    : "border-gray-300 hover:border-yellow-500 transition duration-200"
                  }`}
                alt={`Thumbnail ${idx + 1}`}
              />
            ))}
          </div>
        </div>
        {/* Product Details */}
        <div className="w-full md:w-1/2 p-6">
          <p className="text-sm text-black mb-2">Home / Shop / Dress</p>
          <h2 className="text-2xl text-primary dark:text-primary-dark font-Lato font-medium mb-2">
            {product.title}
          </h2>
          <p className="text-xl text-brand font-Monrope font-semibold mb-2">
            {product.price}{" "}
            {type === "bestseller" && (
              <span className="line-through text-gray-400 text-sm ml-2">
                {product.oldPrice}
              </span>
            )}
          </p>

          {type === "bestseller" && (
            <div className="flex items-center gap-1 mb-2">
              {[...Array(Math.floor(product.rating))].map((_, i) => (
                <AiFillStar key={i} className="text-yellow-400" />
              ))}
              {product.rating % 1 !== 0 && <AiFillStar className="text-yellow-400 opacity-50" />}
              <span className="text-xs text-gray-500 ml-2">({product.sold} sold)</span>
            </div>
          )}

          <p className="text-secandari text-sm font-Lato my-4">{product.description}</p>

          {/* Size Selection */}
          <div className="mb-4 flex gap-3 flex-wrap items-center">
            <p className="font-medium text-base text-primary dark:text-primary-dark mb-1">Size:</p>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-2.5 py-1.5 text-[10px] text-primary font-Nunito-font rounded font-medium cursor-pointer ${selectedSize === size
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
            <div className="flex border rounded w-fit border-gray-300">
              <button
                className="p-2 cursor-pointer"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <PiMinusThin size={14} />
              </button>
              <div className="px-4 py-2 font-medium font-Monrope text-secandari text-sm">{quantity}</div>
              <button className="p-2 cursor-pointer" onClick={() => setQuantity(quantity + 1)}>
                <HiOutlinePlusSmall size={14} />
              </button>
            </div>
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded cursor-pointer text-base font-Monrope transition duration-200">
              Add to Cart
            </button>
          </div>

          <p className="text-sm text-secandari font-Lato font-medium mb-4">
            <strong className="text-primary dark:text-primary-dark">Category:</strong> Fashion Flat
          </p>
        </div>
      </div>

      {quickView && <ProductQuickView setQuickcart={setQuickView} />}
    </div>
  );
};

export default ProductPage;

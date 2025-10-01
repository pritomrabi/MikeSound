// ProductCard.jsx
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";

const ProductCard = ({ product, onQuickView }) => {

  if (!product.title && !product.rating && !product.description) {
    return null;
  }

  return (
    <div className="relative group bg-white dark:bg-[#2a2a2a] rounded-md shadow-md overflow-hidden">
      {/* Image */}
      <Link to="/singleproduct">
        <div className="relative overflow-hidden rounded-t-md">
          <img
            src={product.img}
            alt={product.title || "Product Image"}
            className="w-full h-48 sm:h-68 md:h-64 lg:h-68 object-cover transform transition-transform duration-500 group-hover:scale-105"
          />

          {/* Discount Badge */}
          {product.oldPrice && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-Monrope font-bold px-2 py-3.5 rounded-full">
              -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="md:p-4 p-4">
        <Link to="/singleproduct">
          {product.title && (
            <h3 className="text-base font-medium font-Lato text-primary-default dark:text-primary-dark font-Roboto">
              {product.title.substring(0, 25)}...
            </h3>
          )}
          <p className="text-md font-bold text-brand font-Monrope text-start">৳{product.price}</p>

          {product.oldPrice && (
            <div className="flex gap-2">
              <p className="text-md font-normal text-secandari line-through font-Monrope">৳{product.oldPrice}</p>
            </div>
          )}

          {product.rating && (
            <div className="flex items-center gap-1 mt-1">
              {[...Array(Math.floor(product.rating))].map((_, i) => (
                <AiFillStar key={i} className="text-yellow-400" />
              ))}
              {product.rating % 1 !== 0 && <AiFillStar className="text-yellow-400 opacity-50" />}
              {product.sold && <span className="text-xs text-gray-500 ml-2">({product.sold} sold)</span>}
            </div>
          )}
        </Link>
      </div>

      {/* Overlay Icons */}
      <div className="absolute top-[25%] right-2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition flex flex-col gap-4 bg-white py-2.5 px-3 rounded shadow z-10">
        {/* Quick View */}
        <div className="relative group/icon">
          <button
            onClick={onQuickView}
            className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer"
          >
            <LuSearch />
          </button>
          <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100 whitespace-nowrap">
            Quick View
          </span>
        </div>
        <div className="relative group/icon">
          <button
            className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer"
          >
            <IoCartOutline />
          </button>
          <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100 whitespace-nowrap">
            Add To Cart
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

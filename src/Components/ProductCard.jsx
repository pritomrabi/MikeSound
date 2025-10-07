import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addtoCart } from "../redux/reducer/ProductSlice";
const ProductCard = ({ product, onQuickView }) => {
  if (!product || !product.title) return null;

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addtoCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.img || "https://via.placeholder.com/150",
    }));
    toast.success("Product added to cart successfully!");
  };

  return (
    <div className="relative group bg-white dark:bg-[#2a2a2a] rounded-md shadow-md overflow-hidden">
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
      {/* Image */}
      <Link to={`/singleproduct/${product.id}`}>
        <div className="relative overflow-hidden rounded-t-md">
          <img
            src={product.img}
            alt={product.title || "Product Image"}
            className="w-full h-40 sm:h-68 md:h-64 lg:h-68 object-cover transform transition-transform duration-500 group-hover:scale-105"
          />
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] sm:text-xs font-Monrope font-bold px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="md:p-4 p-4">
        <Link to={`/singleproduct/${product.id}`}>
          <h3 className="text-base font-medium font-Lato text-primary-default dark:text-primary-dark">
            {product.title.length > 25
              ? product.title.substring(0, 25) + "..."
              : product.title}
          </h3>

          <p className="text-md font-bold text-brand font-Monrope text-start">
            ৳{product.price}
          </p>

          {product.oldPrice && (
            <p className="text-md font-normal text-secandari line-through font-Monrope">
              ৳{product.oldPrice}
            </p>
          )}

          {product.rating && (
            <div className="flex items-center gap-1 mt-1">
              {[...Array(Math.floor(product.rating))].map((_, i) => (
                <AiFillStar key={i} className="text-yellow-400" />
              ))}
              {product.rating % 1 !== 0 && <AiFillStar className="text-yellow-400 opacity-50" />}
              {product.sold && (
                <span className="text-xs text-gray-500 ml-2">({product.sold} sold)</span>
              )}
            </div>
          )}
        </Link>
      </div>

      {/* Overlay Icons */}
      <div className="absolute top-[25%] right-2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition flex flex-col gap-4 bg-white py-2.5 px-3 rounded shadow z-10">
        <div className="relative group/icon">
          <button
            onClick={() => onQuickView(product.id)}
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
            onClick={() => handleAddToCart(product)}
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

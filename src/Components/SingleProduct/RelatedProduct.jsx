import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProductQuickView from "../Home/ProductQuickView";
const RelatedProduct = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const [quickcart, setQuickcart] = useState(false);
  return (
    <section>
      <div className="container mx-auto px-3">
        <div className=" mx-auto px-4 py-10 ">
          <h2 className="text-2xl font-normal text-primary dark:text-primary-dark font-Roboto mb-6">
            Related Products
          </h2>
          <Slider {...settings}>
            <div className="group relative rounded-md shadow-sm  transition overflow-hidden">
              <div className="overflow-hidden rounded-md">
                <img
                  src="home.jpg"
                  alt="home"
                  className="w-full h-80 object-cover transform transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                />
              </div>

              <div className=" text-center space-y-1 p-3">
                <div className="flex justify-center gap-2 text-xs text-primary dark:text-primary-dark font-medium font-Lato">
                  {/* Optional sizes */}
                  <span>XS</span>
                  <span>S</span>
                  <span>XL</span>
                </div>
                <h3 className="text-sm font-medium text-primary font-Roboto ">
                  Men's Slim Fit Shirt
                </h3>
                <p className="text-xs text-secandari font-medium font-Lato">
                  Fashion Flat
                </p>
                <p className="text-md font-bold text-brand font-Monrope">
                  $99.00
                </p>
              </div>

              {/* Hover icons (stay inside structure) */}
              <div className="absolute bottom-32 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition flex gap-4 bg-white py-2.5 px-5 rounded shadow z-10">
                {/* Add to Cart */}
                <div className="relative group/icon">
                  <button className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer">
                    <AiOutlineShoppingCart />
                  </button>
                  <span className="absolute  bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100 transition whitespace-nowrap font-Lato font-normal">
                    Add to cart
                  </span>
                </div>

                {/* Search */}
                <div className="relative group/icon">
                  <button className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer">
                    <LuSearch onClick={() => setQuickcart(true)} />
                  </button>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100 transition whitespace-nowrap font-Lato font-normal">
                    Search
                  </span>
                </div>

                {/* Wishlist */}
                <Link to="/wishlist" className="relative group/icon">
                  <button className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer">
                    <FaRegHeart />
                  </button>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100 transition whitespace-nowrap font-Lato font-normal">
                    Wishlist
                  </span>
                </Link>
              </div>
            </div>
          </Slider>
          {quickcart && <ProductQuickView setQuickcart={setQuickcart} />}
        </div>
      </div>
    </section>
  );
};

export default RelatedProduct;

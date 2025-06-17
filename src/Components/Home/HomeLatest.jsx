import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Heading from "../../Utilities/Heading";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import ProductQuickView from "./ProductQuickView";
const HomeLatest = () => {
  const [quickcart, setQuickcart] = useState(false);
  const posts = [
    {
      date: "23 JUL",
      image: "home.jpg",
      category: ["DESIGN TRENDS", "INSPIRATION"],
      title: "Creative water features and exterior",
      author: "S. Rogers",
      description:
        "Adipiscing hac imperdiet id blandit varius scelerisque at sagittis libero dui dis volutpat vehicula...",
    },
    {
      date: "23 JUL",
      image: "home.jpg",
      category: ["DESIGN TRENDS", "INSPIRATION"],
      title: "Creative water features and exterior",
      author: "S. Rogers",
      description:
        "Adipiscing hac imperdiet id blandit varius scelerisque at sagittis libero dui dis volutpat vehicula...",
    },
    {
      date: "23 JUL",
      image: "home.jpg",
      category: ["DESIGN TRENDS", "INSPIRATION"],
      title: "Creative water features and exterior",
      author: "S. Rogers",
      description:
        "Adipiscing hac imperdiet id blandit varius scelerisque at sagittis libero dui dis volutpat vehicula...",
    },
    {
      date: "23 JUL",
      image: "https://via.placeholder.com/300x300",
      category: ["DESIGN TRENDS", "FURNITURE"],
      title: "Exterior ideas: 10 colored garden seats",
      author: "S. Rogers",
      description:
        "A sed a risusat luctus esta anibh rhoncus hendrerit blandit nam rutrum stimid hac...",
    },
    {
      date: "23 JUL",
      image: "https://via.placeholder.com/300x300",
      category: ["DECORATION", "DESIGN TRENDS"],
      title: "The big design: Wall likes pictures",
      author: "S. Rogers",
      description:
        "Parturient in potenti id rutrum duis torquent scelerisque sit vestibulum a posuere...",
    },
    {
      date: "23 JUL",
      image: "https://via.placeholder.com/300x300",
      category: ["DESIGN TRENDS", "HAND MADE"],
      title: "Sweet seat: functional seat for IT folks",
      author: "S. Rogers",
      description:
        "A sed a risusat luctus esta anibh rhoncus hendrerit blandit nam rutrum stimid hac...",
    },
  ];
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <Heading Head="Our Latest Posts" />
        <div className="w-full px-6 py-10 bg-[#fdfeff] dark:bg-black">
          <Swiper
            modules={[Navigation, Pagination]}
            className="!pb-14"
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {posts.map((post, index) => (
              <SwiperSlide key={index}>
                <div className="group relative rounded-md shadow-sm  transition overflow-hidden">
                  <div className="overflow-hidden rounded-md">
                    <img
                      src="home.jpg"
                      alt="home"
                      className="w-full h-80 object-cover transform transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                    />
                  </div>

                  <div className=" text-center space-y-1 p-3">
                    <div className="flex justify-center gap-2 text-xs text-primary-default dark:text-primary-dark font-medium font-Lato">
                      {/* Optional sizes */}
                      <span>XS</span>
                      <span>S</span>
                      <span>XL</span>
                    </div>
                    <h3 className="text-sm font-medium text-primary-default dark:text-primary-dark font-Roboto ">
                      Men's Slim Fit Shirt
                    </h3>
                    <p className="text-xs text-secandari-default dark:text-secandari-dark font-medium font-Lato">
                      Fashion Flat
                    </p>
                    <p className="text-md font-bold text-brand font-Monrope">
                      $99.00
                    </p>
                  </div>

                  {/* Hover icons (stay inside structure) */}
                  <div className="absolute bottom-32 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition flex gap-4 bg-white py-2.5 px-5 rounded shadow z-10">
                    {/* Add to Cart */}
                    <Link to="/singleproduct" className="relative group/icon">
                      <button className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer">
                        <AiOutlineShoppingCart />
                      </button>
                      <span className="absolute  bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100 transition whitespace-nowrap font-Lato font-normal">
                        Add to cart
                      </span>
                    </Link>

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
              </SwiperSlide>
            ))}
          </Swiper>
          {quickcart && <ProductQuickView setQuickcart={setQuickcart} />}
        </div>
      </div>
    </section>
  );
};

export default HomeLatest;

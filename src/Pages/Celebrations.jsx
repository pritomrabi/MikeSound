import { AiOutlineShoppingCart } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import Heading from "../Utilities/Heading";
import ProductQuickView from "../Components/Home/ProductQuickView";

const Celebrations = () => {
  const [quickcart, setQuickcart] = useState(false);
  const posts = [
    { title: "Creative water features and exterior", price: 99.0, img: "home.jpg" },
    { title: "Creative water features and exterior", price: 99.0, img: "home.jpg" },
    { title: "Exterior ideas: 10 colored garden seats", price: 120.0, img: "https://via.placeholder.com/300x300" },
    { title: "Exterior ideas: 10 colored garden seats", price: 120.0, img: "https://via.placeholder.com/300x300" },
    { title: "The big design: Wall likes pictures", price: 75.0, img: "https://via.placeholder.com/300x300" },
    { title: "The big design: Wall likes pictures", price: 75.0, img: "https://via.placeholder.com/300x300" },
    { title: "Sweet seat: functional seat for IT folks", price: 89.0, img: "https://via.placeholder.com/300x300" },
    { title: "Sweet seat: functional seat for IT folks", price: 89.0, img: "https://via.placeholder.com/300x300" },
  ];

  return (
    <section className="dark:bg-[#212020] py-16 md:py-24">
      <div className="container mx-auto md:px-4 px-1">
        <Heading Head="Celebrations" />
        <div className="w-full sm:px-6 px-0 py-10 dark:bg-[#212020]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {posts.map((post, idx) => (
              <div
                key={idx}
                className="group relative rounded-md shadow-sm transition overflow-hidden"
              >
                <div className="overflow-hidden rounded-t-md">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-52 sm:h-56 object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="text-center dark:bg-[#2a2a2a] space-y-1 md:p-3 p-2 shadow rounded-b-md">
                  <Link to="/singleproduct">
                    <h3 className="text-base font-medium text-primary-default dark:text-primary-dark font-Roboto">
                      {post.title.substring(0, 25)}...
                    </h3>
                    <p className="text-md font-bold text-brand font-Monrope text-start">
                      ৳{post.price}
                    </p>
                    <div className="flex gap-2">
                      <p className="text-md font-normal text-secandari line-through font-Monrope">
                        ৳{Math.max(195, post.price * 1.2)}
                      </p>
                      <span className="text-md font-normal text-primary dark:text-white font-Monrope">
                        -
                        {Math.round(
                          ((Math.max(195, post.price * 1.2) - post.price) /
                            Math.max(195, post.price * 1.2)) *
                            100
                        )}
                        %
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="absolute xl:bottom-32 bottom-28 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition flex gap-4 bg-white py-2.5 px-5 rounded shadow z-10">
                  <Link to="/singleproduct" className="relative group/icon">
                    <button className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer">
                      <AiOutlineShoppingCart />
                    </button>
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100 whitespace-nowrap">
                      Add to cart
                    </span>
                  </Link>
                  <div className="relative group/icon">
                    <button
                      onClick={() => setQuickcart(true)}
                      className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer"
                    >
                      <LuSearch />
                    </button>
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100 whitespace-nowrap">
                      Search
                    </span>
                  </div>
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
            ))}
          </div>
          {quickcart && <ProductQuickView setQuickcart={setQuickcart} />}
        </div>
      </div>
    </section>
  );
};

export default Celebrations;

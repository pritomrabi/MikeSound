import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Heading from "../../Utilities/Heading";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useState } from "react";
import ProductQuickView from "./ProductQuickView";

const HomeLatest = () => {
  const [quickcart, setQuickcart] = useState(false);
  const posts = [
    { title: "Creative water features and exterior", price: "$99.00", img: "home.jpg" },
    { title: "Exterior ideas: 10 colored garden seats", price: "$120.00", img: "https://via.placeholder.com/300x300" },
    { title: "The big design: Wall likes pictures", price: "$75.00", img: "https://via.placeholder.com/300x300" },
    { title: "Sweet seat: functional seat for IT folks", price: "$89.00", img: "https://via.placeholder.com/300x300" },
  ];

  return (
    <section className="py-12 dark:bg-[#212020]">
      <div className="container mx-auto px-4">
        <Heading Head="Our Latest Posts" />
        <div className="w-full  px-6 py-10 bg-[#fdfeff] dark:bg-[#212020]">
          <Swiper modules={[Navigation, Pagination]} className="!pb-14" spaceBetween={20} slidesPerView={1} pagination={{ clickable: true }} breakpoints={{768:{slidesPerView:2},1024:{slidesPerView:3},1280:{slidesPerView:4}}}>
            {posts.map((post, idx) => (
              <SwiperSlide key={idx}>
                <Link className="group h-40 relative rounded-md shadow-sm  transition overflow-hidden bg-amber-200">
                  <div className="overflow-hidden rounded-t-md">
                    <img src={post.img} alt={post.title} className="w-full h-80 object-cover transform transition-transform duration-500 group-hover:scale-105 cursor-pointer" />
                  </div>
                  <div className="text-center space-y-1 px-3 py-5 shadow rounded-b-md ">
                    <h3 className="text-sm font-medium text-primary-default dark:text-primary-dark font-Roboto">{post.title}</h3>
                    <p className="text-md font-bold text-brand font-Monrope">{post.price}</p>
                  </div>
                  <div className="absolute bottom-32 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition flex gap-4 bg-white py-2.5 px-5 rounded shadow z-10">
                    <Link to="/singleproduct" className="relative group/icon">
                      <button className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer"><AiOutlineShoppingCart /></button>
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100">Add to cart</span>
                    </Link>
                    <div className="relative group/icon">
                      <button onClick={() => setQuickcart(true)} className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer"><LuSearch /></button>
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100">Search</span>
                    </div>
                  </div>
                </Link>
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

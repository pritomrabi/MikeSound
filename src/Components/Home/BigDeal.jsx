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

const BigDeal = () => {
  const [quickView, setQuickView] = useState(false);

  const products = [
    { title: "Creative water features", price: "$99.00", oldPrice: "$129.00", img: "home.jpg", discount: "23%" },
    { title: "10 colored garden seats", price: "$120.00", oldPrice: "$150.00", img: "https://via.placeholder.com/300x300", discount: "20%" },
    { title: "Wall design pictures", price: "$75.00", oldPrice: "$95.00", img: "https://via.placeholder.com/300x300", discount: "21%" },
    { title: "Functional IT seat", price: "$89.00", oldPrice: "$110.00", img: "https://via.placeholder.com/300x300", discount: "19%" },
  ];

  return (
    <section className="py-12 dark:bg-[#1b1b1b]">
      <div className="container mx-auto px-4">
        <Heading Head="Big Deals Today" />
        <div className="w-full px-6 py-10">
          <Swiper
            modules={[Navigation, Pagination]}
            className="!pb-14"
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{768:{slidesPerView:2},1024:{slidesPerView:3},1280:{slidesPerView:4}}}
          >
            {products.map((product, idx) => (
              <SwiperSlide key={idx}>
                <Link className="group relative rounded-md shadow-md overflow-hidden bg-white dark:bg-[#2a2a2a]">
                  <div className="relative overflow-hidden rounded-t-md">
                    <img
                      src={product.img}
                      alt={product.title}
                      className="w-full h-80 object-cover transform transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                    />
                    <span className="absolute top-3 left-3 bg-brand text-white text-xs font-Lato font-bold px-2 py-1 rounded">{product.discount} OFF</span>
                  </div>
                  <div className="text-center space-y-1 px-3 py-5 shadow rounded-b-md">
                    <h3 className="text-sm font-medium text-primary dark:text-primary-dark font-Roboto">{product.title}</h3>
                    <p className="text-md font-bold text-brand font-Monrope">
                      {product.price} <span className="line-through text-gray-400 text-sm ml-2">{product.oldPrice}</span>
                    </p>
                  </div>
                  <div className="absolute bottom-32 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition flex gap-4 bg-white py-2.5 px-5 rounded shadow z-10">
                    <Link to="/singleproduct" className="relative group/icon">
                      <button className="text-xl text-primary hover:text-secondary duration-200 cursor-pointer"><AiOutlineShoppingCart /></button>
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100">Add to cart</span>
                    </Link>
                    <div className="relative group/icon">
                      <button onClick={() => setQuickView(true)} className="text-xl text-primary hover:text-secondary duration-200 cursor-pointer"><LuSearch /></button>
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100">Quick View</span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          {quickView && <ProductQuickView setQuickcart={setQuickView} />}
        </div>
      </div>
    </section>
  );
};

export default BigDeal;

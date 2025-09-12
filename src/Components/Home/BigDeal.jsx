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
    { title: "Creative water features", price: "$99.00", oldPrice: "$129.00", img: "home.jpg", discount: "23%" },
    { title: "Creative water features", price: "$99.00", oldPrice: "$129.00", img: "home.jpg", discount: "23%" },
    { title: "Creative water features", price: "$99.00", oldPrice: "$129.00", img: "home.jpg", discount: "23%" },
    { title: "Creative water features", price: "$99.00", oldPrice: "$129.00", img: "home.jpg", discount: "23%" },
    { title: "Creative water features", price: "$99.00", oldPrice: "$129.00", img: "home.jpg", discount: "23%" },
    { title: "Creative water features", price: "$99.00", oldPrice: "$129.00", img: "home.jpg", discount: "23%" },
    { title: "Creative water features", price: "$99.00", oldPrice: "$129.00", img: "home.jpg", discount: "23%" },
    { title: "Creative water features", price: "$99.00", oldPrice: "$129.00", img: "home.jpg", discount: "23%" },
    { title: "Creative water features", price: "$99.00", oldPrice: "$129.00", img: "home.jpg", discount: "23%" },
    { title: "Creative water features", price: "$99.00", oldPrice: "$129.00", img: "home.jpg", discount: "23%" },
    { title: "Creative water features", price: "$99.00", oldPrice: "$129.00", img: "home.jpg", discount: "23%" },
  ];

  return (
    <section className="md:py-12 sm:py-9 py-6 dark:bg-[#1b1b1b]">
      <div className="container mx-auto px-4">
        <Heading Head="Big Deals Today" />
        <div className="w-full sm:px-6 px-0 py-10">
          <Swiper
            modules={[Navigation, Pagination]}
            className="!pb-14"
            spaceBetween={10}
            slidesPerView={1}
            pagination={false}
            breakpoints={{ 0: { slidesPerView: 2 }, 640: { slidesPerView: 3 }, 768: { slidesPerView: 4 }, 1024: { slidesPerView: 5 }, 1280: { slidesPerView: 6 } }}
          >
            {products.map((product, idx) => (
              <SwiperSlide key={idx}>
                <Link className="group relative rounded-md shadow-md overflow-hidden bg-white dark:bg-[#2a2a2a]">
                  <div className="relative overflow-hidden rounded-t-md">
                    <img
                      src={product.img}
                      alt={product.title}
                      className="w-full h-52 sm:h-56 object-cover transform transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                    />
                    <span className="absolute top-3 left-3 bg-brand text-white text-xs font-Lato font-bold px-2 py-1 rounded">{product.discount} OFF</span>
                  </div>
                  <div className=" dark:bg-[#2a2a2a] text-center space-y-1 px-3 py-5 shadow rounded-b-md ">
                    <Link to="/singleproduct">
                      <h3 className="text-base font-medium text-primary-default dark:text-primary-dark font-Roboto">{product.title.substring(0, 25)}...</h3>
                      <p className="text-md font-bold text-brand font-Monrope text-start">৳{product.price}</p>
                      <div className="flex gap-2">
                        <p className="text-md font-normal text-secandari line-through font-Monrope">৳195</p>
                        <span className="text-md font-normal text-primary dark:text-white font-Monrope ">-7%</span>
                      </div>
                    </Link>
                  </div>
                  <div className="absolute xl:bottom-32 bottom-44 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition flex gap-4 bg-white py-2.5 px-5 rounded shadow z-10">
                    <Link to="/singleproduct" className="relative group/icon flex items-center gap-2">
                      <button className="text-xl text-primary hover:text-secondary duration-200 cursor-pointer"><AiOutlineShoppingCart /></button>
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-[10px] opacity-0 group-hover/icon:opacity-100 whitespace-nowrap">Add to cart</span>
                    </Link>
                    <div className="relative group/icon flex items-center gap-2">
                      <button onClick={() => setQuickView(true)} className="text-xl text-primary hover:text-secondary duration-200 cursor-pointer"><LuSearch /></button>
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-[10px] opacity-0 group-hover/icon:opacity-100 whitespace-nowrap">Quick View</span>
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

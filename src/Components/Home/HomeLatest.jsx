import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Heading from "../../Utilities/Heading";
import ProductCard from "../ProductCard";
import ProductQuickView from "./ProductQuickView";
import { useState } from "react";

const HomeLatest = () => {
  const [quickView, setQuickView] = useState(false);

  const products = [
    { title: "Creative water features and exterior", price: 99, oldPrice: 129, img: "home.jpg" },
    { title: "Exterior ideas: 10 colored garden seats", price: 120, oldPrice: 150, img: "https://via.placeholder.com/300x300" },
    { title: "The big design: Wall likes pictures", price: 75, oldPrice: 95, img: "https://via.placeholder.com/300x300" },
    { title: "Sweet seat: functional seat for IT folks", price: 89, oldPrice: 110, img: "https://via.placeholder.com/300x300" },
    { title: "Modern desk lamp", price: 45, oldPrice: 60, img: "https://via.placeholder.com/300x300" },
    { title: "Office chair ergonomic", price: 130, oldPrice: 160, img: "https://via.placeholder.com/300x300" },
  ];

  return (
    <section className="dark:bg-[#212020] py-10">
      <div className="container mx-auto md:px-4 px-1">
        <Heading Head="Our Latest Posts" />

        <Swiper
          modules={[Navigation, Pagination]}
          className="!pb-14"
          spaceBetween={10}
          slidesPerView={1}
          pagination={false}
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
        >
          {products.map((p, idx) => (
            <SwiperSlide key={idx}>
              <ProductCard product={p} onQuickView={() => setQuickView(true)} />
            </SwiperSlide>
          ))}
        </Swiper>

        {quickView && <ProductQuickView setQuickView={setQuickView} />}
      </div>
    </section>
  );
};

export default HomeLatest;

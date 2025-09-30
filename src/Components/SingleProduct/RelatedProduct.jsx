import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState } from "react";
import Heading from "../../Utilities/Heading";
import ProductCard from "../ProductCard";
import ProductQuickView from "../Home/ProductQuickView";

const RelatedProduct = () => {
  const [quickView, setQuickView] = useState(false);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  const products = [
    { title: "Creative water features", price: 99, oldPrice: 129, img: "home.jpg" },
    { title: "Colored garden seats", price: 120, oldPrice: 150, img: "https://via.placeholder.com/300x300" },
    { title: "Wall design pictures", price: 75, oldPrice: 95, img: "https://via.placeholder.com/300x300" },
    { title: "Functional IT seat", price: 89, oldPrice: 110, img: "https://via.placeholder.com/300x300" },
    { title: "Modern desk lamp", price: 45, oldPrice: 60, img: "https://via.placeholder.com/300x300" },
    { title: "Office chair ergonomic", price: 130, oldPrice: 160, img: "https://via.placeholder.com/300x300" },
  ];

  return (
    <section className="py-12 bg-[#f5f5f5] dark:bg-[#1b1b1b]">
      <div className="container mx-auto px-1 md:px-4">
        <Heading Head="Related Products" />
        <Slider {...settings}>
          {products.map((product, idx) => (
            <div key={idx} className="md:px-2 px-1 pt-5">
              <ProductCard product={product} onQuickView={() => setQuickView(true)} />
            </div>
          ))}
        </Slider>
        {quickView && <ProductQuickView setQuickView={setQuickView} />}
      </div>
    </section>
  );
};

export default RelatedProduct;

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState } from "react";
import Heading from "../../Utilities/Heading";
import ProductCard from "../ProductCard";
import ProductQuickView from "../Home/ProductQuickView";

const RelatedProduct = ({ currentProduct, allProducts = [] }) => {
  const [quickView, setQuickView] = useState(false);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
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

  let relatedProducts = [];
  if (currentProduct) {
    relatedProducts = allProducts.filter(
      (p) =>
        p.subcategory_name === currentProduct.subcategory_name &&
        p.id !== currentProduct.id
    );

    if (relatedProducts.length === 0) {
      relatedProducts = allProducts.filter(
        (p) =>
          p.category_name === currentProduct.category_name &&
          p.id !== currentProduct.id
      );
    }
  }

  return (
    <section className="py-12 bg-[#f5f5f5] dark:bg-[#1b1b1b]">
      <div className="container mx-auto px-1 md:px-4">
        <Heading Head="Related Products" />
        {relatedProducts.length > 0 ? (
          <Slider {...settings}>
            {relatedProducts.map((product, idx) => (
              <div key={idx} className="md:px-2 px-1 pt-5">
                <ProductCard
                  product={product}
                  onQuickView={() => setQuickView(true)}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-500 font-medium py-10">
            Product not available
          </p>
        )}
        {quickView && <ProductQuickView setQuickView={setQuickView} />}
      </div>
    </section>
  );
};

export default RelatedProduct;

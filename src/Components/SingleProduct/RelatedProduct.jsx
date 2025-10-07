import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import Heading from "../../Utilities/Heading";
import ProductCard from "../ProductCard";
import { getProducts } from "../../api/api";
import ProductQuickView from "../Home/ProductQuickView";

const RelatedProduct = ({ currentProduct }) => {
  const [quickView, setQuickView] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts();
      if (!res.error && res.products) {
        setAllProducts(res.products);
      }
    };
    fetchProducts();
  }, []);

  // Filter related products based on subcategory or category
  useEffect(() => {
    if (!currentProduct || allProducts.length === 0) return;

    let related = allProducts.filter(
      (p) =>
        p.subcategory_name === currentProduct.subcategory_name &&
        p.id !== currentProduct.id
    );

    if (related.length === 0) {
      related = allProducts.filter(
        (p) =>
          p.category_name === currentProduct.category_name &&
          p.id !== currentProduct.id
      );
    }

    setRelatedProducts(related);
  }, [currentProduct, allProducts]);

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

  return (
    <section className="py-12 bg-[#f5f5f5] dark:bg-[#1b1b1b]">
      <div className="container mx-auto px-1 md:px-4">
        <Heading Head="Related Products" />
        {relatedProducts.length > 0 ? (
          <Slider {...settings}>
            {relatedProducts.map((product, idx) => {
              const firstVariation = product.variations?.[0] || {};
              const finalPrice = firstVariation.final_price || product.price;
              const oldPrice = firstVariation.price || null;
              const discount = oldPrice
                ? Math.round(((oldPrice - finalPrice) / oldPrice) * 100)
                : 0;
              const image = product.images?.[0]?.image || "https://via.placeholder.com/300x300";

              return (
                <div key={idx} className="md:px-2 px-1 pt-5">
                  <ProductCard
                    product={{
                      id: product.id,
                      title: product.title,
                      img: image,
                      price: finalPrice,
                      oldPrice: oldPrice,
                      discount: discount,
                      rating: product.rating,
                      sold: product.sold
                    }}
                    onQuickView={() => setQuickView(product.id)}
                  />
                </div>
              );
            })}
          </Slider>
        ) : (
          <p className="text-center text-gray-500 font-medium py-10">
            Related products not available
          </p>
        )}
        {quickView && (
          <ProductQuickView
            productId={quickView}
            setQuickView={() => setQuickView(null)}
          />
        )}
      </div>
    </section>
  );
};

export default RelatedProduct;

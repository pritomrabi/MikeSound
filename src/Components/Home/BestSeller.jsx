import { useState } from "react";
import Heading from "../../Utilities/Heading";
import ProductCard from "../ProductCard";
import ProductQuickView from "./ProductQuickView";

const Discount = () => {
  const [quickView, setQuickView] = useState(false);

  const products = [
    { title: "Creative water features", price: 99, oldPrice: 129, img: "home.jpg", discount: "23%" },
    { title: "Colored garden seats", price: 120, oldPrice: 150, img: "https://via.placeholder.com/300x300", discount: "20%" },
    { title: "Wall design pictures", price: 75, oldPrice: 95, img: "https://via.placeholder.com/300x300", discount: "21%" },
    { title: "Functional IT seat", price: 89, oldPrice: 110, img: "https://via.placeholder.com/300x300", discount: "19%" },
    { title: "Modern desk lamp", price: 45, oldPrice: 60, img: "https://via.placeholder.com/300x300", discount: "25%" },
    { title: "Office chair ergonomic", price: 130, oldPrice: 160, img: "https://via.placeholder.com/300x300", discount: "18%" },
  ];

  return (
    <section className="py-12 bg-[#f5f5f5] dark:bg-[#1b1b1b]">
      <div className="container mx-auto px-1 md:px-4">
        <Heading Head="Discount Products" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 md:gap-3 gap-1 mt-8">
          {products.map((product, idx) => (
            <ProductCard
              key={idx}
              product={product}
              onQuickView={() => setQuickView(true)}
            />
          ))}
        </div>
        {quickView && <ProductQuickView setQuickView={setQuickView} />}
      </div>
    </section>
  );
};

export default Discount;

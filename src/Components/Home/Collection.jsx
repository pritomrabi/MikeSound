import { useState } from "react";
import Heading from "../../Utilities/Heading";
import ProductCard from "../ProductCard";
import ProductQuickView from "./ProductQuickView";

const Collection = () => {
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
    <section className="md:py-12 py-6 bg-[#f5f5f5] dark:bg-[#1b1b1b]">
      <div className="container mx-auto px-2 md:px-4">
        <Heading Head="Collections" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-4 mt-8">
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

export default Collection;

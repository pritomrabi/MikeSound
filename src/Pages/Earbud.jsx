import Heading from "../Utilities/Heading";
import ProductQuickView from "../Components/Home/ProductQuickView";
import { useState } from "react";
import ProductCard from "../Components/ProductCard";

const Earbud = () => {
  const [quickView, setQuickView] = useState(false);

  const products = [
    { title: "Creative water features", price: 99, oldPrice: 129, sold: 120, rating: 4, img: "home.jpg" },
    { title: "10 colored garden seats", price: 120, oldPrice: 150, sold: 95, rating: 5, img: "https://via.placeholder.com/300x300" },
    { title: "Wall design pictures", price: 75, oldPrice: 95, sold: 150, rating: 4.5, img: "https://via.placeholder.com/300x300" },
    { title: "Functional IT seat", price: 89, oldPrice: 110, sold: 85, rating: 4, img: "https://via.placeholder.com/300x300" },
    { title: "Modern desk lamp", price: 45, oldPrice: 60, sold: 200, rating: 5, img: "https://via.placeholder.com/300x300" },
    { title: "Office chair ergonomic", price: 130, oldPrice: 160, sold: 75, rating: 4, img: "https://via.placeholder.com/300x300" },
  ];

  return (
    <section className="dark:bg-[#212020] py-16 md:py-24">
      <div className="container mx-auto px-1 md:px-4">
        <Heading Head="Earbud" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-8">
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

export default Earbud;

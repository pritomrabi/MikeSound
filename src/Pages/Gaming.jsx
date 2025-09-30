import Heading from "../Utilities/Heading";
import ProductQuickView from "../Components/Home/ProductQuickView";
import { useState } from "react";
import ProductCard from "../Components/ProductCard";

const Gaming = () => {
  const [quickView, setQuickView] = useState(false);

  const products = [
    { title: "Creative water features and exterior", price: 99.0, oldPrice: 129, img: "home.jpg" },
    { title: "Creative water features and exterior", price: 99.0, oldPrice: 129, img: "home.jpg" },
    { title: "Exterior ideas: 10 colored garden seats", price: 120.0, oldPrice: 150, img: "https://via.placeholder.com/300x300" },
    { title: "Exterior ideas: 10 colored garden seats", price: 120.0, oldPrice: 150, img: "https://via.placeholder.com/300x300" },
    { title: "The big design: Wall likes pictures", price: 75.0, oldPrice: 95, img: "https://via.placeholder.com/300x300" },
    { title: "The big design: Wall likes pictures", price: 75.0, oldPrice: 95, img: "https://via.placeholder.com/300x300" },
    { title: "Sweet seat: functional seat for IT folks", price: 89.0, oldPrice: 110, img: "https://via.placeholder.com/300x300" },
    { title: "Sweet seat: functional seat for IT folks", price: 89.0, oldPrice: 110, img: "https://via.placeholder.com/300x300" },
  ];

  return (
    <section className="dark:bg-[#212020] py-16 md:py-24">
      <div className="container mx-auto md:px-4 px-1">
        <Heading Head="Gaming" />
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

export default Gaming;

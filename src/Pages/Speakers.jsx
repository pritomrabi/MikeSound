import Heading from "../Utilities/Heading";
import ProductQuickView from "../Components/Home/ProductQuickView";
import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
const Speakers = () => {
  const [quickView, setQuickView] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const products = [
    { title: "Creative water features and exterior", price: 99, oldPrice: 195, img: "home.jpg" },
    { title: "Creative water features and exterior", price: 99, oldPrice: 195, img: "home.jpg" },
    { title: "Colored garden seats", price: 120, oldPrice: 150, img: "https://via.placeholder.com/300x300" },
    { title: "Colored garden seats", price: 120, oldPrice: 150, img: "https://via.placeholder.com/300x300" },
    { title: "Wall design pictures", price: 75, oldPrice: 95, img: "https://via.placeholder.com/300x300" },
    { title: "Wall design pictures", price: 75, oldPrice: 95, img: "https://via.placeholder.com/300x300" },
    { title: "Functional IT seat", price: 89, oldPrice: 110, img: "https://via.placeholder.com/300x300" },
    { title: "Functional IT seat", price: 89, oldPrice: 110, img: "https://via.placeholder.com/300x300" },
  ];

  return (
    <section className="dark:bg-[#212020] py-16 sm:py-20">
      <div className="container mx-auto md:px-4 px-1">
        <Heading Head="Speakers" />
        <div className="w-full sm:px-6 px-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-4 ">
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
      </div>
    </section>
  );
};

export default Speakers;

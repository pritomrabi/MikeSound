import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductQuickView from "../Components/Home/ProductQuickView";
import ProductCard from "../Components/ProductCard";

const Categories = () => {
  const { slug } = useParams();
  const [quickView, setQuickView] = useState(false);

  const allProducts = [
    { title: "Wooden Chair", price: 99, oldPrice: 195, img: "home.jpg", category: "furniture" },
    { title: "Wall Clock", price: 120, oldPrice: 195, img: "https://via.placeholder.com/300x300", category: "clocks" },
    { title: "Sunglasses", price: 75, oldPrice: 150, img: "https://via.placeholder.com/300x300", category: "accessories" },
    { title: "Cooking Pan", price: 89, oldPrice: 140, img: "https://via.placeholder.com/300x300", category: "cooking" },
    { title: "Table Lamp", price: 110, oldPrice: 160, img: "https://via.placeholder.com/300x300", category: "lighting" },
  ];

  const products = allProducts.filter(item => item.category === slug);

  return (
    <section className="md:pt-28 pt-16 pb-6 dark:bg-[#1b1b1b]">
      <div className="container mx-auto md:px-4 px-1">
        <div className="flex border-b border-gray-300 mb-6">
          <Link to="/" className="text-secandari cursor-pointer text-base font-Lato font-normal mb-4 inline-block pr-1 hover:underline duration-300">
            Home
          </Link>
          <h3 className="text-primary dark:text-white text-base font-Lato font-semibold mb-4 inline-block">
            <span className="text-secandari dark:text-white p-1"> /</span> Categories
          </h3>
          <h3 className="text-primary dark:text-white text-base font-Lato font-semibold mb-4 inline-block">
            <span className="text-secandari dark:text-white p-1"> /</span> {slug.charAt(0).toUpperCase() + slug.slice(1)}
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 md:gap-3 mt-8">
          {products.length > 0 ? (
            products.map((product, idx) => (
              <ProductCard
                key={idx}
                product={product}
                onQuickView={() => setQuickView(true)}
              />
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
        {quickView && <ProductQuickView setQuickView={setQuickView} />}
      </div>
    </section>
  );
};

export default Categories;

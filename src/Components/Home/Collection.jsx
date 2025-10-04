import { useState, useEffect } from "react";
import Heading from "../../Utilities/Heading";
import ProductCard from "../ProductCard";
import ProductQuickView from "./ProductQuickView";
import { getProducts } from "../../api/api";

const Collection = () => {
  const [quickView, setQuickView] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await getProducts();
      console.log("Raw API response:", res); // raw response check

      if (!res.error && res.products) {
        console.log("All products:", res.products); // all products check
        setProducts(res.products); // set all products
      } else {
        console.log("Error fetching products:", res.error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <section className="md:py-12 py-0 bg-[#f5f5f5] dark:bg-[#1b1b1b]">
      <div className="container mx-auto px-2 md:px-4">
        <Heading Head="Collections" />

        {loading ? (
          <p className="text-center py-10">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center py-10">No products available.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-4 mt-8">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  title: product.title,
                  img: product.images?.[0]?.image || "https://via.placeholder.com/300x300",
                  price: product.variations?.[0]?.discounted_price || 0,
                  oldPrice: product.variations?.[0]?.price || null,
                  rating: product.rating,
                  sold: product.sold_count
                }}
                onQuickView={() => setQuickView(product.id)} // id pass করা
              />
            ))}

            {quickView && (
              <ProductQuickView
                productId={quickView} // এখানে productId পাঠানো হচ্ছে
                setQuickView={() => setQuickView(null)} // close করার জন্য
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Collection;

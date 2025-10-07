import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Heading from "../Utilities/Heading";
import ProductQuickView from "../Components/Home/ProductQuickView";
import ProductCard from "../Components/ProductCard";
import { getProducts } from "../api/api";

const Discount = () => {
  const { type } = useParams(); // offer_type from URL
  const [products, setProducts] = useState([]);
  const [quickView, setQuickView] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await getProducts(type); // pass offer_type
      console.log("API response:", res); // debug

      if (!res.error && res.products) {
        // filter products that actually have this offer_type
        const filtered = res.products.filter(p => p.offer_type?.toLowerCase() === type?.toLowerCase());
        setProducts(filtered);
      } else {
        setProducts([]);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [type]);

  const headingText = type
    ? `${type.charAt(0).toUpperCase() + type.slice(1)} Offers`
    : "Discount Offers";

  if (loading) return <p className="text-center py-20">Loading products...</p>;
  if (!products.length) return <p className="text-center py-20">No products available.</p>;

  return (
    <section className="md:py-12 py-0 bg-[#f5f5f5] dark:bg-[#1b1b1b]">
      <div className="container mx-auto px-2 md:px-4">
        <Heading Head={headingText} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-4 mt-8">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                title: product.title,
                img: product.images?.[0]?.image || "https://via.placeholder.com/300x300",
                price: product.variations?.[0]?.final_price || 0,
                oldPrice: product.variations?.[0]?.price || null,
                sold: product.sold_count
              }}
              onQuickView={() => setQuickView(product.id)}
            />
          ))}

          {quickView && (
            <ProductQuickView
              productId={quickView}
              setQuickView={() => setQuickView(null)}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Discount;

import Heading from "../Utilities/Heading";
import ProductQuickView from "../Components/Home/ProductQuickView";
import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import { getProducts } from "../api/api";

const Earbud = () => {
  const [products, setProducts] = useState([]);
  const [quickView, setQuickView] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProducts = async () => {
      setLoading(true);
      const res = await getProducts();

      if (!res.error && res.products) {
        // filter for Earbud subcategory
        const earbudProducts = res.products.filter(
          (p) => p.subcategory_name?.toLowerCase() === "earbud"
        );
        setProducts(earbudProducts);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <section className="dark:bg-[#212020] py-16 sm:py-20">
      <div className="container mx-auto px-2 md:px-4">
        <Heading Head="Earbud" />

        {loading ? (
          <p className="flex font-Nunito-font font-semibold sm:text-2xl text-xl justify-center items-center h-[40vh]">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="flex font-Nunito-font font-semibold sm:text-2xl text-xl justify-center items-center h-[40vh]">No products found in this Earbud.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  title: product.title,
                  img: product.images?.[0]?.image || "https://via.placeholder.com/300x300",
                  price: product.variations?.[0]?.discounted_price || product.variations?.[0]?.price || 0,
                  oldPrice: product.variations?.[0]?.price || null,
                  rating: product.rating,
                  sold: product.sold_count
                }}
                onQuickView={() => setQuickView(product.id)}
              />
            ))}
          </div>
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

export default Earbud;

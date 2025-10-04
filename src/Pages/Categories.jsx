import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductQuickView from "../Components/Home/ProductQuickView";
import ProductCard from "../Components/ProductCard";
import { getProductsByCategory } from "../api/api";

const Categories = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [quickView, setQuickView] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProducts = async () => {
      setLoading(true);
      const res = await getProductsByCategory(slug);
      if (!res.error && res.products) {
        setProducts(res.products);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [slug]);

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

        {loading ? (
          <p className="text-center py-10 text-white">Loading products...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
            {products.length > 0 ? (
              products.map((product, idx) => (
                <ProductCard
                  key={idx}
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
              ))
            ) : (
              <p className="text-center py-10 text-white">No products found in this category.</p>
            )}
          </div>
        )}
        {quickView && <ProductQuickView setQuickView={() => setQuickView(null)} />}
      </div>
    </section>
  );
};

export default Categories;

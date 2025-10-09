import { useState, useEffect } from "react";
import Heading from "../Utilities/Heading";
import ProductQuickView from "../Components/Home/ProductQuickView";
import ProductCard from "../Components/ProductCard";
import { getProducts } from "../api/api";

const Headphone = () => {
  const [products, setProducts] = useState([]);
  const [quickView, setQuickView] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProducts = async () => {
      setLoading(true);
      const res = await getProducts();

      if (!res.error && res.products) {
        const headphoneProducts = res.products.filter(
          (p) => p.subcategory_name?.toLowerCase() === "headphone"
        );
        setProducts(headphoneProducts);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <section className="dark:bg-[#212020] py-16 sm:py-20">
      <div className="container mx-auto md:px-4 px-2">
        <Heading Head="Headphone" />
        {loading ? (
          <p className="flex font-Nunito-font font-semibold sm:text-2xl text-xl justify-center items-center h-[40vh]">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="flex font-Nunito-font font-semibold sm:text-2xl text-xl justify-center items-center h-[40vh]">
            No products found in this subcategory.
          </p>
        ) : (
          <div className="w-full sm:px-6 px-0">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-4">
              {products.map((product) => {
                const price = Number(
                  product.variations?.[0]?.discounted_price ||
                  product.variations?.[0]?.price ||
                  0
                );
                const oldPrice = Number(product.variations?.[0]?.price || 0);

                return (
                  <ProductCard
                    key={product.id}
                    product={{
                      id: product.id,
                      title: product.title,
                      img:
                        product.images?.[0]?.image ||
                        "https://via.placeholder.com/300x300",
                      price,
                      oldPrice,
                      rating: product.rating || 0,
                      sold: product.sold_count || 0,
                    }}
                    onQuickView={() => setQuickView(product.id)}
                  />
                );
              })}
            </div>
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

export default Headphone;

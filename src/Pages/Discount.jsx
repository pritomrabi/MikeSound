import { useParams } from "react-router-dom";
import ProductQuickView from "../Components/Home/ProductQuickView";
import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import Heading from "../Utilities/Heading";
import { getProducts } from "../api/api";

const Discount = () => {
    const { type } = useParams(); // offer_type from URL
    const [products, setProducts] = useState([]);
    const [quickView, setQuickView] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProducts = async () => {
            setLoading(true);
            const res = await getProducts(type); // pass offer_type
            if (!res.error && res.products) {
                setProducts(res.products);
            }
            setLoading(false);
        };
        fetchProducts();
    }, [type]);

    const headingText = type
        ? `${type.charAt(0).toUpperCase() + type.slice(1)} Offers`
        : "Discount Offers";

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[30vh] my-12">
                Loading...
            </div>
        );
    }

    if (!products.length) {
        return (
            <div className="text-center py-20">
                <Heading Head={headingText} />
                <p>No products available.</p>
            </div>
        );
    }

    return (
        <section className="md:py-20 pt-16 dark:bg-[#1b1b1b]">
            <div className="container mx-auto px-1 md:px-4">
                <Heading Head={headingText} />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
                    {products.map((product, idx) => (
                        <ProductCard
                            key={idx}
                            product={product}
                            onQuickView={() => setQuickView(true)}
                        />
                    ))}
                </div>
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

export default Discount;

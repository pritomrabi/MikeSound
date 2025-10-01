import { useParams } from "react-router-dom";
import ProductQuickView from "../Components/Home/ProductQuickView";
import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import Heading from "../Utilities/Heading";

const Discount = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [quickView, setQuickView] = useState(false);
    const { type } = useParams();

    const products = [
        { title: "Creative water features", price: 99, oldPrice: 129, img: "home.jpg", discount: "23%", category: "weekend" },
        { title: "Colored garden seats", price: 120, oldPrice: 150, img: "https://via.placeholder.com/300x300", discount: "20%", category: "holiday" },
        { title: "Wall design pictures", price: 75, oldPrice: 95, img: "https://via.placeholder.com/300x300", discount: "21%", category: "holiday" },
        { title: "Functional IT seat", price: 89, oldPrice: 110, img: "https://via.placeholder.com/300x300", discount: "19%", category: "weekend" },
        { title: "Modern desk lamp", price: 45, oldPrice: 60, img: "https://via.placeholder.com/300x300", discount: "25%", category: "holiday" },
        { title: "Office chair ergonomic", price: 130, oldPrice: 160, img: "https://via.placeholder.com/300x300", discount: "18%", category: "weekend" }
    ];

    const filteredProducts = type ? products.filter(p => p.category === type) : products;

    return (
        <section className="md:py-20 pt-16 dark:bg-[#1b1b1b]">
            <div className="container mx-auto px-1 md:px-4">
                <Heading Head={`${type ? type.charAt(0).toUpperCase() + type.slice(1) : "Discount"} Offers`} />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-4 mt-8">
                    {filteredProducts.map((product, idx) => (
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

export default Discount;

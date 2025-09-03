import { AiOutlineShoppingCart, AiFillStar } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useState } from "react";
import ProductQuickView from "./ProductQuickView";
import Heading from "../../Utilities/Heading";

const BestSeller = () => {
    const [quickView, setQuickView] = useState(false);

    const products = [
        { title: "Creative water features", price: "$99.00", oldPrice: "$129.00", sold: 120, rating: 4, img: "home.jpg" },
        { title: "10 colored garden seats", price: "$120.00", oldPrice: "$150.00", sold: 95, rating: 5, img: "https://via.placeholder.com/300x300" },
        { title: "Wall design pictures", price: "$75.00", oldPrice: "$95.00", sold: 150, rating: 4.5, img: "https://via.placeholder.com/300x300" },
        { title: "Functional IT seat", price: "$89.00", oldPrice: "$110.00", sold: 85, rating: 4, img: "https://via.placeholder.com/300x300" },
        { title: "Modern desk lamp", price: "$45.00", oldPrice: "$60.00", sold: 200, rating: 5, img: "https://via.placeholder.com/300x300" },
        { title: "Office chair ergonomic", price: "$130.00", oldPrice: "$160.00", sold: 75, rating: 4, img: "https://via.placeholder.com/300x300" },
    ];

    return (
        <section className="py-12 bg-[#f5f5f5] dark:bg-[#1b1b1b]">
            <div className="container mx-auto px-4">
                <Heading Head="Explore Bestsellers" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                    {products.map((product, idx) => (
                        <div key={idx} className="relative group bg-white dark:bg-[#2a2a2a] rounded-md shadow-md overflow-hidden">
                            <div className="relative overflow-hidden rounded-t-md">
                                <img
                                    src={product.img}
                                    alt={product.title}
                                    className="w-full h-72 object-cover transform transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                                />
                                <div className="absolute bottom-32 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition flex gap-4 bg-white py-2.5 px-5 rounded shadow z-10">
                                    <Link to="/singleproduct" className="relative group/icon">
                                        <button className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer"><AiOutlineShoppingCart /></button>
                                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100">Add to cart</span>
                                    </Link>
                                    <div className="relative group/icon">
                                        <button onClick={() => setQuickcart(true)} className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer"><LuSearch /></button>
                                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100">Search</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 text-center">
                                <h3 className="text-sm font-medium text-primary dark:text-primary-dark font-Roboto">{product.title}</h3>
                                <p className="text-md font-bold text-brand font-Monrope">
                                    {product.price} <span className="line-through text-gray-400 text-sm ml-2">{product.oldPrice}</span>
                                </p>
                                <div className="flex justify-center items-center gap-1 mt-1">
                                    {[...Array(Math.floor(product.rating))].map((_, i) => <AiFillStar key={i} className="text-yellow-400" />)}
                                    {product.rating % 1 !== 0 && <AiFillStar className="text-yellow-400 opacity-50" />}
                                    <span className="text-xs text-gray-500 ml-2">({product.sold} sold)</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {quickView && <ProductQuickView setQuickcart={setQuickView} />}
            </div>
        </section>
    );
};

export default BestSeller;

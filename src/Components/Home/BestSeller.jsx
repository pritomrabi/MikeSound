import { AiOutlineShoppingCart, AiFillStar } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useState } from "react";
import ProductQuickView from "./ProductQuickView";
import Heading from "../../Utilities/Heading";
import { FaRegHeart } from "react-icons/fa";

const BestSeller = () => {
    const [quickView, setQuickView] = useState(false);

    const products = [
        { title: "Creative water features", price: 99, oldPrice: 129, sold: 120, rating: 4, img: "home.jpg" },
        { title: "10 colored garden seats", price: 120, oldPrice: 150, sold: 95, rating: 5, img: "https://via.placeholder.com/300x300" },
        { title: "Wall design pictures", price: 75, oldPrice: 95, sold: 150, rating: 4.5, img: "https://via.placeholder.com/300x300" },
        { title: "Functional IT seat", price: 89, oldPrice: 110, sold: 85, rating: 4, img: "https://via.placeholder.com/300x300" },
        { title: "Modern desk lamp", price: 45, oldPrice: 60, sold: 200, rating: 5, img: "https://via.placeholder.com/300x300" },
        { title: "Office chair ergonomic", price: 130, oldPrice: 160, sold: 75, rating: 4, img: "https://via.placeholder.com/300x300" },
    ];

    return (
        <section className="py-12 bg-[#f5f5f5] dark:bg-[#1b1b1b]">
            <div className="container mx-auto px-4">
                <Heading Head="Explore Bestsellers" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mt-8">
                    {products.map((product, idx) => (
                        <div key={idx} className="relative group bg-white dark:bg-[#2a2a2a] rounded-md shadow-md overflow-hidden">
                            <div className="relative overflow-hidden rounded-t-md">
                                <div className="overflow-hidden rounded-t-md">
                                    <img src={product.img} alt={product.title} className="w-full h-52 sm:h-56 object-cover transform transition-transform duration-500 group-hover:scale-105" />
                                </div>
                            </div>
                            <div className="p-4">
                                <Link to="/singleproduct">
                                    <h3 className="text-base font-medium text-primary-default dark:text-primary-dark font-Roboto">{product.title.substring(0, 25)}...</h3>
                                    <p className="text-md font-bold text-brand font-Monrope text-start">৳{product.price}</p>
                                    <div className="flex gap-2">
                                        <p className="text-md font-normal text-secandari line-through font-Monrope">৳{product.oldPrice}</p>
                                        <span className="text-md font-normal text-primary dark:text-white font-Monrope">-{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%</span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-1">
                                        {[...Array(Math.floor(product.rating))].map((_, i) => <AiFillStar key={i} className="text-yellow-400" />)}
                                        {product.rating % 1 !== 0 && <AiFillStar className="text-yellow-400 opacity-50" />}
                                        <span className="text-xs text-gray-500 ml-2">({product.sold} sold)</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="absolute xl:bottom-32 bottom-44 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition flex gap-4 bg-white py-2.5 px-5 rounded shadow z-10">
                                <Link to="/singleproduct" className="relative group/icon">
                                    <button className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer"><AiOutlineShoppingCart /></button>
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100 whitespace-nowrap">Add to cart</span>
                                </Link>
                                <div className="relative group/icon">
                                    <button onClick={() => setQuickView(true)} className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer">
                                        <LuSearch />
                                    </button>
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100 whitespace-nowrap">Search</span>
                                </div>
                                <Link to="/wishlist" className="relative group/icon">
                                    <button className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer">
                                        <FaRegHeart />
                                    </button>
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100 transition whitespace-nowrap font-Lato font-normal">
                                        Wishlist
                                    </span>
                                </Link>
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

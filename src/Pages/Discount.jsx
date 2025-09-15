import { AiOutlineShoppingCart } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import Heading from "../Utilities/Heading";
import ProductQuickView from "../Components/Home/ProductQuickView";

const Discount = () => {
    const [quickView, setQuickView] = useState(false);

    const products = [
        { title: "Creative water features", price: "$99.00", oldPrice: "$129.00", img: "home.jpg", discount: "23%" },
        { title: "Creative water features", price: "$99.00", oldPrice: "$129.00", img: "home.jpg", discount: "23%" },
        { title: "Creative water features", price: "$99.00", oldPrice: "$129.00", img: "home.jpg", discount: "23%" },
        { title: "Creative water features", price: "$99.00", oldPrice: "$129.00", img: "home.jpg", discount: "23%" },
        { title: "Creative water features", price: "$99.00", oldPrice: "$129.00", img: "home.jpg", discount: "23%" },
        { title: "Creative water features", price: "$99.00", oldPrice: "$129.00", img: "home.jpg", discount: "23%" },
        { title: "Creative water features", price: "$99.00", oldPrice: "$129.00", img: "home.jpg", discount: "23%" },
        { title: "Creative water features", price: "$99.00", oldPrice: "$129.00", img: "home.jpg", discount: "23%" },
        { title: "Creative water features", price: "$99.00", oldPrice: "$129.00", img: "home.jpg", discount: "23%" },
    ];

    return (
        <section className="md:py-20 sm:py-9 py-6 dark:bg-[#1b1b1b]">
            <div className="container mx-auto px-4">
                <Heading Head="Discount Product" />
                <div className="w-full sm:px-6 px-0 py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {products.map((product, idx) => (
                        <Link key={idx} className="group relative rounded-md shadow-md overflow-hidden bg-white dark:bg-[#2a2a2a]">
                            <div className="relative overflow-hidden rounded-t-md">
                                <img
                                    src={product.img}
                                    alt={product.title}
                                    className="w-full h-52 sm:h-56 object-cover transform transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                                />
                                <span className="absolute top-3 left-3 bg-brand text-white text-xs font-Lato font-bold px-2 py-1 rounded">{product.discount} OFF</span>
                            </div>
                            <div className="dark:bg-[#2a2a2a] text-center space-y-1 px-3 py-5 shadow rounded-b-md">
                                <Link to="/singleproduct">
                                    <h3 className="text-base font-medium text-primary-default dark:text-primary-dark font-Roboto">{product.title.substring(0, 25)}...</h3>
                                    <p className="text-md font-bold text-brand font-Monrope text-start">৳{product.price}</p>
                                    <div className="flex gap-2">
                                        <p className="text-md font-normal text-secandari line-through font-Monrope">৳195</p>
                                    </div>
                                </Link>
                            </div>
                            <div className="absolute xl:bottom-32 bottom-44 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition flex gap-4 bg-white py-2.5 px-5 rounded shadow z-10">
                                <Link to="/singleproduct" className="relative group/icon flex items-center gap-2">
                                    <button className="text-xl text-primary hover:text-secondary duration-200 cursor-pointer"><AiOutlineShoppingCart /></button>
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-[10px] opacity-0 group-hover/icon:opacity-100 whitespace-nowrap">Add to cart</span>
                                </Link>
                                <div className="relative group/icon flex items-center gap-2">
                                    <button onClick={() => setQuickView(true)} className="text-xl text-primary hover:text-secondary duration-200 cursor-pointer"><LuSearch /></button>
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-[10px] opacity-0 group-hover/icon:opacity-100 whitespace-nowrap">Quick View</span>
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
                        </Link>
                    ))}
                </div>
                {quickView && <ProductQuickView setQuickcart={setQuickView} />}
            </div>
        </section>
    );
};

export default Discount;

import { AiOutlineShoppingCart } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductQuickView from "../Components/Home/ProductQuickView";

const Wishlist = () => {
    const [quickcart, setQuickcart] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const posts = [
        // { title: "Creative water features and exterior", price: 99.00, img: "home.jpg" },
    ];

    return (
        <section className="dark:bg-[#212020] md:pt-20 pt-16">
            <div className="container mx-auto md:px-4 px-1">
                <div className="w-full sm:px-6 px-0 py-10 dark:bg-[#212020]">
                    {posts.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                            {posts.map((post, idx) => (
                                <div key={idx} className="group relative rounded-md shadow-sm transition overflow-hidden">
                                    <div className="overflow-hidden rounded-t-md">
                                        <img
                                            src={post.img}
                                            alt={post.title}
                                            className="w-full h-52 sm:h-56 object-cover transform transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="text-center dark:bg-[#2a2a2a] space-y-1 px-3 py-5 shadow rounded-b-md">
                                        <Link to="/singleproduct">
                                            <h3 className="text-base font-medium text-primary-default dark:text-primary-dark font-Roboto">
                                                {post.title.substring(0, 25)}...
                                            </h3>
                                            <p className="text-md font-bold text-brand font-Monrope text-start">৳{post.price}</p>
                                            <div className="flex gap-2">
                                                <p className="text-md font-normal text-secandari line-through font-Monrope">
                                                    ৳{Math.max(195, post.price * 1.2)}
                                                </p>
                                                <span className="text-md font-normal text-primary dark:text-white font-Monrope">
                                                    -{Math.round(((Math.max(195, post.price * 1.2) - post.price) / Math.max(195, post.price * 1.2)) * 100)}%
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="absolute xl:bottom-32 bottom-28 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition flex gap-4 bg-white py-2.5 px-5 rounded shadow z-10">
                                        <Link to="/singleproduct" className="relative group/icon">
                                            <button className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer">
                                                <AiOutlineShoppingCart />
                                            </button>
                                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100 whitespace-nowrap">
                                                Add to cart
                                            </span>
                                        </Link>
                                        <div className="relative group/icon">
                                            <button
                                                onClick={() => setQuickcart(true)}
                                                className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer"
                                            >
                                                <LuSearch />
                                            </button>
                                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100 whitespace-nowrap">
                                                Search
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center md:pt-20 pt-16">
                            <p className="text-xl font-medium text-gray-500 font-Lato">
                                No wishlist available
                            </p>
                            <Link
                                to="/shop"
                                className="mt-4 inline-block bg-primary text-sm text-white px-6 py-2 rounded"
                            >
                                Browse Products
                            </Link>
                        </div>
                    )}
                    {quickcart && <ProductQuickView setQuickcart={setQuickcart} />}
                </div>
            </div>
        </section>
    );
};

export default Wishlist;

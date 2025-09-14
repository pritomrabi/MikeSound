import { AiOutlineShoppingCart } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useState } from "react";
import ProductQuickView from "../Components/Home/ProductQuickView";

const SpecialOffers = () => {
    const [quickcart, setQuickcart] = useState(false);
    const [showPercentage, setShowPercentage] = useState(50);

    const allProducts = [
        { title: "Wooden Chair", price: "$99.00", img: "home.jpg", discount: 50 },
        { title: "Wall Clock", price: "$120.00", img: "https://via.placeholder.com/300x300", discount: 30 },
        { title: "Sunglasses", price: "$75.00", img: "https://via.placeholder.com/300x300", discount: 20 },
        { title: "Cooking Pan", price: "$89.00", img: "https://via.placeholder.com/300x300", discount: 50 },
        { title: "Table Lamp", price: "$110.00", img: "https://via.placeholder.com/300x300", discount: 30 },
    ];

    // discount অনুযায়ী filter
    const filteredPosts = allProducts.filter(p => p.discount === showPercentage);

    return (
        <section className="py-28">
            <div className="container mx-auto px-4">
                {/* Page Title */}
                <div className="mb-8 text-center">
                    <h3 className="lg:text-4xl text-3xl text-primary-default dark:text-primary-dark font-medium font-Roboto py-2">
                        Special Offers
                    </h3>
                    <p className="lg:text-sm text-xs text-secandari-default dark:text-secandari-dark font-Lato font-normal">
                        Choose your discount and grab the deal
                    </p>

                </div>

                {/* Filter percentage select */}
                <div className="mb-6 flex justify-center">
                    <label className="mr-2 font-Lato text-xl text-primary font-medium">Show products:</label>
                    <select
                        value={showPercentage}
                        onChange={(e) => setShowPercentage(Number(e.target.value))}
                        className="border outline-none px-3 py-1 rounded"
                    >
                        <option value={100}>All</option>
                        <option value={50}>50% OFF</option>
                        <option value={30}>30% OFF</option>
                        <option value={20}>20% OFF</option>
                    </select>
                </div>

                {/* Product Grid */}
                <div className="w-full px-6 py-10 bg-[#fdfeff] dark:bg-black grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post, idx) => (
                            <div key={idx} className="group relative rounded-md shadow-sm transition overflow-hidden">

                                {/* Discount Badge */}
                                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
                                    {post.discount}% OFF
                                </div>

                                {/* Product Image */}
                                <div className="overflow-hidden rounded-md">
                                    <img
                                        src={post.img}
                                        alt={post.title}
                                        className="w-full h-80 object-cover transform transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="text-center space-y-1 p-3">
                                    <h3 className="text-sm font-medium text-primary-default dark:text-primary-dark font-Roboto">
                                        {post.title}
                                    </h3>
                                    <p className="text-md font-bold text-brand font-Monrope">{post.price}</p>
                                </div>

                                {/* Hover Actions */}
                                <div className="absolute bottom-32 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition flex gap-4 bg-white py-2.5 px-5 rounded shadow z-10">
                                    <Link to="/singleproduct" className="relative group/icon">
                                        <button className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer">
                                            <AiOutlineShoppingCart />
                                        </button>
                                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100">
                                            Add to cart
                                        </span>
                                    </Link>
                                    <div className="relative group/icon">
                                        <button onClick={() => setQuickcart(true)} className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer">
                                            <LuSearch />
                                        </button>
                                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100">
                                            Quick view
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-full">No products found for this discount.</p>
                    )}
                </div>

                {quickcart && <ProductQuickView setQuickcart={setQuickcart} />}
            </div>
        </section>
    );
};

export default SpecialOffers;

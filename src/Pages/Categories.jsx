import { AiOutlineShoppingCart } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import ProductQuickView from "../Components/Home/ProductQuickView";
import { FaRegHeart } from "react-icons/fa";

const Categories = () => {
  const [quickcart, setQuickcart] = useState(false);
  const { slug } = useParams();

  const allProducts = [
    { title: "Wooden Chair", price: "$99.00", img: "home.jpg", category: "furniture" },
    { title: "Wooden Chair", price: "$99.00", img: "home.jpg", category: "furniture" },
    { title: "Wooden Chair", price: "$99.00", img: "home.jpg", category: "furniture" },
    { title: "Wooden Chair", price: "$99.00", img: "home.jpg", category: "furniture" },
    { title: "Wooden Chair", price: "$99.00", img: "home.jpg", category: "furniture" },
    { title: "Wooden Chair", price: "$99.00", img: "home.jpg", category: "furniture" },
    { title: "Wooden Chair", price: "$99.00", img: "home.jpg", category: "furniture" },
    { title: "Wooden Chair", price: "$99.00", img: "home.jpg", category: "furniture" },
    { title: "Wooden Chair", price: "$99.00", img: "home.jpg", category: "furniture" },
    { title: "Wooden Chair", price: "$99.00", img: "home.jpg", category: "furniture" },
    { title: "Wooden Chair", price: "$99.00", img: "home.jpg", category: "furniture" },
    { title: "Wooden Chair", price: "$99.00", img: "home.jpg", category: "furniture" },
    { title: "Wall Clock", price: "$120.00", img: "https://via.placeholder.com/300x300", category: "clocks" },
    { title: "Sunglasses", price: "$75.00", img: "https://via.placeholder.com/300x300", category: "accessories" },
    { title: "Cooking Pan", price: "$89.00", img: "https://via.placeholder.com/300x300", category: "cooking" },
    { title: "Table Lamp", price: "$110.00", img: "https://via.placeholder.com/300x300", category: "lighting" },
  ];

  const posts = allProducts.filter(item => item.category === slug);

  return (
    <section className="md:pt-20 pt-16 dark:bg-[#1b1b1b]">
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 md:gap-3 mt-8">
          {posts.length > 0 ? (
            posts.map((post, idx) => (
              <div key={idx} className="group relative rounded-md bg-white dark:bg-[#2a2a2a] shadow-sm transition overflow-hidden">
                <div className="overflow-hidden rounded-md">
                  <img src={post.img} alt={post.title} className="w-full h-52 sm:h-56 object-cover transform transition-transform duration-500 group-hover:scale-105 cursor-pointer" />
                </div>
                <div className="text-center space-y-1 p-3">
                  <Link to="/singleproduct" className="text-start">
                    <h3 className="text-base font-medium text-primary-default dark:text-primary-dark font-Roboto">{post.title.substring(0, 20)}...</h3>
                    <p className="text-md font-bold text-brand font-Monrope ">৳{post.price}</p>
                      <p className="text-md font-normal text-secandari line-through font-Monrope">৳195</p>
                  </Link>
                </div>
                <div className="absolute bottom-28 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition flex gap-4 bg-white py-2.5 px-5 rounded shadow z-10">
                  <Link to="/singleproduct" className="relative group/icon">
                    <button className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer">
                      <AiOutlineShoppingCart />
                    </button>
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100 whitespace-nowrap">
                      Add to cart
                    </span>
                  </Link>
                  <div className="relative group/icon">
                    <button onClick={() => setQuickcart(true)} className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer">
                      <LuSearch />
                    </button>
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100 whitespace-nowrap">
                      Search
                    </span>
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
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>

        {quickcart && <ProductQuickView setQuickcart={setQuickcart} />}
      </div>
    </section>
  );
};

export default Categories;

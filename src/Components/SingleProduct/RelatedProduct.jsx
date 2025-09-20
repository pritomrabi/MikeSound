import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProductQuickView from "../Home/ProductQuickView";
import Heading from "../../Utilities/Heading";
const RelatedProduct = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,       // বড় স্ক্রিনে 6
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1280,   // max-width 1280px
        settings: { slidesToShow: 5 }
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 }
      }
    ]
  };
  const [quickcart, setQuickcart] = useState(false);
  const posts = [
    { title: "Creative water features and exterior", price: "99.00", img: "home.jpg" },
    { title: "Creative water features and exterior", price: "99.00", img: "home.jpg" },
    { title: "Creative water features and exterior", price: "99.00", img: "home.jpg" },
    { title: "Creative water features and exterior", price: "99.00", img: "home.jpg" },
    { title: "Exterior ideas: 10 colored garden seats", price: "120.00", img: "https://via.placeholder.com/300x300" },
    { title: "Exterior ideas: 10 colored garden seats", price: "120.00", img: "https://via.placeholder.com/300x300" },
    { title: "The big design: Wall likes pictures", price: "75.00", img: "https://via.placeholder.com/300x300" },
    { title: "The big design: Wall likes pictures", price: "75.00", img: "https://via.placeholder.com/300x300" },
    { title: "Sweet seat: functional seat for IT folks", price: "89.00", img: "https://via.placeholder.com/300x300" },
    { title: "Sweet seat: functional seat for IT folks", price: "89.00", img: "https://via.placeholder.com/300x300" },
  ];
  return (
    <section>
      <div className="container mx-auto md:px-3 px-1">
        <div className=" mx-auto px-4 py-10 ">
          <Heading Head="Related Products" />
          <Slider {...settings}>
            {posts.map((post, idx) => (
              <div key={idx} className="md:px-2 px-1 pt-5">
                <div className="group relative rounded-md shadow-sm transition overflow-hidden">
                  <div className="overflow-hidden rounded-t-md">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-52 sm:h-56 object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className=" dark:bg-[#2a2a2a] space-y-1 p-2 md:p-4 shadow rounded-b-md">
                    <Link to="/singleproduct">
                      <h3 className="text-base font-medium text-primary-default dark:text-primary-dark font-Roboto">
                        {post.title.substring(0, 20)}...
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
                </div>
              </div>
            ))}
          </Slider>

          {quickcart && <ProductQuickView setQuickcart={setQuickcart} />}
        </div>
      </div>
    </section>
  );
};

export default RelatedProduct;

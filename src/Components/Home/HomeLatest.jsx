import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Heading from "../../Utilities/Heading";
const HomeLatest = () => {
  const posts = [
    {
      date: "23 JUL",
      image: "home.jpg",
      category: ["DESIGN TRENDS", "INSPIRATION"],
      title: "Creative water features and exterior",
      author: "S. Rogers",
      description:
        "Adipiscing hac imperdiet id blandit varius scelerisque at sagittis libero dui dis volutpat vehicula...",
    },
    {
      date: "23 JUL",
      image: "home.jpg",
      category: ["DESIGN TRENDS", "INSPIRATION"],
      title: "Creative water features and exterior",
      author: "S. Rogers",
      description:
        "Adipiscing hac imperdiet id blandit varius scelerisque at sagittis libero dui dis volutpat vehicula...",
    },
    {
      date: "23 JUL",
      image: "home.jpg",
      category: ["DESIGN TRENDS", "INSPIRATION"],
      title: "Creative water features and exterior",
      author: "S. Rogers",
      description:
        "Adipiscing hac imperdiet id blandit varius scelerisque at sagittis libero dui dis volutpat vehicula...",
    },
    {
      date: "23 JUL",
      image: "https://via.placeholder.com/300x300",
      category: ["DESIGN TRENDS", "FURNITURE"],
      title: "Exterior ideas: 10 colored garden seats",
      author: "S. Rogers",
      description:
        "A sed a risusat luctus esta anibh rhoncus hendrerit blandit nam rutrum stimid hac...",
    },
    {
      date: "23 JUL",
      image: "https://via.placeholder.com/300x300",
      category: ["DECORATION", "DESIGN TRENDS"],
      title: "The big design: Wall likes pictures",
      author: "S. Rogers",
      description:
        "Parturient in potenti id rutrum duis torquent scelerisque sit vestibulum a posuere...",
    },
    {
      date: "23 JUL",
      image: "https://via.placeholder.com/300x300",
      category: ["DESIGN TRENDS", "HAND MADE"],
      title: "Sweet seat: functional seat for IT folks",
      author: "S. Rogers",
      description:
        "A sed a risusat luctus esta anibh rhoncus hendrerit blandit nam rutrum stimid hac...",
    },
  ];
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <Heading Head="Our Latest Posts" />
        <div className="w-full px-6 py-10 bg-white">
          <Swiper
            modules={[Navigation, Pagination]}
            className="!pb-14"
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {posts.map((post, index) => (
              <SwiperSlide key={index}>
                <div className="group bg-white rounded overflow-hidden shadow-sm hover:shadow-md transition duration-300">
                  <div className="relative overflow-hidden rounded-t">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-64 object-cover transform transition duration-500 group-hover:scale-110"
                    />
                    <p className="absolute top-2 left-2 bg-white text-primary text-[10px] font-semibold font-Monrope px-3 py-1 shadow rounded-sm">
                      {post.date}
                    </p>
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold font-Lato uppercase text-brand mb-2">
                      {post.category.join(", ")}
                    </p>
                    <h3 className="text-lg text-primary font-Roboto font-semibold mb-1">{post.title}</h3>
                    <div className="text-sm text-secandari font-Lato font-medium mb-2">
                      Posted by {post.author}
                    </div>
                    <p className="text-xs text-secandari font-Lato font-normal mb-3">
                      {post.description}
                    </p>
                    <button className="text-brand font-semibold font-Lato text-sm  hover:underline">
                      CONTINUE READING
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HomeLatest;

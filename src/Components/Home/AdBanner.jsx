import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const AdBanner = () => {
  const ads = [
    {
      id: 1,
      title: "Special Offer - 50% Off",
      image: "https://woodmart.xtemos.com/wp-content/uploads/2024/02/fashion-flat-slide-2.jpg",
      link: "/shop",
    },
    {
      id: 2,
      title: "New Collection Available",
      image: "https://woodmart.xtemos.com/wp-content/uploads/2024/02/fashion-flat-slide-1.jpg",
      link: "/shop",
    },
  ];

  const Arrow = ({ onClick, direction }) => (
    <div
      onClick={onClick}
      className={`absolute top-1/2 transform -translate-y-1/2 z-10 cursor-pointer p-2 bg-black/50 hover:bg-black/70 text-white rounded-full ${
        direction === "next" ? "right-4" : "left-4"
      }`}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={direction === "next" ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
        />
      </svg>
    </div>
  );

  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    fade: true,
    arrows: true,
    dots: false,
    speed: 1000,
    nextArrow: <Arrow direction="next" />,
    prevArrow: <Arrow direction="prev" />,
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {ads.map(ad => (
          <div key={ad.id}>
            <div
              className="min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center bg-cover bg-center px-4"
              style={{ backgroundImage: `url(${ad.image})` }}
            >
              {ad.link ? (
                <Link
                  to={ad.link}
                  className="px-6 py-3 bg-black text-white rounded text-sm font-medium"
                >
                  {ad.title}
                </Link>
              ) : (
                <span className="px-6 py-3 bg-black text-white rounded text-sm font-medium">
                  {ad.title}
                </span>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AdBanner;

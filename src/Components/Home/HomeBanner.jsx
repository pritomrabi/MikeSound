import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const HomeBanner = () => {
  const slides = [
    {
      id: 1,
      title: "New Elegant Evening Dresses",
      button: "SHOP NOW",
      background:
        "https://woodmart.xtemos.com/wp-content/uploads/2024/02/fashion-flat-slide-2.jpg",
      alignment: "items-center justify-center text-center",
      titleStyles: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold",
    },
    {
      id: 2,
      title: "Oversize Striped T-shirt",
      button: "SHOP COLLECTION",
      background:
        "https://woodmart.xtemos.com/wp-content/uploads/2024/02/fashion-flat-slide-1.jpg",
      alignment: "items-center justify-start text-sleft",
      titleStyles: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold",
    },
  ];
  const NextArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer p-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
    >
      <svg
        className="md:w-6 w-4 h-4 md:h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
  const PrevArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer p-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
    >
      <svg
        className="md:w-6 w-4 h-4 md:h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
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
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div className="relative">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <div
              className={`min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex ${slide.alignment} bg-cover bg-center px-4`}
              style={{ backgroundImage: `url(${slide.background})` }}
            >
              <div className="max-w-2xl mx-auto text-white py-16">
                <h2
                  className={`${slide.titleStyles} ${
                    slide.whiteText
                      ? "text-white font-Roboto"
                      : "text-black font-Roboto"
                  }`}
                >
                  {slide.title}
                </h2>
                <div className="mt-6">
                  <Link
                    to="/shop"
                    className={`px-6 py-3 cursor-pointer rounded bg-black text-white text-sm font-Opensans font-medium`}
                  >
                    {slide.button}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeBanner;

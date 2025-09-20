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
    },
    {
      id: 2,
      title: "Oversize Striped T-shirt",
      button: "SHOP COLLECTION",
      background:
        "https://woodmart.xtemos.com/wp-content/uploads/2024/02/fashion-flat-slide-1.jpg",
    },
  ];

  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    fade: true,
    arrows: false, 
    dots: false,
    speed: 1000,
    swipe: true, 
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <div
              className={`h-[40vh] sm:h-[45vh] md:h-[70vh] flex ${slide.alignment} bg-cover bg-center items-center px-4`}
              style={{ backgroundImage: `url(${slide.background})` }}
            >
              <div className="max-w-2xl text-start mx-auto text-white py-16">
                <h2
                  className="text-primary text-start sm:text-4xl text-2xl md:text-6xl lg:text-7xl font-semibold"
                >
                  {slide.title}
                </h2>
                <div className="mt-6">
                  <Link
                    to="/shop"
                    className="md:px-6 px-4 md:py-2 py-3 cursor-pointer rounded bg-brand text-white text-sm font-Opensans font-medium"
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

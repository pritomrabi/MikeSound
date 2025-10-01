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
    {
      id: 3,
      title: "New Elegant Evening Dresses",
      button: "SHOP NOW",
      background:
        "https://woodmart.xtemos.com/wp-content/uploads/2024/02/fashion-flat-slide-2.jpg",
    },
  ];

  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    fade: true,
    arrows: false,
    dots: true,
    speed: 1000,
    swipe: true,
    customPaging: () => (
      <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-black transition" />
    ),
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <div
              className="h-[40vh] sm:h-[50vh] md:h-[70vh] flex bg-cover bg-center items-center px-4 relative"
              style={{ backgroundImage: `url(${slide.background})` }}
            >
              <div className="max-w-2xl text-start mx-auto text-white py-8 sm:py-12 md:py-16">
                <h2 className="text-primary sm:text-3xl md:text-5xl lg:text-7xl font-semibold uppercase leading-tight">
                  {slide.title}
                </h2>
                <div className="mt-4 sm:mt-6">
                  <Link
                    to="/shop"
                    className="md:px-6 px-4 md:py-2 py-2 rounded bg-brand text-white sm:text-sm text-xs font-medium"
                  >
                    {slide.button}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* dots styling */}
      <style>{`
        .slick-dots {
          position: absolute !important;
          bottom: 20px !important;
          left: 0;
          right: 0;
          display: flex !important;
          justify-content: center;
          gap: 8px;
        }
        .slick-dots li {
          margin: 0;
        }
        .slick-dots li div {
          width: 12px;
          height: 12px;
          border-radius: 9999px;
          background: black;
          transition: all 0.3s ease;
        }
        .slick-dots li.slick-active div {
          background: red !important;
          transform: scale(1.2);
        }

        /* responsive dots */
        @media (min-width: 768px) {
          .slick-dots li div {
            width: 16px;
            height: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default HomeBanner;

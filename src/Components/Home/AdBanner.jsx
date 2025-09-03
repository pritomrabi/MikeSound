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
    }
  ];

  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    fade: true,
    arrows: false, // remove arrows
    dots: false,
    speed: 1000,
    swipe: true, // allow drag/swipe
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {ads.map(ad => (
          <div key={ad.id}>
            <div
              className="min-h-[300px] md:min-h-[400px] lg:min-h-[500px] flex items-center justify-center bg-cover bg-center px-4"
              style={{ backgroundImage: `url(${ad.image})` }}
            >
              {ad.link ? (
                <Link
                  to={ad.link}
                  className="px-6 py-3 bg-brand text-white rounded text-sm font-medium"
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

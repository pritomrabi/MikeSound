// AdBanner.jsx
import { Link } from "react-router-dom";

const AdBanner = () => {
  const ads = [
    {
      id: 1,
      title: "BLOCK THE NOISE, FEEL EVERY BEAT.",
      subtitle: "Weekend Gift Offer",
      image: "https://i.ibb.co.com/Z2sQKc5/banner1.jpg",
      link: "/offers/weekend",
      type: "weekend"
    },
    {
      id: 2,
      title: "WHAT'S NEW?",
      subtitle: "Holiday Gift",
      image: "https://i.ibb.co.com/Jp7Z5Vg/banner2.jpg",
      link: "/offers/holiday",
      type: "holiday"
    }
  ];

  return (
    <div className="container mx-auto md:px-4 sm:px-2 px-4 my-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {ads.map((ad) => (
          <Link
            to={ad.link}
            key={ad.id}
            className="relative h-[30vh] sm:h-[35vh] md:h-[40vh] bg-cover bg-center flex items-end rounded-lg overflow-hidden"
            style={{ backgroundImage: `url(${ad.image})` }}
          >
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="relative p-4 text-white w-full">
              <h2 className="text-base sm:text-lg md:text-2xl font-bold font-Nunito-font">
                {ad.title}
              </h2>
              <p className="text-xs sm:text-sm md:text-base mt-1 font-Lato">
                {ad.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdBanner;

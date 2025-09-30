import { Link } from "react-router-dom";

const AdBanner = () => {
  const ads = [
    {
      id: 1,
      title: "BLOCK THE NOISE, FEEL EVERY BEAT.",
      subtitle: "JBL Tune 770NC. Now at just ₹4,999.",
      image: "https://i.ibb.co.com/Z2sQKc5/banner1.jpg", // প্রথম ছবির লিংক দাও
      link: "/discount",
    },
    {
      id: 2,
      title: "WHAT'S NEW?",
      subtitle: "Explore Our Latest Drops",
      image: "https://i.ibb.co.com/Jp7Z5Vg/banner2.jpg", // দ্বিতীয় ছবির লিংক দাও
      link: "/discount",
    },
  ];

  return (
    <div className="container mx-auto px-4 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ads.map((ad) => (
          <Link
            to={ad.link}
            key={ad.id}
            className="relative h-[35vh] sm:h-[45vh] md:h-[55vh] bg-cover bg-center flex items-end rounded-lg overflow-hidden"
            style={{ backgroundImage: `url(${ad.image})` }}
          >
            <div className="p-4 sm:p-6 bg-black/50 text-white w-full">
              <h2 className="text-base sm:text-lg md:text-2xl font-bold font-Monrope">
                {ad.title}
              </h2>
              <p className="text-xs sm:text-sm md:text-base mt-1 font-Lato">{ad.subtitle}</p>
              <button

                className="mt-3 inline-block bg-white text-black px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base font-medium font-Nunito-font rounded"
              >
                Shop Now
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdBanner;

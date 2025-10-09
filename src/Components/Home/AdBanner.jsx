import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../api/api";

const AdBanner = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      const res = await getProducts(); // fetch all products
      if (!res.error && res.products) {
        const adsWithOffer = res.products.filter(p => p.offer_type); // only products with offer_type
        setAds(adsWithOffer);
      }
    };
    fetchAds();
  }, []);

  return (
    <div className="container mx-auto md:px-4 sm:px-2 px-4 my-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {ads.map((ad, idx) => {
          const offerType = ad.offer_type?.toLowerCase();
          return (
            <Link
              key={idx}
              to={offerType ? `/discount/${offerType}` : "#"} 
              className="relative h-[30vh] sm:h-[35vh] md:h-[40vh] bg-cover bg-center flex items-end rounded-lg overflow-hidden"
              style={{ backgroundImage: `url(${ad.images[0]?.image})` }} 
            >
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="relative p-4 text-white w-full">
                <h2 className="text-base sm:text-lg md:text-2xl font-bold font-Nunito-font">
                  {ad.title}
                </h2>
                <p className="text-xs sm:text-sm md:text-base mt-1 font-Lato">
                  {ad.subtitle || ad.description.slice(0, 50)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdBanner;

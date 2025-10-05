import React, { useEffect, useState } from "react";
import Heading from "../../Utilities/Heading";
import { Link } from "react-router-dom";
import { getSubCategories } from "../../api/api"; // API function for subcategories

const HomeSubCategories = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubCategories = async () => {
      setLoading(true);
      const res = await getSubCategories();
      if (!res.error && Array.isArray(res)) {
        setSubcategories(res); // API returns list of subcategories
      }
      setLoading(false);
    };
    fetchSubCategories();
  }, []);

  if (loading) return <p className="text-center py-10 text-white">Loading subcategories...</p>;

  return (
    <section className="py-12 dark:bg-[#212020]">
      <div className="container mx-auto px-4">
        <Heading Head="Shop By Subcategories" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[250px]">
          {subcategories.map((subcat, idx) => (
            <Link
              key={idx}
              to={`/${subcat.slug}`}
              className="relative overflow-hidden rounded-md group"
            >
              <img
                src={subcat.image}
                alt={subcat.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <p className="absolute left-4 bottom-6 text-lg font-Opensans font-semibold text-primary bg-opacity-60 px-3 py-1 rounded-sm backdrop-blur-sm">
                {subcat.name}
              </p>
              <p className="absolute left-7 bottom-2 text-secandari text-sm">
                {subcat.product_count} Products
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSubCategories;

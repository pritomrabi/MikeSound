import React, { useEffect, useState } from "react";
import Heading from "../../Utilities/Heading";
import { Link } from "react-router-dom";
import { getCategoriesWithCount } from "../../api/api";

const HomeCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const res = await getCategoriesWithCount();
      console.log("Categories API response:", res); // console log
      if (!res.error && res.categories) {
        setCategories(res.categories);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);


  if (loading) {
    return <p className="text-center py-10 text-white">Loading categories...</p>;
  }

  return (
    <section className="py-12 dark:bg-[#212020]">
      <div className="container mx-auto px-4">
        <Heading Head="Shop By Categories" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[250px]">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={`/categories/${cat.slug}`}
              className="relative overflow-hidden rounded-md group"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <p className="absolute left-4 bottom-6 text-lg font-Opensans font-semibold text-primary bg-opacity-60 px-3 py-1 rounded-sm backdrop-blur-sm">
                {cat.title}
              </p>
              <p className="absolute left-7 bottom-2 text-secandari text-sm">
                {cat.total} Products
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCategories;

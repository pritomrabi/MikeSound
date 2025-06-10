import React from "react";
import Heading from "../../Utilities/Heading";
import { Link } from "react-router-dom";

const HomeCategories = () => {
  const categories = [
    {
      title: "Furniture",
      image:
        "https://woodmart.xtemos.com/wp-content/uploads/2017/01/cat-img-kids-4.jpg",
      link: "#",
      total: "20 Products",
      colSpan: "col-span-2 row-span-2",
    },
    {
      title: "Clocks",
      image:
        "https://woodmart.xtemos.com/wp-content/uploads/2017/01/cat-img-woman.jpg",
      link: "#",
      total: " 15 Products",
    },
    {
      title: "Accessories",
      image:
        "https://woodmart.xtemos.com/wp-content/uploads/2017/01/cat-img-glass.jpg",
      link: "#",
      total: "10 Products",
    },
    {
      title: "Cooking",
      image:
        "https://woodmart.xtemos.com/wp-content/uploads/2017/01/cat-img-accesories-9.jpg",
      link: "#",
      total: "8 Products",
    },
    {
      title: "Lighting",
      image:
        "https://woodmart.xtemos.com/wp-content/uploads/2017/01/cat-img-man.jpg",
      link: "#",
      total: "12 Products",
    },
  ];
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <Heading
          Head="Featured Categories"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {categories.map((cat, index) => (
            <a
              key={index}
              href={cat.link}
              className={`relative overflow-hidden rounded-md group ${
                cat.colSpan || ""
              }`}
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <p className="absolute left-4 bottom-6 text-lg font-Opensans font-semibold text-primary bg-opacity-60 px-3 py-1 rounded-sm backdrop-blur-sm">
                {cat.title}
              </p>
              <Link className="absolute left-7 bottom-2 text-secandari text-sm ">
                {cat.total}
              </Link>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCategories;

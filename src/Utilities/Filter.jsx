import { useEffect, useState } from "react";
import { Range } from "react-range";
import { FiX } from "react-icons/fi";
import { getProducts } from "../api/api";

const colors = [
  { name: "Black", code: "#000000" },
  { name: "Blue", code: "#1E90FF" },
  { name: "White", code: "#FFFFFF", border: true },
  { name: "Pink", code: "#FF69B4" },
  { name: "Red", code: "#FF0000" },
  { name: "Yellow", code: "#FFD700" },
  { name: "Grey", code: "#808080" },
];

const Filter = ({
  priceRange,
  setPriceRange,
  category,
  setCategory,
  showSidebar,
  setShowSidebar,
  categories,
  topRated,
  setTopRated,
  setFilteredProducts, // new prop
}) => {
  const [isPriceChanged, setIsPriceChanged] = useState(false);
  const [tempPriceRange, setTempPriceRange] = useState([0, 1000]);
  const [tempCategory, setTempCategory] = useState(category);
  const [selectedColors, setSelectedColors] = useState([]);

  const STEP = 1;
  const MIN = 0;
  const MAX = 1000;

  const handlePriceChange = (values) => {
    setTempPriceRange(values);
    setIsPriceChanged(
      values[0] !== priceRange[0] || values[1] !== priceRange[1]
    );
  };

  const toggleColor = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  useEffect(() => {
    if (showSidebar) setTempCategory(category);
  }, [showSidebar]);

  const applyFilter = async () => {
    setPriceRange(tempPriceRange);
    setCategory(tempCategory);

    const res = await getProducts(); // API থেকে সব প্রোডাক্ট নাও
    if (!res.error && res.products) {
      const filtered = res.products.filter((product) => {
        const price = product.variations?.[0]?.price || product.price;
        const withinPrice = price >= tempPriceRange[0] && price <= tempPriceRange[1];

        const matchCategory =
          tempCategory === "All" ||
          product.subcategory_name?.toLowerCase() === tempCategory.toLowerCase();

        const matchColor =
          selectedColors.length === 0 ||
          product.variations?.some((v) => selectedColors.includes(v.color_name));

        const matchRating = !topRated || product.rating >= 4.5;

        return withinPrice && matchCategory && matchColor && matchRating;
      });
      setFilteredProducts(filtered);
    }
    setIsPriceChanged(false);
    setShowSidebar(false);
  };

  if (!showSidebar) return null;

  return (
    <div className="fixed top-0 left-0 md:block w-full p-4 rounded-md mr-6 z-50 h-full">
      <div className="dark:bg-[#1b1b1b] fixed w-[90%] sm:w-[80%] md:w-[50%] lg:w-[25%] h-full top-0 left-0 bg-white px-5">
        <div
          onClick={() => setShowSidebar(false)}
          className="text-right my-4 border-b pb-4 border-gray-300 text-base text-primary dark:text-white font-Lato font-medium hover:text-secandari duration-300 cursor-pointer justify-end flex items-center gap-1 px-2"
        >
          <FiX className="text-lg" /> close
        </div>

        <h4 className="font-normal font-Roboto text-xl text-primary dark:text-white mb-2">
          Filter by Price
        </h4>

        <Range
          step={STEP}
          min={MIN}
          max={MAX}
          values={tempPriceRange}
          onChange={handlePriceChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "6px",
                width: "100%",
                background: `linear-gradient(to right, #b28a56 ${(tempPriceRange[0] / MAX) * 100}%, #e0e0e0 ${(tempPriceRange[0] / MAX) * 100}%, #e0e0e0 ${(tempPriceRange[1] / MAX) * 100}%, #b28a56 ${(tempPriceRange[1] / MAX) * 100}%)`,
                borderRadius: "4px",
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "15px",
                width: "5px",
                backgroundColor: "#b28a56",
                borderRadius: "10%",
              }}
            />
          )}
        />
        <div className="justify-between items-center flex pt-4">
          <p className="text-sm text-primary dark:text-white font-Monrope font-normal">
            Price $ {tempPriceRange[0]} - $ {tempPriceRange[1]}
          </p>
        </div>

        <h4 className="font-normal font-Roboto text-xl text-primary dark:text-white mt-6 mb-2">
          Filter by Colour
        </h4>
        <div className="flex flex-wrap gap-4">
          {colors.map((color) => (
            <div
              key={color.name}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => toggleColor(color.name)}
            >
              <div
                className={`w-8 h-8 rounded-full border ${color.border ? "border-black" : ""
                  }`}
                style={{ backgroundColor: color.code }}
              >
                {selectedColors.includes(color.name) && (
                  <div className="w-3 h-3 bg-brand rounded-full m-auto mt-[9px]" />
                )}
              </div>
              <p className="text-sm mt-1">{color.name}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h4 className="font-normal font-Roboto text-xl text-primary dark:text-white mb-2">
            Filter by Category
          </h4>
          {categories.map((cat) => (
            <div key={cat} className="flex items-center mb-1">
              <input
                type="radio"
                id={cat}
                name="category"
                value={cat}
                checked={tempCategory === cat}
                onChange={() => setTempCategory(cat)}
                className="mr-2"
              />
              <label
                className="text-primary dark:text-white text-base font-medium font-Lato"
                htmlFor={cat}
              >
                {cat}
              </label>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h4 className="font-normal font-Roboto text-xl text-primary dark:text-white mb-2">
            Top Rated
          </h4>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={topRated}
              onChange={() => setTopRated(!topRated)}
              className="mr-2"
            />
            4 stars & up
          </label>
        </div>

        <div className="flex justify-end mt-4">
          <button
            disabled={false}
            // disabled={
            //   !isPriceChanged &&
            //   tempCategory === category &&
            //   selectedColors.length === 0
            // }
            onClick={applyFilter}
            className="mt-2 text-xs px-5 py-1.5 rounded cursor-pointer transition bg-brand text-white"
          >
            FILTER
          </button>
        </div>
      </div>
      <div
        onClick={() => setShowSidebar(false)}
        className="fixed w-[10%] sm:w-[20%] md:w-[50%] lg:w-[75%] top-0 right-0 bg-[rgba(0,0,0,0.1)] z-50 h-full cursor-pointer"
      ></div>
    </div>
  );
};

export default Filter;

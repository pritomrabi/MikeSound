import React, { useMemo } from "react";

const Filter = ({
  priceRange,
  setPriceRange,
  category,
  setCategory,
  topRated,
  setTopRated,
  selectedColor,
  setSelectedColor,
  categories,
  showSidebar,
  setShowSidebar,
  products // parent theke pass kora
}) => {

  // Extract unique colors from all products
  const colors = useMemo(() => {
    const map = new Map();
    products.forEach(product => {
      product.variations?.forEach(v => {
        if (!map.has(v.color_name)) {
          map.set(v.color_name, v.color_hex);
        }
      });
    });
    return Array.from(map, ([name, hex]) => ({ name, hex }));
  }, [products]);

  return (
    <div className={`bg-white dark:bg-[#2a2a2a] p-4 rounded shadow mb-6 ${showSidebar ? "block" : "hidden"}`}>
      {/* Category */}
      <div className="mb-4">
        <h4 className="font-medium mb-2 text-primary dark:text-white">Category</h4>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`mr-2 mb-2 px-3 py-1 rounded border ${category === cat ? "border-blue-500" : "border-gray-300"} dark:text-white`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <h4 className="font-medium mb-2 text-primary dark:text-white">Price Range</h4>
        <input
          type="number"
          value={priceRange[0]}
          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
          className="w-20 mr-2 p-1 border rounded"
        />
        -
        <input
          type="number"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-20 ml-2 p-1 border rounded"
        />
      </div>

      {/* Top Rated */}
      <div className="mb-4">
        <label className="flex items-center gap-2 text-primary dark:text-white">
          <input
            type="checkbox"
            checked={topRated}
            onChange={() => setTopRated(!topRated)}
          />
          Top Rated
        </label>
      </div>

      {/* Color */}
      <div className="mb-4">
        <h4 className="font-medium mb-2 text-primary dark:text-white">Color</h4>
        <div className="flex gap-2 flex-wrap">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(selectedColor === color.name ? null : color.name)}
              style={{ backgroundColor: color.hex }}
              className={`w-6 h-6 rounded border-2 ${selectedColor === color.name ? "border-black" : "border-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;

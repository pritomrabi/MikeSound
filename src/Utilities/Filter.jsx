import { useEffect, useState } from "react";

const Filter = ({
    priceRange,
    setPriceRange,
    category,
    setCategory,
    showSidebar,
    setShowSidebar,
  }) => {
    const [isPriceChanged, setIsPriceChanged] = useState(false);
    const [tempPriceRange, setTempPriceRange] = useState(priceRange);
    const [tempCategory, setTempCategory] = useState(category);
  
    const handleRangeChange = (e) => {
      const value = Number(e.target.value);
      setTempPriceRange(value);
      setIsPriceChanged(value !== priceRange);
      updateSliderBackground(e.target);
    };
  
    const updateSliderBackground = (slider) => {
      const min = Number(slider.min);
      const max = Number(slider.max);
      const value = Number(slider.value);
      const percent = ((value - min) / (max - min)) * 100;
      slider.style.background = `linear-gradient(to right, #b28a56 ${percent}%, #e0e0e0 ${percent}%)`;
    };
  
    useEffect(() => {
      const slider = document.querySelector(".custom-slider");
      if (slider) updateSliderBackground(slider);
    }, [tempPriceRange]);
  
    useEffect(() => {
      if (showSidebar) {
        setTempCategory(category);
      }
    }, [showSidebar]);
  
    return (
      <div>
        <h4 className="font-normal font-Roboto text-xl text-primary mb-2">
          Filter by Price
        </h4>
        <input
          type="range"
          min="0"
          max="1000"
          value={tempPriceRange}
          onChange={handleRangeChange}
          className="custom-slider"
        />
  
        <div className="justify-between items-center flex pt-4">
          <p className="text-sm text-primary font-Monrope font-normal">
            Price $ {tempPriceRange}
          </p>
          <button
            disabled={!isPriceChanged && tempCategory === category}
            onClick={() => {
              setPriceRange(tempPriceRange);
              setIsPriceChanged(false);
              setCategory(tempCategory);
              setShowSidebar(false);
            }}
            className="mt-2 text-xs px-5 py-1.5 rounded cursor-pointer transition bg-brand text-white"
          >
            FILTER
          </button>
        </div>
      </div>
    );
  };
  
  export default Filter;
  
import { useEffect, useState } from "react";
import { Range } from "react-range";

const Filter = ({
  priceRange,
  setPriceRange,
  category,
  setCategory,
  showSidebar,
  setShowSidebar,
}) => {
  const [isPriceChanged, setIsPriceChanged] = useState(false);
  const [tempPriceRange, setTempPriceRange] = useState([0, 1000]);
  const [tempCategory, setTempCategory] = useState(category);

  const STEP = 1;
  const MIN = 0;
  const MAX = 1000;

  const handlePriceChange = (values) => {
    setTempPriceRange(values);
    setIsPriceChanged(values[0] !== priceRange[0] || values[1] !== priceRange[1]);
  };

  useEffect(() => {
    if (showSidebar) setTempCategory(category);
  }, [showSidebar]);

  return (
    <div>
      <h4 className="font-normal font-Roboto text-xl text-primary mb-2">
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
        <p className="text-sm text-primary font-Monrope font-normal">
          Price $ {tempPriceRange[0]} - $ {tempPriceRange[1]}
        </p>
        <button
          disabled={
            !isPriceChanged && tempCategory[0] === category[0] && tempCategory[1] === category[1]
          }
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

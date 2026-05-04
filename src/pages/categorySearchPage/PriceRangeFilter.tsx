import React from "react";

type PriceRange = {
  label: string;
  min: number;
  max: number;
};

type Props = {
  ranges: PriceRange[];
  selectedRange: { min: number; max: number };
  onRangeChange: (range: { min: number; max: number }) => void;
};

const PriceRangeFilter: React.FC<Props> = ({
  ranges,
  selectedRange,
  onRangeChange,
}) => {
  const min = selectedRange.min;
  const max = selectedRange.max;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), max - 10);

    onRangeChange({
      min: newMin,
      max,
    });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), min + 10);

    onRangeChange({
      min,
      max: newMax,
    });
  };

  return (
    <div className="w-full p-4 bg-white rounded-md shadow-sm">
      <h3 className="text-sm font-semibold text-black mb-4">
        Price Range
      </h3>

      <div className="relative w-full h-6 flex items-center mb-4">
        <input
          type="range"
          min={0}
          max={1000}
          value={min}
          onChange={handleMinChange}
          className="absolute w-full h-1 appearance-none bg-gray-200 rounded z-10"
        />

        <input
          type="range"
          min={0}
          max={1000}
          value={max}
          onChange={handleMaxChange}
          className="absolute w-full h-1 appearance-none bg-transparent z-10"
        />
      </div>

      <div className="flex gap-4">
        <button className="w-full border text-sm px-4 py-2">
          $ {min}
        </button>

        <button className="w-full border text-sm px-4 py-2">
          $ {max}
        </button>
      </div>

      {/* optional quick ranges */}
      <div className="mt-3 space-y-1">
        {ranges.map((r) => (
          <button
            key={r.label}
            onClick={() => onRangeChange({ min: r.min, max: r.max })}
            className="text-sm text-blue-500 block"
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PriceRangeFilter;
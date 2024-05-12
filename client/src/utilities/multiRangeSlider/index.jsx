import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";

export default ({ defaultValue, max, onChange, className, slider }) => {
  const [rangeValue, setRangeValue] = useState(defaultValue);
  console.log(rangeValue);

  const rangeChange = (newValue) => {
    setRangeValue(newValue);
  };
  const onRangeChangeComplete = (value) => {
    onChange(value);
  };

  return (
    <>
      {slider ? (
        <>
          <Slider
            range
            className={className}
            min={1}
            pushable={20}
            max={max}
            allowCross={false}
            value={rangeValue}
            onChange={rangeChange}
            onChangeComplete={onRangeChangeComplete}
          />
          <div className="flex justify-between ">
            <p className="text-sm font-sans font-semibold text-blue-gray-800">
              ₹{rangeValue[0]}
            </p>
            <p className="text-sm font-sans font-semibold text-blue-gray-800">
              ₹{rangeValue[1] === max ? "5000+" : rangeValue[1]}
            </p>
          </div>
        </>
      ) : (
        <>
          <Slider
            range
            className={className}
            min={1}
            pushable={20}
            max={max}
            allowCross={false}
            value={rangeValue}
            onChange={rangeChange}
            onChangeComplete={onRangeChangeComplete}
          />
          <div className="flex justify-between ">
            <p className="text-sm font-sans font-semibold text-blue-gray-800">
              ₹{rangeValue[0]}
            </p>
            <p className="text-sm font-sans font-semibold text-blue-gray-800">
              ₹{rangeValue[1] === max ? "5000+" : rangeValue[1]}
            </p>
          </div>
        </>
      )}
    </>
  );
};

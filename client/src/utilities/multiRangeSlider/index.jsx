import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";

export default ({defaultValue,max,onChange,className}) => {
  
    const [rangeValue, setRangeValue] = useState(defaultValue);
    console.log(rangeValue)

  const rangeChange = newValue => {
    setRangeValue(newValue);
  };
  const onRangeChangeComplete = value => {
    onChange(value);
  };

  return (
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
    </>
  );
};


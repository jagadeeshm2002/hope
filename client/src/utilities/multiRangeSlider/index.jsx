import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useState } from "react";
import {ArrowPathIcon} from "@heroicons/react/24/outline"
import { Rating } from "@material-tailwind/react";

export const MultiRangeSlider = ({ defaultValue, max, onChange, className, slider }) => {
  const [rangeValue, setRangeValue] = useState(defaultValue);
  

  const rangeChange = (newValue) => {
    setRangeValue(newValue);
  };
  const onRangeChangeComplete = (value) => {
    onChange(value);
  };
  const priceMarks = {
    1: { label: <p className='font-sans  text-black'>₹1</p> },
    5000: { label: <p className='font-sans  text-black'>₹5000</p> }
  };
  
 

  return (
    
      
        
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
            marks={priceMarks}
          />
          
     
  );
};
export const RatingSlider = ({ onChange, handleChange, className }) => {
  const [value, setValue] = useState(null);

  const handleOnChange = (newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    
  },[value])

  return (
    <div className="px-2 inline-flex items-center gap-2">
      <Rating value={value} onClick={handleOnChange} />
      <ArrowPathIcon
        className="w-5 h-5 hover:cursor-pointer"
        width={10}
        height={10}
        onClick={() => setValue(null)}
        
      />
    </div>
  );
};


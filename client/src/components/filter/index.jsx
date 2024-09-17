import React, { useEffect, useState } from "react";
import { MultiRangeSlider } from "./MultiRangeSlider";
import CategoryFilter from "./CategoryFilter";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import BrandFilter from "./BrandFilter";
import { Button } from "@material-tailwind/react";

function Filter({ filter, setFilter, handleFilterApply, handleFilterClear }) {
  const [filterShow, setFilterShow] = useState(false);
  function handlePriceChange(value) {
    setFilter({ ...filter, price: value });
  }
  function handleCategoryChange(value) {
    setFilter({ ...filter, category: value });
  }
  function handleBrandChange(value) {
    setFilter({ ...filter, brand: value });
  }

  useEffect(() => {
    
  }, [filter]);
  return (
    <div className=" w-full md:space-y-2 px-5">
      <div className="bg-white border border-gray-300 rounded-lg w-full lg:w-56 flex flex-col ">
        <div
          className="px-4 py-2 text-md bg-blue-gray-100 rounded-t-md flex justify-between cursor-pointer"
          onClick={() => setFilterShow(!filterShow)}
        >
          <p className="font-sans font-bold text-start">Filter</p>
          <button className="cursor-pointer block lg:hidden ">
            {filterShow ? (
              <ChevronUpIcon
                width={24}
                height={24}
                className="ease-linear transform transition-transform duration-300 rotate-180"
              />
            ) : (
              <ChevronDownIcon
                width={24}
                height={24}
                className="ease-linear transform transition-transform duration-300 rotate-180"
              />
            )}
          </button>
        </div>
        <hr
          className={`border-gray-300  ${
            filterShow ? "block" : "hidden"
          } lg:block`}
        />
        <div
          className={`   ${
            filterShow ? "block" : "hidden"
          } transition-all lg:block`}
        >
          <MultiRangeSlider
            defaultValue={filter?.price}
            onChange={handlePriceChange}
            max={5000}
            className="flex"
            name="price"
            slider={false}
          />
          <hr className="border-gray-300" />
          <CategoryFilter
            onChange={handleCategoryChange}
            value={filter?.category}
          />
          <hr className="border-gray-300" />
          <BrandFilter onChange={handleBrandChange} value={filter?.brand} />

          <div className="flex justify-between px-4 mb-3">
            <Button
              size="sm"
              variant="outlined"
              onClick={()=>handleFilterClear()}
            >
              clear
            </Button>
            <Button size="sm" color="blue-gray" onClick={() => handleFilterApply()}>
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;

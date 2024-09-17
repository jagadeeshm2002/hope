import React, { useState } from 'react'
import { MultiRangeSlider } from './MultiRangeSlider';
import CategoryFilter from './CategoryFilter';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import BrandFilter from './BrandFilter';


function Filter() {
    const [priceRange, setPriceRange] = useState([1, 5000]);
  const [filterShow, setFilterShow] = useState(false);
  return (
    <div className=" w-full md:space-y-2 px-5">
              <div className="bg-white border border-gray-300 rounded-lg w-full lg:w-56 flex flex-col ">
                <div className="px-4 py-2 text-md bg-blue-gray-100 rounded-t-md flex justify-between">
                  <p className="font-sans font-bold text-start">Filter</p>
                  <button
                    className="cursor-pointer block lg:hidden"
                    onClick={() => setFilterShow(!filterShow)}
                  >
                    <ChevronDownIcon width={24} height={24} />
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
                    defaultValue={priceRange}
                    onChange={setPriceRange}
                    max={5000}
                    className="flex"
                    slider={false}
                  />
                  <hr className='border-gray-300' />
                    <CategoryFilter />
                  <hr className='border-gray-300' />
                   <BrandFilter/>
                  
                  
                </div>
              </div>
            </div>
  )
}

export default Filter
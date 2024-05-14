import React, { useState } from "react";
import {MultiRangeSlider} from "../../utilities/multiRangeSlider";
import {Select,Option, } from "@material-tailwind/react";
import { useGetProductsQuery } from "../../features/product/productApiSlice";

const Shop = () => {
  const [priceRange, setPriceRange] = useState([1, 5000]);
  const[sortBy,setSortBy]=useState("newest")

  // const [data,isloading] = useGetProductsQuery();
  // console.log(data)


  return (
    <div className="bg-red-700 w-full flex justify-center py-12">
      <div className=" max-w-screen-xl w-[1280px] bg-blue-gray-600">
        <div className="flex flex-row w-full">
          <aside className="w-1/3 mx-6">
            <div className="space-y-2">
              <div className="bg-white border border-gray-400 rounded-md w-56 flex flex-col">
                <div className="px-4 py-2 text-md bg-blue-gray-100 rounded-t-md">
                  <p className="font-sans font-bold text-start">Price</p>
                </div>
                <hr className="border-gray-500" />
                <div className="px-7 py-8">
                  <MultiRangeSlider
                    defaultValue={priceRange}
                    onChange={setPriceRange}
                    max={5000}
                    className="flex"
                    slider={false}
                  />
                </div>
              </div>
              
            </div>
          </aside>
          <section className="w-2/3">
            <div className="flex flex-col space-y-2 ">
              <div className="flex flex-row justify-between  items-center border border-gray-600 px-6 py-2 rounded-lg bg-gray-50">
                <div>
                  <p>showing 12 of 24 results</p>
                </div>
                <div className="flex flex-row justify-around gap-2 items-center">
                  <p className="font-sans text-start w-full">Sort by</p>

                  <Select className=" !border !border-gray-300 bg-white text-gray-900 "  labelProps={{className:"hidden"}} value={sortBy} onChange={(val)=>setSortBy(val)}>
                    <Option  value="newest">Newest First</Option>
                    <Option value="high" >Price High to Low</Option>
                    <Option value="low">Price Low to High</Option>
                  </Select>
                </div>
              </div>
            </div>
            <div className="text-lg">Shop
            {/* {data.map((product) => <div>{product.name}</div>)} */}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Shop;

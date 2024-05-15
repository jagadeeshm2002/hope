import React, { useState } from "react";
import { MultiRangeSlider } from "../../utilities/multiRangeSlider";
import { Select, Option, Spinner, Button } from "@material-tailwind/react";
import { useGetProductsQuery } from "../../features/product/productApiSlice";
import { ProductList } from "../../components/productList";
import { ArrowDownIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const Shop = () => {
  const [priceRange, setPriceRange] = useState([1, 5000]);
  const [priceShow, setPriceShow] = useState(false);

  const [sortBy, setSortBy] = useState("newest");

  const { data, isloading, error, refetch } = useGetProductsQuery();
  console.log(data);
console.log(error);
  // Check if there is an error and the error message is "Not server response"

  return (
    <div className="bg-red-700 w-full flex justify-center py-12">
      <div className=" max-w-screen-xl w-[1280px] bg-blue-gray-600">
        <div className="flex flex-col lg:flex-row w-full gap-4">
          <aside className="w-full lg:w-56">
            <div className="md:space-y-2 px-5">
              <div className="bg-white border border-gray-400 rounded-md w-full lg:w-52 flex flex-col ">
                <div className="px-4 py-2 text-md bg-blue-gray-100 rounded-t-md flex justify-between">
                  <p className="font-sans font-bold text-start">Price</p>
                  <button
                    className="cursor-pointer block lg:hidden"
                    onClick={() => setPriceShow(!priceShow)}
                  >
                    <ChevronDownIcon width={24} height={24} />
                  </button>
                </div>
                <hr
                  className={`border-gray-500  ${
                    priceShow ? "block" : "hidden"
                  } lg:block`}
                />
                <div
                  className={`px-7 py-8  ${
                    priceShow ? "block" : "hidden"
                  } transition-all lg:block`}
                >
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
          <section className="w-full md:w-5/7 flex flex-col gap-4 px-4">
            <div className="flex flex-col space-y-2 ">
              <div className="flex flex-row justify-between  items-center border border-gray-600 px-6 py-2 rounded-lg bg-gray-50">
                <div>
                  <p>showing 12 of 24 results</p>
                </div>
                <div className="flex flex-row justify-around gap-2 items-center">
                  <p className="font-sans text-start w-full">Sort by</p>

                  <Select
                    className=" !border !border-gray-300 bg-white text-gray-900 "
                    labelProps={{ className: "hidden" }}
                    value={sortBy}
                    onChange={(val) => setSortBy(val)}
                  >
                    <Option value="newest">Newest First</Option>
                    <Option value="high">Price High to Low</Option>
                    <Option value="low">Price Low to High</Option>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="grid   grid-cols-2 xl:grid-cols-3 gap-4">
                {data && data?.length > 0 ? (
                  data.map((product) => (
                    <ProductList item={product} key={product.slug} />
                  ))
                ) : error ? (
                  <div>
                    <p>{error?.status}</p>
                    <Button onClick={() => refetch()}>Retry</Button>
                  </div>
                ) : (
                  <Spinner />
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Shop;

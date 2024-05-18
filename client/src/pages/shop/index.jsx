import React, { useState, useEffect } from "react";
import { MultiRangeSlider } from "../../utilities/multiRangeSlider";
import { Select, Option, Spinner, Button } from "@material-tailwind/react";
import { useGetProductsQuery } from "../../features/product/productApiSlice";
import { ProductList } from "../../components/productList";
import {  ChevronDownIcon } from "@heroicons/react/24/outline";
import { Pagination } from "../../utilities/pagination/pagination";

export default function Shop({ category }) {
  const [priceRange, setPriceRange] = useState([1, 5000]);
  const [priceShow, setPriceShow] = useState(false);
  const [activePage, setActivePage] = useState(1);

  const [sortBy, setSortBy] = useState("newest");
  const shopCategory = category || "all";

  const { isLoading, error, refetch, data } = useGetProductsQuery({
    category: shopCategory,
    page: activePage,
  });
  
  const { productsData: products, total, totalPages } = data || {};
  const startCount = (activePage - 1) * 18 + 1;
  const endCount = activePage * 18 > total ? total : activePage * 18;
  
  // Check if there is an error and the error message is "Not server response"
  useEffect(() => {
    const resetState = () => {
      setPriceRange([1, 5000]);
      setPriceShow(false);
      setActivePage(1);
      setSortBy("newest");
    };

    resetState();
  }, [category]);
  return (
    <div className=" w-full flex justify-center py-12 ">
      <div className=" max-w-screen-xl w-[1280px] ">
        <div className="flex flex-col lg:flex-row w-full gap-4">
          <aside className="w-full lg:w-56">
            <div className="md:space-y-2 px-5">
              <div className="bg-white border border-gray-300 rounded-md w-full lg:w-52 flex flex-col ">
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
                  className={`border-gray-300  ${
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
              <div className="flex flex-row justify-between  items-center border border-gray-300 px-6 py-2 rounded-lg bg-gray-50">
                <div>
                  <p>
                    Showing
                    <span className="mx-1">
                      {startCount}-{endCount}
                    </span>
                    of<span className="mx-1">{total}</span>results
                  </p>
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
            <div className="flex flex-col items-center justify-center">
              <div className="grid   grid-cols-2 xl:grid-cols-3 gap-4">
                {products && products?.length > 0 ? (
                  products.map((product) => (
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
              <div className="mt-10">
                <Pagination
                  active={activePage}
                  setActive={setActivePage}
                  total={totalPages}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

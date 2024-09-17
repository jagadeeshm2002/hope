import React, { useState, useEffect } from "react";
import { MultiRangeSlider } from "../../components/filter/MultiRangeSlider";
import { Select, Option, Spinner, Button } from "@material-tailwind/react";
import { useGetProductsQuery } from "../../features/product/productApiSlice";
import { ProductList } from "../../components/productList";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Pagination } from "../../utilities/pagination/pagination";
import CategoryFilter from "../../components/filter/CategoryFilter";
import Filter from "../../components/filter";
import SortByFilter from "../../components/filter/SortByFilter";

export default function Shop({ category }) {
  const filterInit = { price: [1, 5000], category: "all", brand: null };
  const [filter, setFilter] = useState(filterInit);
  const [activePage, setActivePage] = useState(1);

  const shopCategory = category || "all";

  const { isLoading, error, refetch, data } = useGetProductsQuery({
    category: shopCategory,
    page: activePage,
  });

  const { productsData: products, total, totalPages } = data || {};

  // Check if there is an error and the error message is "Not server response"
  // useEffect(() => {
  //   const resetState = () => {
  //     setPriceRange([1, 5000]);
  //     setPriceShow(false);
  //     setActivePage(1);
  //     setSortBy("newest");
  //   };

  //   resetState();
  // }, [category]);
  // if (error) {
  //   return (
  //     <div>
  //       <p>{error?.status}</p>
  //       <Button onClick={() => refetch()}>Retry</Button>
  //     </div>
  //   );
  // }
  return (
    <div className=" w-full flex justify-center py-12 min-h-[58vh]">
      <div className=" max-w-screen-xl w-full lg:w-[1280px] ">
        <div className="flex flex-col lg:flex-row w-full gap-4">
          <aside className="w-full flex-1  flex justify-center border border-black">
            <Filter />
          </aside>
          <section className="w-full md:w-5/7 flex flex-col gap-4 px-4">
            <SortByFilter total={total} activePage={activePage} />
            <div className="flex flex-col items-center justify-center">
              <div className={error?"flex justify-center items-center":"grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-4"}>
                {products && products?.length > 0 ? (
                  products.map((product) => (
                    <ProductList item={product} key={product.slug} />
                  ))
                ) : isLoading ? (
                  <Spinner />
                ):error&&  (
                  <div className="flex flex-col">
                    <p className="text-red-500 font-sans mb-2 ">{error?.status}</p>
                    <Button onClick={() => refetch()}>Retry</Button>
                  </div>
                )}
              </div>
              <div className="mt-10">
                <Pagination
                  active={activePage}
                  setActive={setActivePage}
                  total={totalPages}
                  error={error}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

/**
 * Shop page component
 *
 * This component renders the shop page with pagination, filter and product list.
 * It accepts a category prop to filter the products by category.
 *
 * @param {string} category - The category to filter the products by
 */

import React, { useState, useEffect } from "react";
import { Spinner, Button } from "@material-tailwind/react";
import { useGetProductsQuery } from "../../features/product/productApiSlice";
import { ProductList } from "../../components/productList";
import { Pagination } from "../../utilities/pagination/pagination";
import Filter from "../../components/filter";
import SortByFilter from "../../components/filter/SortByFilter";
export default function Shop({ categoryValue }) {
  const filterInit = {
    price: [1, 5000],
    category: categoryValue || "all",
    brand: "hope",
    page: 1,
  };

  const [filter, setFilter] = useState(filterInit);

  /**
   * The sort by filter state
   */
  const [sortby, setSortBy] = useState("newest");

  /**
   * The applied filter state
   *
   * This state is used to keep track of the current filter applied to the products
   */
  const [appliedFilter, setAppliedFilter] = useState(filterInit);

  /**
   * The query to fetch the products
   *
   * This query fetches the products with the applied filter
   */
  const { isLoading, error, refetch, data } = useGetProductsQuery({
    ...appliedFilter,
  });

  /**
   * The products data
   *
   * This object contains the products data, total and total pages
   */
  const { productsData: products, total, totalPages } = data || {};
 
  const sortedProducts =
    sortby === "newest"
      ? products
      : sortby === "high"
      ? [...products].sort((a, b) => b.price.offerPrice - a.price.offerPrice) // High to Low
      : sortby === "low"
      ? [...products].sort((a, b) => a.price.offerPrice - b.price.offerPrice) // Low to High
      : products?.reverse(); // Default sort (reversed)

  /**
   * Debounce function
   *
   * This function is used to debounce the refetch function
   * @param {function} fn - The function to debounce
   * @param {number} delay - The delay in milliseconds
   */
  function debounce(fn, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  /**
   * The debounced refetch function
   *
   * This function is used to debounce the refetch function
   */
  const debounceRefetch = debounce(refetch, 500);

  /**
   * Handle filter apply
   *
   * This function is called when the user applies a new filter
   * It resets the page to the first page and triggers a refetch with the new filter
   */
  function handleFilterApply() {
    // Reset to the first page when applying a new filter

    setAppliedFilter(filter); // Apply the current filter
    debounceRefetch();
  }

  /**
   * Handle refetch when the active page changes
   *
   * This function is called when the user changes the active page
   * It triggers a refetch with the new page
   */
  useEffect(() => {
    setAppliedFilter({ ...filter, page: filter.page });
  }, [filter.page]);

  useEffect(() => {
    setAppliedFilter(filterInit)
    setFilter(filterInit)
  }, [categoryValue]);

  const handleFilterClear = () => {
    setFilter(filterInit); // Reset filter
    // Reset to the first page
    setAppliedFilter(filterInit); // Apply the initial filter
    debounceRefetch(); // Trigger refetch
  };

  return (
    <div className=" w-full flex justify-center py-12 min-h-[58vh]">
      <div className=" max-w-screen-xl w-full lg:w-[1280px] ">
        <div className="flex flex-col lg:flex-row w-full gap-4">
          <aside className="w-full flex-1  flex justify-center ">
            <Filter
              filter={filter}
              setFilter={setFilter}
              handleFilterApply={handleFilterApply}
              handleFilterClear={handleFilterClear}
            />
          </aside>
          <section className="w-full md:w-5/7 flex flex-col gap-4 px-4">
            <SortByFilter
              total={total}
              activePage={filter?.page}
              sortby={sortby}
              setSortBy={setSortBy}
            />
            <div className="flex flex-col items-center justify-center w-full">
              {products && products?.length > 0 ? (
                <div
                  className={
                    "grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-4 "
                  }
                >
                  {sortedProducts.map((product) => (
                    <ProductList item={product} key={product.slug} />
                  ))}
                </div>
              ) : total === 0 && products?.length === 0 ? (
                <div className="flex justify-center items-center">
                  <p>NO products found</p>
                </div>
              ) : isLoading ? (
                <Spinner />
              ) : (
                error && (
                  <div className="flex flex-col">
                    <p className="text-red-500 font-sans mb-2 ">
                      {error?.status}
                    </p>
                    <Button onClick={() => refetch()}>Retry</Button>
                  </div>
                )
              )}

              <div className="mt-10">
                <Pagination
                  filter={filter}
                  setFilter={setFilter}
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

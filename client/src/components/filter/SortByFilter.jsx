import { Option, Select } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

function SortByFilter({ total=0, activePage=0 }) {
  const [sortBy, setSortBy] = useState("newest");
  const startCount = total ===0 ? 0 : (activePage - 1) * 18 + 1;
  console.log(startCount)
  const endCount = activePage * 18 > total ? total : activePage * 18;
  useEffect(() => {
    
  },[total])
  console.log(total,activePage)
  return (
    <div className="flex flex-col space-y-2  ">
      <div className="flex flex-col sm:flex-row justify-between  items-center border border-gray-300 px-6 py-2 rounded-lg bg-gray-50">
        <div className="flex items-start w-full mb-3 sm:mb-0">
          <p>
            Showing
            <span className="mx-1">
              {startCount}-{endCount}
            </span>
            of<span className="mx-1">{total}</span>results
          </p>
        </div>
        <div className="flex flex-row gap-2 w-full items-center ">
          <p className="font-sans text-start w-24 ">Sort by</p>

          <Select
            className=" !border !border-gray-300 bg-whitetext-gray-900 "
            labelProps={{ className: "hidden " }}
            value={sortBy}
            onChange={(val) => setSortBy(val)}
            disabled={total === 0}
            
          >
            <Option value="newest">Newest First</Option>
            <Option value="high">Price High to Low</Option>
            <Option value="low">Price Low to High</Option>
          </Select>
        </div>
      </div>
    </div>
  );
}

export default SortByFilter;

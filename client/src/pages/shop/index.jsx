import React from "react";
import Price from "../../components/price";
import Rating from "../../components/rating";

const Shop = (category) => {
  console.log(category);
  return (
    <div className="bg-red-700 w-full flex justify-center">
      <div className="max-w-screen-xl bg-blue-gray-800">
        <div className="flex flex-row w-full">
          <div className="w-1/3"><div><div><Price /></div><div><Rating/></div></div></div>
          <div className="w-2/3"><div><div>filter</div><div>shop</div></div></div>
          
        </div>
      </div>
    </div>
  );
};

export default Shop;

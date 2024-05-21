import React from "react";
import { Link } from "react-router-dom";
import dummy from "../../../assets/dummy-product.jpg";
import { XCircleIcon } from "@heroicons/react/24/solid";

const Favourites = () => {
  const favList = [
    {
      product: {
        _id: "5d21814f4c42572e4c07bdbe",
        name: "Calvin klien perfume",
        price: 3,
        slug: "womens-high-heel-shoe",
      },
      user: "661f86b2464436001023ecad",
      isLiked: true,
      _id: "664c297d1ee5f600104b374d",
      updated: "2024-05-21T04:56:32.798Z",
      created: "2024-05-21T04:56:29.936Z",
      __v: 0,
    },
    {
      product: {
        _id: "5d216469577a475fc07ef64d",
        name: "Slim fit shirt",
        price: 29,
        slug: "womens-denim-jacket",
      },
      user: "661f86b2464436001023ecad",
      isLiked: true,
      _id: "664c297c1ee5f600104b374c",
      updated: "2024-05-21T04:56:28.699Z",
      created: "2024-05-21T04:56:28.699Z",
      __v: 0,
    },
  ];
  return (
    <div className="w-full flex flex-col">
      <p className="text-start">Favourites</p>
      <hr className=" border-b border-b-gray-500" />
      <div className="w-full flex flex-col gap-4 py-4 px-4">
        {favList && favList.length === 0 ? (
          <p>No products in favourites</p>
        ) : (
          favList.map((item) => {
            return (
              <Link
                to={`/shop/${item.product.slug}`}
                key={item._id}
                className="border border-gray-400 rounded-md"
              >
                <div className="flex flex-row ">
                  <img src={dummy} alt="" className="w-32 h-32 rounded-md" />
                  <div className="flex-1 flex flex-col items-start ml-4 gap-2 py-4">
                    <p className="text-lg font-medium">{item.product.name}</p>
                    <p>${item.product.price}</p>
                    <p>{`${new Date(item.created).toDateString()}`} was Added.</p>
                  </div>
                  <div className="flex-1 flex justify-end items-center mx-10"><button onClick={(e)=>{e.preventDefault() }}><XCircleIcon width={24} height={24} className="fill-red-500"/></button></div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Favourites;

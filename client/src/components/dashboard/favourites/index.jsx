import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import dummy from "../../../assets/dummy-product.jpg";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { selectUserId } from "../../../features/auth/authSlice";
import { useGetFavouritesQuery, useDeleteFavouriteMutation } from "../../../pages/dashboard/dashboardApiSlice";

const Favourites = () => {
  const userId = useSelector(selectUserId);
  const { data:favList, isLoading ,refetch} = useGetFavouritesQuery(userId);
  const [deleteFavourite,{data,isSuccess,error}] = useDeleteFavouriteMutation();

  const handleDelete = async (productId) => {
    try {
      await deleteFavourite({ userId, productId }).unwrap();
    } catch (error) {
      console.error("Failed to delete the favourite product:", error);
    }
  };
 
  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);
  

  return (
    <div className="w-full flex flex-col">
      <p className="text-start">Favourites</p>
      <hr className="border-b border-b-gray-500" />
      <div className="w-full flex flex-col gap-4 py-4 px-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : !favList || favList.length === 0 ? (
          <p>No products in favourites</p>
        ) : (
          favList?.products?.map((item) => (
            <div key={item.productId} className="border border-gray-400 rounded-md flex flex-row justify-between">
              <Link to={`/shop/${item?.slug}`} className="flex flex-row">
                <img src={dummy} alt="" className="w-32 h-32 rounded-md" />
                <div className="flex-1 flex flex-col items-start ml-4 gap-2 py-4">
                  <p className="text-lg font-medium">{item?.name}</p>
                  <p>${item?.offerPrice}</p>
                  <p className="text-sm">
                    {new Date(item?.created).toDateString()} was Added.
                  </p>
                </div>
              </Link>
              <div className="w-6 flex  justify-end items-center mx-5 ">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(item.productId);
                  }}
                >
                  <XCircleIcon width={24} height={24} className="fill-red-400" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favourites;

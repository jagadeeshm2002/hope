import dummy from "../../assets/dummy-product.jpg";
import { StarIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserId } from "../../features/auth/authSlice";
import { useAddFavouritesMutation, useDeleteFavouriteMutation, useGetFavouritesQuery } from "../../pages/dashboard/dashboardApiSlice";

export function ProductList({ item }) {
  const { name, description, price: { offerPrice }, slug, _id, imageUrl } = item;
  const userId = useSelector(selectUserId);
  const [isLiked, setIsLiked] = useState(false);

  const [addLike] = useAddFavouritesMutation();
  const [removeLike] = useDeleteFavouriteMutation();
  const { data, isLoading: favLoading, refetch } = useGetFavouritesQuery(userId);

  const userFavourites = data?.products || [];

  const handleLike = async (event) => {
    event.preventDefault();
    event.stopPropagation(); // Prevents the Link from navigating

    try {
      const product = { productId: _id, name, offerPrice, slug, imageUrl };

      if (isLiked) {
        await removeLike({ userId, productId: _id }).unwrap();
        setIsLiked(false);
      } else {
        await addLike({ userId, product }).unwrap();
        setIsLiked(true);
      }

      // Refetch the favorites to ensure the UI updates
      refetch();
    } catch (error) {
      console.error("Cannot like/unlike the product", error);
    }
  };

  useEffect(() => {
    if (userFavourites) {
      const isProductLiked = userFavourites.some(favProduct => favProduct.productId === _id);
      setIsLiked(isProductLiked);
    }
  }, [userFavourites, _id, isLiked]);

  if (favLoading) return <div>Loading...</div>;

  return (
    <Link
      className="w-64 flex flex-col p-4 border rounded-xl gap-4 bg-gray-50 h-auto cursor-pointer"
      to={`/shop/${slug}`}
    >
      <div className="h-52">
        <img
          src={dummy}
          alt={name}
          className="h-full w-full object-cover rounded-xl"
          loading="lazy"
          draggable="false"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <p className="text-lg font-sans line-clamp-1 text-start">{name}</p>
          <div
            className="mx-1 cursor-pointer border-red-300 border"
            onClick={handleLike}
          >
            <HeartIcon
              width={24}
              height={24}
              className={
                isLiked
                  ? "fill-red-500 stroke-1.5 stroke-red-500"
                  : "stroke-gray-600 stroke-1.5"
              }
            />
          </div>
        </div>
        <p className="text-sm text-gray-600 text-start text-ellipsis line-clamp-2">
          {description}
        </p>
      </div>
      <div className="flex justify-between">
        <div className="border border-gray-300 px-2 py-1 rounded-lg bg-blue-gray-600">
          <p className="text-[15px] font-sans font-bold text-white">
            <span className="mr-[3px]">₹</span>
            {offerPrice}
          </p>
        </div>
        <div className="flex flex-row items-center">
          <p className="text-[15px] font-bold text-gray-800">3.5</p>
          <StarIcon width={20} height={20} fill="#FFC107" />
        </div>
      </div>
    </Link>
  );
}

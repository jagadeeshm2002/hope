import React, { useEffect, useState } from "react";
import { useGetProductQuery } from "../../features/product/productApiSlice";
import { useNavigate } from "react-router-dom";
import {
  Button,
  IconButton,
  Rating,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/outline";
import dummy from "../../assets/dummy-product.jpg";
import Reviews from "../../components/reviews";
import { addToCart } from "../cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../features/auth/authSlice";
import { useAddFavouritesMutation, useDeleteFavouriteMutation, useGetFavouritesQuery } from "../dashboard/dashboardApiSlice";

export default function SingleProduct() {
  const productSlug = window.location.pathname.split("/")[2];
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const [isLiked, setIsLiked] = useState(false);

  const [addLike] = useAddFavouritesMutation();
  const [removeLike] = useDeleteFavouriteMutation();
  const {
    data: product,
    error,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    status,
    message,
  } = useGetProductQuery(productSlug);
  const {
    data,
    isLoading: favLoading,
    refetch,
  } = useGetFavouritesQuery(userId);
  const userFavourites = data?.products || [];

  const {
    _id: id,
    name,
    price,
    description,
    category,
    stock,
    brand,
    sku,
    imageUrl,
    slug,
  } = product || {};
  const { originalPrice, offerPrice } = price || {};

  function handleAddToCart(e) {
    e.preventDefault();
    dispatch(addToCart({ id, sku, name, offerPrice, quantity, imageUrl }));
  }

  const handleLike = async (event) => {
    event.preventDefault();
    event.stopPropagation(); // Prevents the Link from navigating

    try {
      const product = { productId: id, name, offerPrice, slug, imageUrl };

      if (isLiked) {
        await removeLike({ userId, productId: id }).unwrap();
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
      const isProductLiked = userFavourites.some(
        (favProduct) => favProduct.productId === id
      );
      setIsLiked(isProductLiked);
    }
  }, [userFavourites, id, isLiked]);

  if (isError && error && !isFetching && !isSuccess) {
    return (
      <div className="w-full  flex justify-center items-center min-h-[58vh]">
        <Typography className="text-red-500 font-bold">
          something went wrong{" "}
          <span
            className="text-blue-500 underline cursor-pointer"
            onClick={() => navigate(-1)}
          >
            Go Back
          </span>
        </Typography>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );

  return (
    <>
      {product && isSuccess ? (
        <section className="py-16 px-8 bg-blue-gray-50">
          <div className="mx-auto container grid place-items-center grid-cols-1 md:grid-cols-2 gap-4">
            <img src={dummy} alt={name} className="h-[28rem] md:h-[36rem]" />
            <div className="flex flex-col items-start h-full bg-white rounded-md shadow-md p-4">
              <div className="flex flex-row justify-between w-full">
                <div>
                  <Typography className="mb-4" variant="h4">
                    {name}
                  </Typography>
                  <div className="flex gap-2 items-baseline">
                    <Typography
                      className="!text-gray-900 font-sans"
                      variant="h2"
                    >
                      <span className="mx-[3px]">₹</span>
                      {offerPrice || price?.offerPrice}
                    </Typography>{" "}
                    <Typography className="!text-gray-800 font-sans line-through decoration-blue-gray-800 font-xs">
                      {originalPrice || price?.originalPrice}
                    </Typography>
                  </div>
                  <div className="my-2 flex items-center gap-2 text-sm">
                    <Rating
                      value={3}
                      ratedColor="gray"
                      unratedColor="gray"
                      className="text-gray-900 readonly !text font-size-xs"
                      readonly
                    />
                    <Typography className="!text-sm font-bold !text-gray-700">
                      4.0/5 (100 reviews)
                    </Typography>
                  </div>
                </div>
                <div className="hidden lg:block">
                  {stock === 0 && !stock ? (
                    <Typography className="!mt-4 text-base font !text-white rounded-full border px-3 py-4 bg-gray-600 hover:bg-gray-700 mx-10">
                      Out of stock
                    </Typography>
                  ) : (
                    <Typography className="!mt-4 text-base font !text-white rounded-full border border-red-500 px-3 py-4 bg-red-600 hover:bg-red-700 mx-10">
                      Sale
                    </Typography>
                  )}
                </div>
              </div>
              <div className="w-full h-full">
                <Typography className="!mt-4 text-base font-normal leading-[27px] !text-gray-500 text-start mx-2">
                  {description}
                </Typography>
              </div>

              <div className="mx-2 my-4 flex flex-row w-full items-center gap-3">
                <div className="mr-2 w-1/3">
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min={1}
                    max={5}
                    disabled
                    inputMode="numeric"
                    className="px-2 py-2 rounded-md w-full border border-gray-400 mx-auto active:border-gray-700 focus:border-gray-700 focus-within:border-gray-700 transition ease-in-out duration-300"
                  >
                    {[...Array(5).keys()].map((val) => (
                      <option key={val + 1} value={val + 1}>
                        {val + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex w-2/3">
                  <Button
                    color="gray"
                    className="w-52"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                  <IconButton color="gray" variant="text" className="shrink-0">
                    <HeartIcon
                    width={24}
                    height={24}
                    onClick={handleLike}
                      className={` h-6 w-6
                      ${
                        isLiked
                          ? "fill-red-500 stroke-1.5 stroke-red-500"
                          : "stroke-gray-600 stroke-1.5"
                      }`}
                    />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto container my-10 w-full">
            <Reviews />
          </div>
        </section>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <Typography className="text-red-500 font-bold">
            something went wrong{" "}
            <span
              className="text-blue-500 underline cursor-pointer"
              onClick={() => navigate(-1)}
            >
              Go Back
            </span>
          </Typography>
        </div>
      )}
    </>
  );
}

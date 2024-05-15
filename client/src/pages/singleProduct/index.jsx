import React from "react";
import { useGetProductQuery } from "../../features/product/productApiSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  IconButton,
  Rating,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import {HeartIcon } from "@heroicons/react/24/outline";
import dummy from "../../assets/dummy-product.jpg";

export default function SingleProduct() {
  const productSlug = window.location.pathname.split("/")[2];
  const navigate = useNavigate();

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
  console.log(isFetching);
  console.log(isSuccess);
  console.log(isError);
  console.log(product);
  console.log(status);
  console.log(error);
  console.log(product);
  console.log(message);



    const { name, price, description, category, stock, brand } = product || {};
 

  if (isError && error && !isFetching && !isSuccess) {
    return (
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
        <section className="py-16 px-8">
          <div className="mx-auto container grid place-items-center grid-cols-1 md:grid-cols-2">
            <img src={dummy} alt={name} className="h-[36rem]" />
            <div className="flex flex-col items-start border border-3 h-full">
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
                      {price}
                    </Typography>{" "}
                    <Typography className="!text-gray-800 font-sans line-through decoration-blue-gray-800 font-xs">
                      ₹129.99
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
                <div>
                  { stock === 0 && !stock ? <Typography className="!mt-4  text-base font !text-white rounded-full border  px-3 py-4 bg-gray-600 hover:bg-gray-700 mx-10">Out of stock</Typography>:<Typography className="!mt-4  text-base font !text-white rounded-full border border-red-500 px-3 py-4 bg-red-600 hover:bg-red-700 mx-10">Sale</Typography>
                  }
                  
                </div>
              </div>
              <div>

              <Typography className="!mt-4 text-base font-normal leading-[27px] !text-gray-500 text-start">
                {description}
              </Typography>
              </div>
              

              <div className="mb-4 flex w-full items-center gap-3 md:w-1/2 ">
                <Button color="gray" className="w-52">
                  Add to Cart
                </Button>
                <IconButton color="gray" variant="text" className="shrink-0">
                  <HeartIcon className="h-6 w-6" />
                </IconButton>
              </div>
            </div>
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

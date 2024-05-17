import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import dummy from "../../assets/dummy-product.jpg";
import { Button } from "@material-tailwind/react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

export default function CartPage() {
  return (
    <section className="w-full py-16 px-8 ">
      <div className="container mx-auto ">
        <div className="flex flex-row justify-center items-center mb-10">
          <ShoppingCartIcon width={30} height={30} />
          <h1 className="text-3xl font-bold ml-5">Shopping Cart</h1>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-6">
          <div className="w-full lg:w-3/5">
            <CartMenu />
          </div>
          <div className="w-full lg:w-2/5">
            <Checkout />
          </div>
        </div>
      </div>
    </section>
  );
}

export function CartMenu() {
  return (
    <div className="w-full border shadow-sm shadow-blue-gray-200 p-6 rounded-lg">
      <div>
        <div className="flex flex-row justify-between ">
          <div className="inline-flex items-baseline">
            <p className="font-semibold text-2xl">Cart</p>
            <p className="text-xs md:text-sm font-sans ml-3 text-gray-700">
              (2 products)
            </p>
          </div>
          <button
            type="button"
            className="text-red-600 inline-flex items-center text-sm"
          >
            <XMarkIcon width={20} height={20} className="mr-1" />
            Clear Cart
          </button>
        </div>
        <hr className="my-4" />
        <div className="flex flex-col gap-4">
          <div className="hidden md:flex flex-row justify-between px-6">
            <p className="font-semibold text-sm">Product</p>
            <p className="font-semibold text-sm ">Count</p>
            <p className="font-semibold text-sm">Price</p>
          </div>
          <div className="w-full  flex flex-col gap-4 mb-3">
            <CartMenuList />
            <CartMenuList />
            <CartMenuList />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CartMenuList() {
  return (
    <div className="w-full rounded-lg shadow shadow-gray-500 flex flex-col  md:flex-row  justify-between p-3">
      <div className="flex flex-row gap-2 items-center w-full md:w-80">
        <img
          src={dummy}
          alt="dummy"
          className="w-20 h-20 rounded-lg object-cover"
          draggable="false"
        />
        <div className="flex flex-col justify-start ml-3">
          <p className="font-semibold text-md text-start line-clamp-1">
            Title is my style da
          </p>
          <p className="text-start text-sm text-gray-600 ">description</p>
        </div>
      </div>
      <div className="flex flex-row w-full justify-between my-4 md:my-0">
        <div className="flex flex-row w-1/2 justify-center gap-2 items-center pl-4 md:pl-0">
          <button
            type="button"
            className="border-2 rounded-full border-gray-300 w-8 h-8 flex justify-center items-center hover:border-gray-700 transition-all"
          >
            <MinusIcon width={20} height={20} />
          </button>
          <p className="font-semibold text-lg">1</p>
          <button
            type="button"
            className="border-2 rounded-full border-gray-300 w-8 h-8 flex justify-center items-center hover:border-gray-700 transition-all"
          >
            <PlusIcon width={20} height={20} />
          </button>
        </div>
        <div className="flex flex-row items-center justify-around w-1/2">
          <p className="font-semibold text-xl">$200</p>
          <button type="button" className="text-red-600">
            <XMarkIcon width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Checkout() {
  return (
    <div className="w-full flex flex-col border p-6 rounded-lg bg-blue-gray-50 gap-2 ">
      <p className="text-start text-3xl font-bold font-sans">Order Summary</p>
      <div className="flex flex-row justify-between">
        <p className="text-lg font-medium">Subtotal</p>
        <p className="text-lg font-medium">$200</p>
      </div>
      <hr className=" border-gray-300" />
      <div className="flex flex-row justify-between">
        <p className="text-lg font-medium">shippng Tax</p>
        <p className="text-lg font-medium">$0</p>
      </div>
      <hr className=" border-gray-300" />
      <div className="flex flex-col w-full px-3 items-start gap-2 mb-2">
        <p className="font-medium">Having Promo code?</p>
        <div className="flex flex-row w-full ">
          <input
            type="text"
            className="w-full rounded-xl mx-3 px-3 py-2 border border-gray-400"
            placeholder="Enter Promo code"
          />
          <Button variant="outlined" className="px-2 py-2 w-28">
            Apply
          </Button>
        </div>
      </div>
      <hr className=" border-gray-300" />
      <div className="flex flex-row justify-between mb-3">
        <p className="text-lg font-medium">Total</p>
        <p className="text-lg font-medium">$2000</p>
      </div>

      <div className="flex flex-col justify-center gap-4">
        <Button variant="gradient">Checkout</Button>
        <Button variant="outlined">Continue</Button>
        <p className="text-sm font-medium text-gray-700">
          Tax included.Shipping Calculated at Checkout
        </p>
      </div>
    </div>
  );
}

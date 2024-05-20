import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import dummy from "../../assets/dummy-product.jpg";
import { Button, select } from "@material-tailwind/react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCart,
  addToCart,
  removeFromCart,
  decreaseCart,
  clearCart,
  getTotals,
} from "./cartSlice";
import { selectUserId } from "../../features/auth/authSlice";
import { useAddToCartMutation } from "./cartApiSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const userId = useSelector(selectUserId);
 
  // Call useAddToCartMutation directly within the component
  // const [addToCart, { isSuccess, isError, errorMessage }] = useAddToCartMutation();

  useEffect(() => {
    // Ensure both cart and userId are available before calling addToCart
    if (cart && userId) {
      addToCart({ userId, cart });
    }
  }, [addToCart, cart, userId]);

  return (
    <section className="w-full py-16 px-8  min-h-[58vh]">
      <div className="container mx-auto ">
        <div className="flex flex-row justify-center items-center mb-10">
          <ShoppingCartIcon width={30} height={30} />
          <h1 className="text-3xl font-bold ml-5">Shopping Cart</h1>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-start gap-6">
          <div className="w-full lg:w-3/5 ">
            <CartMenu cart={cart} dispatch={dispatch} />
          </div>
          <div className="w-full lg:w-2/5">
            <Checkout cart={cart} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function CartMenu({ cart, dispatch }) {
  const { cartItems, cartTotalQuantity } = cart;

  const handleClearCart = (e) => {
    e.preventDefault();
    dispatch(clearCart());
  };
  const handleRemoveCart = (item, e) => {
    e.preventDefault();
    dispatch(removeFromCart(item));
  };
  const handleAddQuantity = (item, e) => {
    e.preventDefault();
    dispatch(addToCart(item));
  };
  const handleDecreaseQuantity = (item, e) => {
    e.preventDefault();
    dispatch(decreaseCart(item));
  };

  return (
    <div className="w-full border shadow-sm shadow-blue-gray-200 p-6 rounded-lg">
      <div>
        <div className="flex flex-row justify-between ">
          <div className="inline-flex items-baseline">
            <p className="font-semibold text-2xl">Cart</p>
            <p className="text-xs md:text-sm font-sans ml-3 text-gray-700">
              {`(${cartTotalQuantity} products)`}
            </p>
          </div>
          <button
            type="button"
            className={`text-red-600 ${
              cartTotalQuantity === 0 ? "hidden" : "inline-flex"
            } items-center text-sm `}
            onClick={(e) => handleClearCart(e)}
          >
            <XMarkIcon width={20} height={20} className="mr-1" />
            Clear Cart
          </button>
        </div>
        <hr
          className={`my-4 ${cartTotalQuantity === 0 ? "hidden" : "block"}`}
        />
        <div
          className={`${
            cartTotalQuantity === 0 ? "hidden" : "flex"
          } flex-col gap-4`}
        >
          <div className="hidden md:flex flex-row justify-between px-6">
            <p className="font-semibold text-sm">Product</p>
            <p className="font-semibold text-sm ">Count</p>
            <p className="font-semibold text-sm">Price</p>
          </div>
          <div className="w-full  flex flex-col gap-4 mb-3">
            {cartItems.map((item) => (
              <CartMenuList
                key={item.id}
                item={item}
                removeCart={handleRemoveCart}
                addQuantiy={handleAddQuantity}
                removeQuantity={handleDecreaseQuantity}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CartMenuList({ item, removeCart, addQuantiy, removeQuantity }) {
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
            {item.name}
          </p>
          <p className="text-start text-sm text-gray-600 ">{item.sku}</p>
        </div>
      </div>
      <div className="flex flex-row w-full justify-between my-4 md:my-0">
        <div className="flex flex-row w-1/2 justify-center gap-2 items-center pl-4 md:pl-0">
          <button
            type="button"
            className="border-2 rounded-full border-gray-300 w-8 h-8 flex justify-center items-center hover:border-gray-700 transition-all"
            onClick={(e) => removeQuantity(item, e)}
          >
            <MinusIcon width={20} height={20} />
          </button>
          <p className="font-semibold text-lg">{item.quantity}</p>
          <button
            type="button"
            className="border-2 rounded-full border-gray-300 w-8 h-8 flex justify-center items-center hover:border-gray-700 transition-all"
            onClick={(e) => addQuantiy(item, e)}
          >
            <PlusIcon width={20} height={20} />
          </button>
        </div>
        <div className="flex flex-row items-center justify-around w-1/2">
          <p className="font-semibold text-xl">
            <span className="mx-[3px]">₹</span>
            {item.offerPrice}
          </p>
          <button type="button" className="text-red-600">
            <XMarkIcon
              width={20}
              height={20}
              onClick={(e) => removeCart(item, e)}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Checkout({cart}) {
  const { cartTotalAmount } = cart;

  return (
    <div className="w-full flex flex-col border p-6 rounded-lg bg-blue-gray-50 gap-2 ">
      <p className="text-start text-3xl font-bold font-sans">Order Summary</p>
      <div className="flex flex-row justify-between">
        <p className="text-lg font-medium">Subtotal</p>
        <p className="text-lg font-medium">
          <span className="mx-[3px]">₹</span>
          { cartTotalAmount|| 0}
        </p>
      </div>
      <hr className=" border-gray-300" />
      <div className="flex flex-row justify-between">
        <p className="text-lg font-medium">shippng Tax</p>
        <p className="text-lg font-medium">
          <span className="mx-[3px]">₹</span>0
        </p>
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
        <p className="text-lg font-medium">
          <span className="mx-[3px]">₹</span>2000
        </p>
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

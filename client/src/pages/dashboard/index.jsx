import React, { useState } from "react";
import { NavLink, Link, Route, Routes } from "react-router-dom";

import AccountDetails from "../../components/dashboard/accountDetails";
import Address from "../../components/dashboard/address";
import OrderInfo from "../../components/dashboard/orderInfo";
import Favourites from "../../components/dashboard/favourites";
import RequireAuth from "../../features/auth/RequireAuth";

const Dashboard = () => {
  return (
    <section className="px-4 md:px-16 py-4 md:py-8 min-h-[58vh]">
      <div className="bg-red-100 max-w-screen-xl flex justify-center mx-auto items-center flex-col md:flex-row  gap-4">
        <div className="w-full md:w-1/4 h-full flex self-start static">
          <Navigation />
        </div>
        <div className="w-3/4 border border-black transition-all">
          <Routes>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<AccountDetails />} />
              <Route path="address" element={<Address />} />
              <Route path="orders" element={<OrderInfo />} />
              <Route path="favourites" element={<Favourites />} />
              <Route path="support" element={<Support />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </div>
    </section>
  );
};

const Support = () => <div>Support</div>;
const NotFound = () => <div>Not Found</div>;

export default Dashboard;

const navigationList = [
  { label: "Account Details", to: "." },
  { label: "Address", to: "address" },
  { label: "Favourites", to: "favourites" },
  { label: "Orders", to: "orders" },
  { label: "Support", to: "support" },
];

export const Navigation = () => {
  
  return (
    <div className="flex justify-center flex-col border w-full ">
      <button>Dashboard Menu</button>
      <div className="flex">
        <ul className="flex flex-col border border-gray-400 w-72 md:w-full">
          <li className="px-10 py-3  w-full bg-blue-gray-50 ">Account</li>
          {navigationList.map((navItem, index) => (
            <li
              key={index}
              className=" w-full bg-gray-50 border-t border-gray-400 active:bg-gray-100"
            >
              <NavLink
                to={navItem.to}
                end
                className={({ isActive }) =>
                  isActive
                    ? `bg-white
                px-12 py-3  transition-all w-full border `
                    : `px-12 py-[11px]  bg-gray-100 w-full border`
                }
              >
                {navItem.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

import React from "react";
import { NavLink, Link, Route, Routes } from "react-router-dom";

import AccountDetails from "../../components/dashboard/accountDetails";
import Address from "../../components/dashboard/address";
import OrderInfo from "../../components/dashboard/orderInfo";
import Favourites from "../../components/dashboard/favourites";
import RequireAuth from "../../features/auth/RequireAuth";

const Dashboard = () => {
  return (
    <section className="px-16 py-8 min-h-[58vh]">
      <div className="bg-red-100 max-w-screen-xl flex justify-center mx-auto items-center flex-row gap-4">
        <div className="w-1/4 h-full flex self-start static">
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
    <div className="flex justify-center border w-full ">
      <div className="flex">
        <ul className="flex flex-col border border-gray-400 ">
          <li className="px-10 py-3  w-full bg-blue-gray-50 ">Account</li>
          {navigationList.map((navItem, index) => (
            <li
              key={index}
              className="flex w-full bg-gray-50 border-t border-gray-400 active:bg-gray-100  "
            >
              <NavLink
                to={navItem.to}
                end
                className={({ isActive }) =>
                  isActive
                    ? `bg-white
                px-12 py-3  w-full transition-all`
                    : `px-12 py-[11px] w-full bg-gray-100 `
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

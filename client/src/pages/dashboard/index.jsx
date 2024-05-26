import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { NavLink } from "react-router-dom";

import AccountDetails from "../../components/dashboard/accountDetails";
import Address from "../../components/dashboard/address";
import OrderInfo from "../../components/dashboard/orderInfo";
import Favourites from "../../components/dashboard/favourites";
import RequireAuth from "../../features/auth/RequireAuth";

import useMediaQuery from '../../utilities/customhook/useMediaQuery';  // Import the custom hook


const Dashboard = () => {
  const navigationList = [
    { label: "Account Details", to: "." },
    { label: "Address", to: "address" },
    { label: "Favourites", to: "favourites" },
    { label: "Orders", to: "orders" },
    { label: "Support", to: "support" },
  ];

  return (
    <section className="px-4 md:px-16 py-4 md:py-8 min-h-[58vh]">
      <div className=" max-w-screen-xl flex justify-center mx-auto items-center flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4 h-full flex self-start static">
          <Navigation navigationList={navigationList} />
        </div>
        <div className=" w-full h-full flex self-start md:w-3/4  transition-all">
          <Routes>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<AccountDetails />} />
              <Route path="address/*" element={<Address />} />
              <Route path="orders/*" element={<OrderInfo />} />
              
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






export const Navigation = ({ navigationList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  
  const handleToggle = () => {
    if (isSmallScreen) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="flex justify-center flex-col w-full">
      <button 
        className={`py-2 px-4 bg-white border border-gray-400 block md:hidden ${isOpen? "border-b-0 ":""}` }
        onClick={handleToggle}
      >
        Dashboard Menu
      </button>
      <nav className={`flex flex-col border border-gray-400 border-b-0 w-full ${isOpen || !isSmallScreen ? "block " : "hidden "} md:w-full md:flex`}>
        <ul className="flex flex-col  w-full">
          <li className="py-1 w-full bg-white hidden md:block border-b border-gray-400">Account</li>
          {navigationList.map((item, index) => (
            <NavigationItem key={index} item={item} />
          ))}
        </ul>
      </nav>
    </div>
  );
};
const NavigationItem = ({ item: { label, to } }) => (
  <li className=" w-full  bg-gray-50 border-b border-gray-400  active:bg-gray-100 flex justify-center items-center">
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `transition-all w-full flex-1 py-1 ${
          isActive ? "bg-white" : "bg-blue-gray-50"
        }`
      }
    >
      {label}
    </NavLink>
  </li>
);

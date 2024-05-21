import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPinIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import SubPage from "../subpage";

const List = () => {
  const addressData = [
    {
      isDefault: true,
      id: "664b9471d6335f000f76d83d",
      address: "2/18 ,kannigapuram street,",
      city: "Chennai, Tamil Nadu, India",
      state: "Tamil Nadu",
      country: "India",
      zipCode: "600056",
      user: "661f86b2464436001023ecad",
    
    },
    {
      isDefault: false,
      id: "664b9471d6335f000f76d83e", // Ensure unique _id
      address: "2/18 ,kannigapuram street,",
      city: "Chennai, Tamil Nadu, India",
      state: "Tamil Nadu",
      country: "India",
      zipCode: "600056",
      user: "661f86b2464436001023ecad",
      
      
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="w-full">
      <SubPage
        titleText="Address"
        actionName="Add"
        action={() => {
          navigate('/dashboard/address/add');
        }}
      />
      <hr className="w-full border-gray-500 my-4" />
      <AddressList addressData={addressData} />
    </div>
  );
};

export default List;

const AddressList = ({ addressData }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-3 px-5 pt-5">
      {!addressData.length ? (
        <p className="text-center">No address found.</p>
      ) : (
        addressData.map((address,index) => (
          <Link
            to={`/dashboard/address/edit/${address.id}`}
            key={index}
            className="w-full"
            aria-label={`Edit address at ${address.address}, ${address.city}`}
          >
            <div className="w-full px-3 py-3 border-2 flex flex-row border-gray-300 rounded-md bg-white hover:bg-gray-50">
              <div className="w-20 h-20 flex justify-center items-center">
                <MapPinIcon width={60} height={60} fill="gray" />
              </div>
              <div className="flex flex-col items-start ml-3">
                <p className="text-xl font-medium mb-2">
                  {address.isDefault ? "Default" : ""} Delivery Address
                </p>
                <p className="text-sm">
                  {address.address}, {address.city}, {address.state},{" "}
                  {address.country}
                </p>
              </div>
              {address.isDefault && (
                <div className="ml-auto">
                  <CheckBadgeIcon width={30} height={30} fill="green" />
                </div>
              )}
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

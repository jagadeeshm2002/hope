import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPinIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import SubPage from "../subpage";
import { useGetAddressesQuery } from "../../../pages/dashboard/dashboardApiSlice";
import { useSelector } from "react-redux";
import { selectUserId } from "../../../features/auth/authSlice";

const List = () => {
  const userId = useSelector(selectUserId);
  const { data, error, isLoading,refetch } = useGetAddressesQuery(userId);
  const navigate = useNavigate();

  const addressData = data || [];

useEffect(() => {
  refetch()
}, [data])



  return (
    <div className="w-full">
      <SubPage
        titleText="Address"
        actionName="Add"
        action={() => {
          navigate("/dashboard/address/add");
        }}
      />
      <hr className="w-full border-gray-500 my-4" />

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error.message}</p>
      ) : (
        <AddressList addressData={addressData}   />
      )}
    </div>
  );
};

export default List;

const AddressList = ({ addressData }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-3 px-5 pt-5">
      {!addressData || addressData.length === 0 ? (
        <p className="text-center">No address found.</p>
      ) : (
        addressData.map((address, index) => (
          <Link
            to={`/dashboard/address/edit/${address._id}`}
            key={address._id || index}
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
                <p className="text-sm capitalize">
                  {address.address}, {address.city},<br /> {address.state},{" "}
                  {address.country}, Pincode : {address.pinCode}.
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

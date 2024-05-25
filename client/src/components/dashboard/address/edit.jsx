import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import SubPage from "../subpage";
import {
  useDeleteAddressMutation,
  useEditAddressMutation,
  useGetSingleAddressQuery,
} from "../../../pages/dashboard/dashboardApiSlice";
import { useSelector } from "react-redux";
import { selectUserId } from "../../../features/auth/authSlice";

const Edit = () => {
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const addressId = window.location.pathname.split("/")[4];

  const {
    data: addressData,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetSingleAddressQuery({ userId, addressId });
  const [address, setAddress] = useState(null);
  

  const [editAddress, { data: editData, error: editError }] =
    useEditAddressMutation();

  const [deleteAddress, { data: deleteData, error: deleteError }] =useDeleteAddressMutation();


  useEffect(() => {
    if (addressData) {
      setAddress(addressData[0]);
    }
  }, [addressData,isSuccess]);

  const handleDelete = async () => {
    try {
      await deleteAddress({ userId, addressId }).unwrap();
      navigate(-1);
    } catch (err) {
      console.error("failed to delete address: ", err);
    }
  };

  const handleSubmit = async () => {
    try {
      await editAddress({ ...address, userId, addressId }).unwrap();
      navigate(-1);
    } catch (err) {
      console.error("Failed to save the address: ", err);
    }
  };
 

  return (
    <div className="w-full">
      <SubPage
        titleText="Edit Address"
        actionName="Cancel"
        action={() => navigate(-1)}
      />
      <hr className="w-full border-gray-500 my-4" />
      {isLoading && !isSuccess ? (
        <p className="text-center">Loading...</p>
      ) : isError ? (
        <p className="text-center text-red-500">Error: {error.message}</p>
      ) : (
        <EditAddress
          address={address}
          setAddress={setAddress}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Edit;



export const EditAddress = ({ address, setAddress, handleSubmit, handleDelete }) => {
  if (!address) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handleDefaultChange = (event) => {
    const { name, checked } = event.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: checked.toString() }));
  };

  return (
    <div>
      <form className="grid grid-cols-2 gap-4">
        <div className="col-span-1 flex flex-col items-start px-1">
          <Typography variant="h6" color="blue-gray">Address</Typography>
          <input
            type="text"
            value={address?.address || ''}
            onChange={handleChange}
            name="address"
            placeholder="Address: Street, House No / Apartment No"
            className="py-2 px-3 border border-gray-400 rounded-md focus:outline-none w-full focus:border-green-500 focus:border-2"
          />
        </div>
        <div className="col-span-1 flex flex-col items-start px-1">
          <Typography variant="h6" color="blue-gray">City</Typography>
          <input
            type="text"
            placeholder="City"
            value={address?.city || ''}
            onChange={handleChange}
            name="city"
            className="py-2 px-3 border border-gray-400 rounded-md focus:outline-none w-full focus:border-green-500 focus:border-2"
          />
        </div>
        <div className="col-span-1 flex flex-col items-start px-1">
          <Typography variant="h6" color="blue-gray">State</Typography>
          <input
            type="text"
            placeholder="State"
            value={address?.state || ''}
            onChange={handleChange}
            name="state"
            className="py-2 px-3 border border-gray-400 rounded-md focus:outline-none w-full focus:border-green-500 focus:border-2"
          />
        </div>
        <div className="col-span-1 flex flex-col items-start px-1">
          <Typography variant="h6" color="blue-gray">Country</Typography>
          <input
            type="text"
            placeholder="Country"
            value={address?.country || ''}
            onChange={handleChange}
            name="country"
            className="py-2 px-3 border border-gray-400 rounded-md focus:outline-none w-full focus:border-green-500 focus:border-2"
          />
        </div>
        <div className="col-span-1 flex flex-col items-start px-1">
          <Typography variant="h6" color="blue-gray">Pincode</Typography>
          <input
            type="number"
            min="100000"
            max="999999"
            pattern="[0-9]{6}"
            name="pinCode"
            value={address?.pinCode || ''}
            onChange={handleChange}
            placeholder="Please Enter Pincode"
            className="py-2 px-3 border border-gray-400 rounded-md focus:outline-none w-full focus:border-green-500 focus:border-2 after:content-none"
          />
        </div>
        <div className="col-span-2 flex flex-row justify-start items-center px-1 ml-4">
          <input
            type="checkbox"
            name="isDefault"
            className=""
            checked={address?.isDefault === "true"}
            onChange={handleDefaultChange}
          />
          <p className="ml-2">Default Address</p>
        </div>
        <hr className="col-span-2 w-full border-gray-500 my-4" />
        <div className="col-span-1 flex">
          <button
            className="col-span-1 border rounded-md bg-white hover:bg-gray-50 hover:border-gray-400 py-2 w-36 mx-5"
            type="button"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button
            className="col-span-1 border rounded-md bg-red-600 hover:bg-red-500 text-white py-2 w-36 mx-5"
            onClick={handleDelete}
            type="button"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

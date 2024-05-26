import React, { useState } from "react";
import SubPage from "../subpage";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { selectUserId } from "../../../features/auth/authSlice";
import { useAddAddressMutation } from "../../../pages/dashboard/dashboardApiSlice";

const Add = () => {
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const initialValues = {
    address: "",
    city: "",
    country: "",
    isDefault: false,
    pinCode: "",
    state: "",
  };

  const [values, setValues] = useState(initialValues);
  const [addAddress, { error }] = useAddAddressMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addAddress({ ...values ,userId}).unwrap();
      navigate(-1);
    } catch (error) {
      console.error("Failed to save the address: ", error);
    }
  };

  return (
    <div className="w-full">
      <SubPage
        titleText="Add Address"
        actionName="Cancel"
        action={() => {
          navigate(-1);
        }}
      />
      <hr className="w-full border-gray-500 my-4" />
      <AddAddress
        values={values}
        setValues={setValues}
        handleSubmit={handleSubmit}
      />
      {error && <p className="text-center text-red-500">Error: {error.message}</p>}
    </div>
  );
};

export default Add;


export const AddAddress = ({ values, setValues, handleSubmit }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleDefaultChange = (event) => {
    const { checked } = event.target;
    setValues((prevValues) => ({ ...prevValues, isDefault: checked }));
  };

  return (
    <div className="w-full">
      <div className="">
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div className="col-span-1 flex flex-col items-start px-1">
            <Typography variant="h6" color="blue-gray">Address</Typography>
            <input
              type="text"
              name="address"
              value={values.address}
              onChange={handleChange}
              placeholder="Address: Street, House No / Apartment No"
              className="py-2 px-3 border border-gray-400 rounded-md focus:outline-none w-full focus:border-green-500 focus:border-2"
            />
          </div>
          <div className="col-span-1 flex flex-col items-start px-1">
            <Typography variant="h6" color="blue-gray">City</Typography>
            <input
              type="text"
              placeholder="City"
              name="city"
              value={values.city}
              onChange={handleChange}
              className="py-2 px-3 border border-gray-400 rounded-md focus:outline-none w-full focus:border-green-500 focus:border-2"
            />
          </div>
          <div className="col-span-1 flex flex-col items-start px-1">
            <Typography variant="h6" color="blue-gray">State</Typography>
            <input
              type="text"
              placeholder="State"
              name="state"
              value={values.state}
              onChange={handleChange}
              className="py-2 px-3 border border-gray-400 rounded-md focus:outline-none w-full focus:border-green-500 focus:border-2"
            />
          </div>
          <div className="col-span-1 flex flex-col items-start px-1">
            <Typography variant="h6" color="blue-gray">Country</Typography>
            <input
              type="text"
              placeholder="Country"
              name="country"
              value={values.country}
              onChange={handleChange}
              className="py-2 px-3 border border-gray-400 rounded-md focus:outline-none w-full focus:border-green-500 focus:border-2"
            />
          </div>
          <div className="col-span-1 flex flex-col items-start px-1">
            <Typography variant="h6" color="blue-gray">Pincode</Typography>
            <input
              type="number"
              min="100000"
              max="999999"
              value={values.pinCode}
              onChange={handleChange}
              placeholder="Please Enter Pincode"
              name="pinCode"
              className="py-2 px-3 border border-gray-400 rounded-md focus:outline-none w-full focus:border-green-500 focus:border-2 after:content-none"
            />
          </div>
          <div className="col-span-2 flex flex-row justify-start items-center px-1 ml-4">
            <input
              type="checkbox"
              name="isDefault"
              checked={values.isDefault}
              onChange={handleDefaultChange}
              className=""
            />
            <p className="ml-2">Default Address</p>
          </div>

          <hr className="col-span-2 w-full border-gray-500 my-4" />
          <button
            type="submit"
            className="col-span-1 border rounded-md bg-white hover:bg-blue-gray-50 hover:border-gray-500 py-2 w-36 mx-5"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

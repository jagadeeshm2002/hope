import React from "react";
import SubPage from "../subpage";
import { useNavigate } from "react-router-dom";
import { Input, Typography } from "@material-tailwind/react";

const Add = () => {
  const navigate = useNavigate();
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
      <AddAddress />
    </div>
  );
};

export default Add;

export const AddAddress = () => {
  return (
    <div className="w-full">
      <div className="">
        <form className="grid grid-cols-2 gap-4">
          <div className="col-span-1 flex flex-col items-start  px-1">
          <Typography variant="h6" color="blue-gray" className="">
            Address
          </Typography>
          <input
            type="text"
            placeholder="Address: Street, House No / Apartment No"
            className="py-2 px-3 border border-gray-400 rounded-md focus:outline-none  w-full focus:border-green-500 focus:border-2"
          />
          </div>
          <div className="col-span-1 flex flex-col items-start  px-1">
          <Typography variant="h6" color="blue-gray" className="">
            City
          </Typography>
          <input
            type="text"
            placeholder="City"
            className="py-2 px-3 border border-gray-400 rounded-md focus:outline-none  w-full focus:border-green-500 focus:border-2"
          />
          </div>
          <div className="col-span-1 flex flex-col items-start  px-1">
          <Typography variant="h6" color="blue-gray" className="">
            State
          </Typography>
          <input
            type="text"
            placeholder="State"
            className="py-2 px-3 border border-gray-400 rounded-md focus:outline-none  w-full focus:border-green-500 focus:border-2"
          />
          </div>
          <div className="col-span-1 flex flex-col items-start  px-1">
          <Typography variant="h6" color="blue-gray" className="">
            Country
          </Typography>
          <input
            type="text"
            placeholder="Country"
            className="py-2 px-3 border border-gray-400 rounded-md focus:outline-none  w-full focus:border-green-500 focus:border-2"
          />
          </div>
          <div className="col-span-1 flex flex-col items-start  px-1">
          <Typography variant="h6" color="blue-gray" className="">
            Pincode
          </Typography>
          <input
            type="number"
            min="100000"
            max="999999"
            placeholder="Please Enter Pincode"
            className="py-2 px-3 border border-gray-400 rounded-md focus:outline-none  w-full focus:border-green-500 focus:border-2 after:content-none"
          />
          </div>
          <div className="col-span-2 flex flex-row justify-start items-center  px-1 ml-4">
          <input
            type="checkbox"
            
            placeholder="Please Enter Pincode"
            className=""
          />
          <p  className="ml-2">
            Default Address
          </p>
          </div>

          <hr className="col-span-2 w-full border-gray-500 my-4" />
          <button className="col-span-1 border rounded-md bg-white hover:bg-blue-gray-50 hover:border-gray-500  py-2 w-36 mx-5">Submit</button>
          
        </form>
      </div>
    </div>
  );
};

import React from "react";

const AccountDetails = () => {

  return (
    <div className="w-full  flex flex-col px-2 ">
      <h1 className="text-xl font-normal text-start">Account Details</h1>
      <hr className="w-full border-gray-300 my-2" />
      <form className="grid grid-cols-1 md:grid-cols-2 gap-2 md:px-4 ">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-start pb-1">Name</label>
          <input
            className="border border-gray-700 px-3 py-2 rounded-md"
            name="name"
            id="name"
            placeholder="Enter Name"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-start pb-1">Email</label>
          <input
            className="border border-gray-700 px-3 py-2 rounded-md"
            name="email"
            id="email"
            placeholder="Enter Email"
            disabled
            contentEditable="false"
            aria-readonly="true"
            readOnly
          />
        </div>
        <div className="flex flex-col col-span-2">
          <label htmlFor="phoneNumber" className="text-start pb-1">Phone Number</label>
          <input
            className="border border-gray-700 px-3 py-2 rounded-md"
            type="tel"
            aria-label="Enter Phone Number"
            placeholder="Enter Phone Number"
            id="phoneNumber"
            name="phoneNumber"
          />
        </div>
        <hr  className="col-span-2 border-b-gray-500 my-4"/>
        <button className="bg-gray-800  w-52 text-white px-3 py-2 rounded-md">Save Changes</button>
      </form>
    </div>
  );
};

export default AccountDetails;

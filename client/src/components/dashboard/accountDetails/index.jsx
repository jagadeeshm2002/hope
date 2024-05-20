import React from "react";

const AccountDetails = () => {
  return (
    <div className="w-full h-screen  flex flex-col px-2 ">
      <h1 className="text-xl font-normal text-start">Account Details</h1>
      <hr className="w-full border-gray-300 my-1" />
      <form className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName">First Name</label>
          <input
            className="border border-gray-400 rounded-md px-2 py-1"/>
        </div>
        
        <div className="flex flex-col gap-2"> 
            <label htmlFor="phonenumber" >Phone Number</label>
            <input name="phonenumber" id="phonenumber" className="border border-gray-400 rounded-md px-2 py-1"/>
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;

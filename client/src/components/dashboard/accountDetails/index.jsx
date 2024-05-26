import React, { useState, useEffect } from "react";
import { useGetUserQuery, useUpdateUserMutation } from "../../../pages/dashboard/dashboardApiSlice";
import { useSelector } from "react-redux";
import { selectUserId } from "../../../features/auth/authSlice";

const AccountDetails = () => {
  const userId = useSelector(selectUserId);


  const { data } = useGetUserQuery(userId);
 

  const initialValues = {
    name: data?.name || "",
    email: data?.email || "",
    phoneNumber: data?.phoneNumber || "",
  };

  const [userData, setUserData] = useState(initialValues);
  const [updateUser, { data: updatedUser, error }] = useUpdateUserMutation();

  useEffect(() => {
    if (data) {
      setUserData({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
      });
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phoneNumber } = userData;
    await updateUser({ userId, name, phoneNumber });
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  

  return (
    <div className="w-full flex flex-col px-2">
      <h1 className="text-xl font-normal text-start">Account Details</h1>
      <hr className="w-full border-gray-300 my-2" />
      <form className="grid grid-cols-1 md:grid-cols-2 gap-2 md:px-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-start pb-1">
            Name
          </label>
          <input
            className="border border-gray-700 px-3 py-2 rounded-md"
            name="name"
            id="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="Enter Name"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-start pb-1">
            Email
          </label>
          <input
            className="border border-gray-700 px-3 py-2 rounded-md"
            name="email"
            id="email"
            value={userData.email}
            placeholder="Enter Email"
            disabled
            contentEditable="false"
            aria-readonly="true"
            readOnly
          />
        </div>
        <div className="flex flex-col col-span-2">
          <label htmlFor="phoneNumber" className="text-start pb-1">
            Phone Number
          </label>
          <input
            className="border border-gray-700 px-3 py-2 rounded-md"
            type="tel"
            value={userData.phoneNumber}
            aria-label="Enter Phone Number"
            placeholder="Enter Phone Number"
            onChange={handleChange}
            id="phoneNumber"
            name="phoneNumber"
          />
        </div>
        <hr className="col-span-2 border-b-gray-500 my-4" />
        <button className="bg-gray-800 w-52 text-white px-3 py-2 rounded-md" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AccountDetails;

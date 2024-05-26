import { Route, Routes } from "react-router-dom";

import Add from "./add";
import Edit from "./edit";
import List from "./list";

const Address = () => {
  return (
    <div className=" w-full">
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </div>
  );
};

export default Address;

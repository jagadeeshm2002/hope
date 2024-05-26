import { Link, Route, Routes } from "react-router-dom";
import dummy from "../../../assets/dummy-product.jpg";
import OrderDetails from "../orderDetails";


const OrderInfo = () => {
  
  return (
    <div className="w-full ">
      <Routes>
        <Route  path="/" element={<OrderList/> }/>
        <Route path="/:id" element={<OrderDetails/>}/>
      </Routes>
    </div>
  );
};

export default OrderInfo;




export const OrderList = () => {
  const orderData = [1, 2];
  return (
    <div className="w-full flex flex-col">
      <p className="text-start pl-2 text-lg ">Order Info</p>
      <hr className="w-full my-2 border-b-gray-400 border-b" />
      <div className="flex justify-center items-center w-full">
        {orderData && orderData.length === 0 ? (
          <p>No order you placed</p>
        ) : (
          <div className="w-full flex flex-col mx-2 my-2 gap-4 justify-center items-center">
            <Link
              to={`/dashboard/orders/${"jagadeesh"}`}
              className="border border-gray-400 rounded-md w-80 lg:w-full flex flex-col lg:flex-row"
            >
              <img
                src={dummy}
                alt=""
                className=" w-full h-72 object-cover  lg:w-32 lg:h-32 rounded-md"
              />
              <div className="flex-1 flex flex-col items-start ml-4 gap-1 my-auto py-3 lg:py-0">
                <p>
                  Status <span>Not processed</span>
                </p>
                <p>Order # 45654643654654564</p>
                <p>Ordered on Tuesday,may 21 2024</p>
                <p>Order Total $79.9</p>
              </div>
            </Link>
            <Link
              to={`/dashboard/orders/${"jagadeesh"}`}
              className="border border-gray-400 rounded-md w-80 lg:w-full flex flex-col lg:flex-row"
            >
              <img
                src={dummy}
                alt=""
                className=" w-full h-72 object-cover  lg:w-32 lg:h-32 rounded-md"
              />
              <div className="flex-1 flex flex-col items-start ml-4 gap-1 my-auto">
                <p>
                  Status <span>Not processed</span>
                </p>
                <p>Order # 45654643654654564</p>
                <p>Ordered on Tuesday,may 21 2024</p>
                <p>Order Total $79.9</p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}


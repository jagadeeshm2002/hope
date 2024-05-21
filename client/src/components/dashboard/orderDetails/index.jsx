import { useNavigate } from "react-router-dom";
import dummy from "../../../assets/dummy-product.jpg";

const OrderDetails = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full">
        <div className="w-full flex flex-row justify-between px-4">
          <p>Order Details</p>
          <button className="border border-gray-400 rounded px-2 py-1 bg-white hover:bg-gray-100 hover:border-gray-500" onClick={()=>navigate(-1)}>
            Back to Orders
          </button>
        </div>
        <hr className="border-b-gray-600 my-2" />
        <div className="p-2 flex flex-row justify-between px-4">
          <div className="flex flex-col gap-1">
            <div className="inline-flex justify-between">
              <p>Order ID</p>
              <p>5446464684968468</p>
            </div>
            <div className="inline-flex justify-between gap-6">
              <p>Order Date</p>
              <p>Tuesday, May 21,2024</p>
            </div>
          </div>
          <div>
            <button
              type="button"
              className="border border-gray-400 rounded px-2 py-1 bg-white hover:bg-gray-100 hover:border-gray-500 ml-2"
            >
              Cancel Order
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="w-full flex flex-col lg:flex-row gap-4 ">
          <div className="w-full lg:w-2/3 flex flex-col  px-4">
            <div>
              <p className="text-start">Order Items</p>
              <hr className="border-b-gray-600 my-2" />
            </div>
            <div className="flex flex-col justify-start">
              <div className="flex flex-row w-full border ">
                <img src={dummy} alt="" className="w-24 h-24 m-3 rounded" />
                <div className="grid grid-cols-3 w-full ">
                  <div className=" col-span-3 flex flex-col items-start gap-1 py-2 ">
                    <p className="text-lg font-medium">guffi handbag</p>
                    <p>$70</p>
                  </div>
                  <div className="col-span-1 flex flex-col items-center  text-sm">
                    <p className="font-semibold">Not processed</p>
                    <p className="text-gray-700 text-xs font-semibold">Status</p>
                  </div>
                  <div className="col-span-1 flex flex-col items-center  text-sm">
                    <p>1</p>
                    <p className="text-gray-700 text-xs font-semibold">quantity</p>
                  </div>
                  <div className="col-span-1 flex flex-col items-center  text-sm">
                    <p>$70</p>
                    <p className="text-gray-700 text-xs font-semibold">Total Price</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 p-2 min-w-64">
            <div className="flex flex-col rounded border border-gray-400 py-3 px-4 gap-3 ">
              <p className="text-start font-medium text-lg">Order Summary</p>
              <hr className="" />

              <div className="flex flex-row justify-between">
                <p>Subtotal</p> <p>$70</p>
              </div>
              <div className="flex flex-row justify-between">
                <p>Est. Sales Tax</p> <p>$0</p>
              </div>
              <div className="flex flex-row justify-between">
                <p>Shipping & Handling</p> <p>$0</p>
              </div>
              <hr />
              <div className="flex flex-row justify-between">
                <p>Total</p> <p>$70</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

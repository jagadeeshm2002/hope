import dummy from "../../assets/dummy-product.jpg";
import { StarIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export function ProductList(item) {
  const {
    item: { name, description, price, slug },
  } = item;

  return (
    <Link
      className="w-64 flex flex-col p-4 border rounded-xl gap-4 bg-gray-50 h-auto cursor-pointer"
      to={`/shop/${slug}`}
    >
      <div className="h-52 ">
        <img
          src={dummy}
          alt={name}
          className="h-full w-full object-cover rounded-xl"
          loading="lazy"
          draggable="false"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <p className="text-lg font-sans line-clamp-1 text-start">{name}</p>
          <div className="mx-1">
            <HeartIcon width={24} height={24} />
          </div>
        </div>
        <p className="text-sm text-gray-600 text-start text-ellipsis line-clamp-2">
          {description}
        </p>
      </div>
      <div className="flex justify-between">
        <div className=" border border-gray-300 px-2 py-1 rounded-lg bg-blue-gray-600">
          <p className="text-[15px] font-sans font-bold text-white ">
            <span className="mr-[3px]">₹</span>
            {price}
          </p>
        </div>
        <div className="flex  flex-row items-center  ">
          <p className="text-[15px] font-bold text-gray-800">3.5</p>
          <StarIcon width={20} height={20} fill="#FFC107" />
        </div>
      </div>
    </Link>
  );
}

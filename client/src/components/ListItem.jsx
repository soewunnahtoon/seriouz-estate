import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

const ListItem = ({ list }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[250px]">
      <Link to={`/list/${list._id}`}>
        <div className="h-[250px] sm:h-[200px] overflow-hidden">
          <img
            src={
              list.imageUrls[0] ||
              "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
            }
            alt="List Cover"
            className="h-[250px] sm:h-[200px] w-full object-cover hover:scale-105 transition-scale duration-300"
          />
        </div>

        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {list.name}
          </p>

          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {list.address}
            </p>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">
            {list.description}
          </p>

          <p className="text-slate-500 mt-2 font-semibold ">
            $
            {list.offer
              ? list.discountPrice.toLocaleString("en-US")
              : list.regularPrice.toLocaleString("en-US")}
            {list.type === "rent" && " / month"}
          </p>

          <div className="text-slate-700 flex gap-4">
            <div className="font-bold text-xs">
              {list.bedrooms > 1
                ? `${list.bedrooms} beds `
                : `${list.bedrooms} bed `}
            </div>

            <div className="font-bold text-xs">
              {list.bathrooms > 1
                ? `${list.bathrooms} baths `
                : `${list.bathrooms} bath `}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListItem;

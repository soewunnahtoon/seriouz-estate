import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListItem from "../components/ListItem";
import { TailSpin } from "react-loader-spinner";

const Search = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    search: "",
    type: "all",
    offer: false,
    parking: false,
    furnished: false,
    sort: "createdAt",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const searchFromUrl = urlParams.get("search");
    const typeFromUrl = urlParams.get("type");
    const offerFromUrl = urlParams.get("offer");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setData({
        search: searchFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });
    }

    const fetchlists = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/list/search?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setLists(data);
      setLoading(false);
    };

    fetchlists();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "search") {
      setData({ ...data, search: e.target.value });
    }

    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setData({ ...data, type: e.target.id });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setData({
        ...data,
        [e.target.id]: Boolean(e.target.checked),
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";

      setData({ ...data, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set("search", data.search);
    urlParams.set("type", data.type);
    urlParams.set("offer", data.offer);
    urlParams.set("parking", data.parking);
    urlParams.set("furnished", data.furnished);
    urlParams.set("sort", data.sort);
    urlParams.set("order", data.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMoreClick = async () => {
    const numberOflists = lists.length;
    const startIndex = numberOflists;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/list/search?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setLists([...lists, ...data]);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8"
        >
          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap font-semibold">Search</span>
            <input
              type="text"
              id="search"
              placeholder="Search"
              className="border rounded-lg p-3 w-full"
              value={data.search}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <span className="font-semibold">Type</span>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                checked={data.type === "all"}
                onChange={handleChange}
              />
              <label htmlFor="all">Rent & Sale</label>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                checked={data.type === "rent"}
                onChange={handleChange}
              />
              <label htmlFor="rent">Rent</label>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                checked={data.type === "sale"}
                onChange={handleChange}
              />
              <label htmlFor="sale">Sale</label>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                checked={data.offer}
                onChange={handleChange}
              />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <span className="font-semibold">Amenities</span>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                checked={data.parking}
                onChange={handleChange}
              />
              <label htmlFor="parking">Parking</label>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                checked={data.furnished}
                onChange={handleChange}
              />
              <label htmlFor="furnished">Furnished</label>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold">Sort by</span>
            <select
              id="sort_order"
              className="border rounded-lg p-3"
              value={`${data.sort}_${data.order}`}
              onChange={handleChange}
            >
              <option value="regularPrice_desc">Price High to Low</option>
              <option value="regularPrice_asc">Price Low to Hight</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>

      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          List Results
        </h1>

        <div className="p-7 flex flex-wrap gap-4">
          {loading && (
            <div className="w-full flex justify-center">
              <TailSpin
                height="40"
                width="40"
                color="#334155"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          )}

          {!loading && lists.length === 0 && (
            <p className="text-xl text-slate-700">List Not Found.</p>
          )}

          {!loading &&
            lists &&
            lists.map((list) => (
              <ListItem
                key={list._id}
                list={list}
              />
            ))}

          {showMore && (
            <button
              onClick={handleShowMoreClick}
              className="text-green-700 hover:underline p-7 text-center w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;

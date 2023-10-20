import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact";

const List = () => {
  SwiperCore.use(Navigation);
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/list/get/${id}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setList(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchList();
  }, [id]);

  const handleLinkCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}

      {error && (
        <div className="text-center my-7 text-2xl">
          <p>Something Went Wrong!</p>
          <Link to="/">Go Back to Homepage.</Link>
        </div>
      )}

      {list && !loading && !error && (
        <div>
          <Swiper navigation>
            {list.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "contain",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={handleLinkCopy}
            />
          </div>

          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link Copied!
            </p>
          )}

          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {list.name} - ${" "}
              {list.offer
                ? list.discountPrice.toLocaleString("en-US")
                : list.regularPrice.toLocaleString("en-US")}
              {list.type === "rent" && " / month"}
            </p>

            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {list.address}
            </p>

            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {list.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {list.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+list.regularPrice - +list.discountPrice} OFF
                </p>
              )}
            </div>

            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {list.description}
            </p>

            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {list.bedrooms > 1
                  ? `${list.bedrooms} Bedrooms `
                  : `${list.bedrooms} Bedroom `}
              </li>

              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {list.bathrooms > 1
                  ? `${list.bathrooms} Bathrooms `
                  : `${list.bathrooms} Bathroom `}
              </li>

              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {list.parking ? "Parking Spot" : "No Parking"}
              </li>

              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {list.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>

            {currentUser && list.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
              >
                Contact
              </button>
            )}
            {contact && <Contact list={list} />}
          </div>
        </div>
      )}
    </main>
  );
};

export default List;

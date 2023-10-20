import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const List = () => {
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [showListsError, setShowListsError] = useState(false);
  const [userLists, setUserLists] = useState([]);

  useEffect(() => {
    handleShowLists();
  }, [id]);

  const handleShowLists = async () => {
    try {
      setShowListsError(false);
      const res = await fetch(`/api/user/lists/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListsError(true);
        return;
      }
      setUserLists(data);
    } catch (error) {
      setShowListsError(true);
    }
  };

  const handleListDelete = async (listId) => {
    try {
      const res = await fetch(`/api/list/delete/${listId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserLists((prev) => prev.filter((list) => list._id !== listId));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <p className="text-red-700 mt-5">
        {showListsError ? "Error Showing Lists." : ""}
      </p>

      {userLists && userLists.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Lists
          </h1>

          {userLists.map((list) => (
            <div
              key={list._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/list/${list._id}`}>
                <img
                  src={list.imageUrls[0]}
                  alt="List Cover"
                  className="h-16 w-16 object-cover rounded-lg"
                />
              </Link>

              <Link
                to={`/list/${list._id}`}
                className="text-slate-700 font-semibold  hover:underline truncate flex-1"
              >
                <p>{list.name}</p>
              </Link>

              <div className="flex flex-col item-center">
                <button
                  onClick={() => handleListDelete(list._id)}
                  className="text-red-700 uppercase"
                >
                  Delete
                </button>

                <Link to={`/update-list/${list._id}`}>
                  <button className="text-green-700 uppercase">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;

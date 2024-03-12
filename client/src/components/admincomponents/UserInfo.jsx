import VisibilityIcon from "@mui/icons-material/Visibility";
import { newRequest } from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const UsersInfo = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      newRequest.get(`/users?search=${search}&${sort}=true`).then((res) => {
        return res.data;
      }),
  });

  const reSort = (type) => {
    setSort(type);
  };

  useEffect(() => {
    refetch();
  }, [sort, search]);

  return (
    <>
      <div className="flex justify-between">
        <h3 className="text-2xl font-bold">New Users</h3>
        <input
          className="border-b border-gray-400 w-[100px] bg-transparent placeholder:text-gray-500"
          type="text"
          placeholder="Search User"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex justify-around py-5">
        <button
          className="bg-blue-500 hover:bg-blue-600 rounded-md p-1 text-white text-lg w-[80px] active:scale-90 duration-100 transition-all dark:bg-blue-600 dark:hover:bg-blue-500"
          onClick={() => reSort("")}
        >
          All User
        </button>
        <button
          className="bg-orange-500 hover:bg-orange-600 rounded-md p-1 text-white text-lg w-[80px] active:scale-90 duration-100 transition-all dark:bg-orange-600 dark:hover:bg-orange-500"
          onClick={() => reSort("isAdmin")}
        >
          Admin
        </button>
        <button
          className="bg-orange-500 hover:bg-orange-600 rounded-md p-1 text-white text-lg w-[80px] active:scale-90 duration-100 transition-all dark:bg-orange-600 dark:hover:bg-orange-500"
          onClick={() => reSort("fromGoogle")}
        >
          Google
        </button>
      </div>
      {isLoading ? (
        <div className="h-[440px]">
          <CircularProgress color="inherit" size="28px" />
        </div>
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="h-[440px] overflow-x-hidden">
          {data.map((user) => (
            <div
              className="flex items-center justify-between my-5"
              key={user._id}
            >
              <div className="flex items-center gap-2">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={user.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <div className="flex flex-col">
                  <span className="font-semibold">{user.username}</span>
                </div>
              </div>
              <Link to={`/admin/user/${user._id}`} state={{ data: user }}>
                <button className="flex items-center gap-1 rounded-lg px-3 mx-4 py-2 text-gray-500 bg-slate-200">
                  <span className="text-gray-700 dark:text-gray-600">
                    <VisibilityIcon />
                  </span>
                  Display
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UsersInfo;

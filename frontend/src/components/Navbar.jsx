import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser, logoutUser } from "../api/user";
import { setIsLoading, setUser } from "../redux/slices/userSlice";
import { useEffect, useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [active, setActive] = useState(0); // Track active link index

  const logout = async () => {
    try {
      await logoutUser();
      dispatch(setUser(null));
      toast.success("Logout successful.");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        dispatch(setIsLoading(true));
        const data = await getUser();
        dispatch(setUser(data));
      } catch (error) {
        dispatch(setUser(null));
        console.log(error)
      } finally {
        dispatch(setIsLoading(false));
      }
    };
    fetchUser();
  }, []);

  const links = ["Home", "Places", "Hotels", "About","Contact"];

  return (
    <div className="navbar bg-[#FAFAFA]  sticky top-0 z-50">
      <div className="navbar-start">

        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 gap-2 rounded-box  z-[1] mt-3 w-52 p-2 shadow"
          >
            {links.map((link, idx) => (
              <li key={idx}>
                <Link
                  to={`/${idx === 0 ? '' : link.toLowerCase()}`}
                  onClick={() => setActive(idx)} // Set active index on click
                  className={active === idx ? "bg-gray-300" : ""}
                >
                  {link}
                </Link>
              </li>
            ))}


          </ul>
        </div>
        <Link
          to="/"
        >
        <img src="https://promos.makemytrip.com/images/mmtlogo.webp" alt="logo" width={120} />
        </Link>
      </div>
      <div className="navbar-center">
      <ul className="menu menu-horizontal hidden lg:flex px-1">
          {links.map((link, idx) => (
            <li key={idx}>
              <Link
                to={`/${idx === 0 ? '' : link.toLowerCase()}`}
                onClick={() => setActive(idx)} // Set active index on click
                className={active === idx ? "bg-gray-300" : ""}
              >
                {link}
              </Link>
            </li>
          ))}

        </ul>
        
      </div>
      <div className="navbar-end flex items-center gap-5">
       
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button">
              <div className="avatar">
                <div className="w-12 rounded-full overflow-hidden">
                  <img src={user?.profileImg} alt="User Avatar" />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              {user.role === "admin" && (
                <>
                  <li>
                    <Link to={"/place/new"}>Add Place</Link>
                  </li>
                  <li>
                    <Link to={"/hotel/new"}>Add Hotel</Link>
                  </li>
                  <li>
                    <Link to={"/users"}>Manage users</Link>
                  </li>
                </>
              )}
              <li>
                <Link to={"/profile"}>Your Profile</Link>
              </li>
              <li onClick={logout}>
                <span>Logout</span>
              </li>
            </ul>
          </div>
        ) : (
          <Link to={"/login"} className="btn  btn-success  rounded-full">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;

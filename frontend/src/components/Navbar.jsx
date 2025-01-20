import { Link } from "react-router-dom";


const Navbar = ({logout,user}) => {
 

  return (
    <div className="navbar bg-base-200 sticky top-0 z-50 shadow-lg">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={"/"}>Home</Link>
            </li>

            <li>
              <Link to={"/about"}>About</Link>
            </li>

            <li>
              <Link to={"/contact"}>Contact</Link>
            </li>
          </ul>
        </div>
        <Link
          to="/"
          className="font-bold p-2 text-lg hover:bg-gray-300 rounded-lg bg-gray-100"
        >
          Make<span className="text-green-500">My</span>Trip
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li>
          <li>
            <Link to={"/contact"}>Contact</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button">
              <div className="avatar">
                <div className="w-12 rounded-full overflow-hidden">
                  <img src={user?.profileImg} />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              {user.role === "admin" && (
                <li>
                  <a>Add Place</a>
                </li>
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
          <Link to={"/login"} className="btn btn-success text-gray-800">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setIsLoggedIn, setUser } from "../redux/slices/userSlice";
import { useEffect } from "react";
import { getUser, logoutUser } from "../api/user";

const Navbar = () => {
  const { isLoggedIn,user } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  
  useEffect(()=>{
    const fetchUser = async() =>{
      try{
       const data = await getUser();
       dispatch(setIsLoggedIn(true))
       dispatch(setUser(data))
      }catch(error){
        dispatch(setIsLoggedIn(false))
      }
   }
   fetchUser()
  },[isLoggedIn])

  const logout = () => {
     try{
      const res = logoutUser();
        dispatch(setIsLoggedIn(false))
        
     }catch(error){
       console.log(error)
     }
  }

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
              <Link to={"/place/new"}>Add place</Link>
            </li>
             
            <li>
              <Link to={"/"}>Contact</Link>
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
            <Link to={"/place/new"}>Add Place</Link>
          </li>
          <li>
            <Link to={"/contact"}>Contact</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {isLoggedIn && user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button">
              <div className="avatar">
                <div className="w-12 rounded-full overflow-hidden">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <a>{user.email}</a>
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

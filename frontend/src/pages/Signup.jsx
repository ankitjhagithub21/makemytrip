import { useState, useEffect } from "react";
import { signup } from "../api/user";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import toast from "react-hot-toast";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profilePreview, setProfilePreview] = useState('');
  const [profilePic, setProfilePic] = useState(null)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (profilePreview) URL.revokeObjectURL(profilePreview);
    };
  }, [profilePreview]);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setProfilePreview(URL.createObjectURL(file)); // Set preview for uploaded file
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", e.target.fullName.value);
    formData.append("email", e.target.email.value);
    formData.append("password", e.target.password.value);
    if (profilePic) {
      formData.append("profileImg", profilePic);
    }

    setLoading(true);
    try {
      const data = await signup(formData); // Call the signup API
      if (data.success) {
        dispatch(setUser(data.user))
        toast.success(data.message)
        navigate("/"); // Navigate to home
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-5 auth relative h-[90vh] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="max-w-sm w-full bg-white p-5 rounded-2xl shadow-2xl my-12 relative z-10">
        <h1 className="text-2xl font-semibold mb-5">Sign Up</h1>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className=' w-28 h-28 rounded-full mx-auto overflow-hidden flex items-center justify-center'>
            <label htmlFor="profilePic">
              {profilePreview ? (
                <img
                  src={profilePreview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover cursor-pointer"
                />
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="Profile Preview"
                  className="w-full h-full object-cover cursor-pointer"
                />
              )}
            </label>
            <input
              type="file"
              name="profilePic"
              id="profilePic"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <label className="input input-success flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              name="fullName"
              className="grow"
              placeholder="Enter Full Name"
              required
            />
          </label>

          <label className="input input-success flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              name="email"
              className="grow"
              placeholder="Enter Email"
              required
            />
          </label>

          <label className="input input-success flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              name="password"
              className="grow"
              placeholder="Enter password"
              required
            />
          </label>



          <button
            disabled={loading}
            type="submit"
            className="btn btn-success text-gray-800"
          >
            {loading && <span className="loading loading-spinner"></span>}
            Create account
          </button>
        </form>
        <p className="mt-3 text-sm text-center">
          Already have an account?{" "}
          <Link to={"/login"} className="underline text-green-600">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;

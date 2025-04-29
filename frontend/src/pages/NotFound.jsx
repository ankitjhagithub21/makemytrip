
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center auth h-screen px-5">
      <div className="text-center bg-white rounded-2xl p-5 ">
        <h1 className="text-9xl font-bold text-info">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mt-2">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="btn btn-info mt-5"
        >
          Back to Home
        </Link>
       
      </div>
    </div>
  );
};

export default NotFound;

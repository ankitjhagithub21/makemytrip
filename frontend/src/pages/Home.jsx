import { useNavigate } from "react-router-dom";

const Home = ({ data, loading, error }) => {
  const navigate = useNavigate();

  const handleClick = (placeId) => {
    navigate(`/place/${placeId}`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-24 px-5">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12">
        {loading
          ? [1, 2, 3].map((num) => (
              <div className="card border-2 rounded-2xl p-3" key={num}>
                <div className="overflow-hidden rounded-2xl bg-gray-300 animate-pulse h-48 w-full"></div>
                <div className="card-body p-2">
                  <div className="h-6 bg-gray-300 animate-pulse rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-gray-300 animate-pulse rounded w-1/2"></div>
                </div>
              </div>
            ))
          : data.map((place) => (
              <div
                className="card border-2 rounded-2xl p-3 cursor-pointer"
                key={place._id}
              >
                <figure
                  className="overflow-hidden rounded-2xl"
                  onClick={() => handleClick(place._id)}
                >
                  <img
                    src={place.image}
                    className="rounded-2xl hover:scale-105 transition"
                    alt={place.title}
                  />
                </figure>
                <div className="card-body p-2">
                  <h2>
                    {place.title}, {place.location}
                  </h2>
                  <p className="text-gray-800 text-2xl font-semibold">
                    ₹{place.price}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Home;

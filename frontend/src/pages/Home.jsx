import PlaceCard from "../components/PlaceCard";
import HomePageLoading from "../components/HomePageLoading";
import { useSelector } from "react-redux";
import useFetchPlaces from "../hooks/useFetchPlaces";
import Searchbar from "../components/Searchbar";
import { useState } from "react";

const Home = () => {
  useFetchPlaces();
  const { places, isLoading, searchTerm } = useSelector((state) => state.place);
  const [filter, setFilter] = useState(""); // State for sorting filter

  // Filter places based on searchTerm matching title, location, or country
  const filteredPlaces = places.filter((place) => {
    const search = searchTerm.toLowerCase();
    return (
      place.title.toLowerCase().includes(search) ||
      place.location.toLowerCase().includes(search) ||
      place.country.toLowerCase().includes(search)
    );
  });

  // Sort places based on price filter
  const sortedPlaces = [...filteredPlaces].sort((a, b) => {
    if (filter === "asc") return a.price - b.price; // Low to High
    if (filter === "desc") return b.price - a.price; // High to Low
    return 0;
  });

  return (
    <section className="min-h-screen">
      <Searchbar />
     {
      !isLoading &&  <div className="max-w-6xl mx-auto px-5 mt-12 w-full">
      <div className="label">
        <span className="label-text">Sort</span>

      </div>
      <select
        className="select select-bordered w-full max-w-xs"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >

        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
     }
      <div className="max-w-6xl mx-auto px-5 mt-12 mb-24">
        {isLoading ? (
          <HomePageLoading />
        ) : (
          <>
            {sortedPlaces.length > 0 ? (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12">
                {sortedPlaces.map((place) => (
                  <PlaceCard key={place._id} place={place} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No places found.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Home;

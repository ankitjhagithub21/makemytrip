import PlaceCard from "../components/PlaceCard";
import HomePageLoading from "../components/HomePageLoading";
import { useSelector } from "react-redux";
import useFetchPlaces from "../hooks/useFetchPlaces";
import Searchbar from "../components/Searchbar";

const Home = () => {
  useFetchPlaces();
  const { places, isLoading, searchTerm } = useSelector((state) => state.place);

  // Filter places based on searchTerm matching title, location, or country
  const filteredPlaces = places.filter((place) => {
    const search = searchTerm.toLowerCase();
    return (
      place.title.toLowerCase().includes(search) ||
      place.location.toLowerCase().includes(search) ||
      place.country.toLowerCase().includes(search)
    );
  });

  return (
    <section className="min-h-screen">
      <Searchbar />
      <div className="max-w-6xl mx-auto py-24 px-5">
        {isLoading ? (
          <HomePageLoading />
        ) : (
          <>
            {filteredPlaces.length > 0 ? (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12">
                {filteredPlaces.map((place) => (
                  <PlaceCard key={place._id} place={place} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No places found matching your search.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
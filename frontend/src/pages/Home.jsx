import PlaceCard from "../components/PlaceCard";
import HomePageLoading from "../components/HomePageLoading";
import { useSelector } from "react-redux";
import useFetchPlaces from "../hooks/useFetchPlaces";

const Home = () => {
  useFetchPlaces();
  const { places, isLoading } = useSelector((state) => state.place);
  

  return (
    <div className="max-w-6xl mx-auto min-h-screen py-24 px-5">
      {isLoading ? (
        <HomePageLoading />
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12">
          {places.length > 0 ? (
            places.map((place) => (
              <PlaceCard key={place._id} place={place} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No places available.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;

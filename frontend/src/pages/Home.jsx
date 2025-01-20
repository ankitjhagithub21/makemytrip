import { useNavigate } from "react-router-dom";
import PlaceCard from "../components/PlaceCard";
import HomePageLoading from "../components/HomePageLoading";
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
          ? <HomePageLoading />
          : data.map((place)=>{
            return <PlaceCard key={place._id} place={place} handleClick={handleClick}/>
          })
          
          }
      </div>
    </div>
  );
};

export default Home;

import PlaceCard from "../components/PlaceCard";
import HomePageLoading from "../components/HomePageLoading";

const Home = ({ data, loading, error,likeUnlike }) => {
  
  
  
  if (error) {
    return <div>Error: {error}</div>;
  }



  return (
    <div className="max-w-6xl mx-auto min-h-screen py-24 px-5">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12">
        {loading
          ? <HomePageLoading />
          : data.map((place)=>{
            return <PlaceCard key={place._id} place={place} likeUnlike={likeUnlike}/>
          })
          
          }
      </div>
    </div>
  );
};

export default Home;

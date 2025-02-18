
import Destinations from "../components/Destinations";
import Searchbar from "../components/Searchbar";
import VideoSection from "../components/VideoSection";
// import Places from "./Places";


const Home = () => {


  return (
    <section className="min-h-screen">
      <Searchbar />
      <Destinations/>
      <VideoSection/>
     {/* <Places/> */}
    </section>
  );
};

export default Home;



import AboutSection from "../components/AboutSection";
import Destinations from "../components/Destinations";
import Form from "../components/Form";
import Searchbar from "../components/Searchbar";
import Stories from "../components/Stories";
import VideoSection from "../components/VideoSection";

// import Places from "./Places";


const Home = () => {


  return (
    <main>
      <Searchbar />
      <Destinations/>
      <AboutSection/>
      <Stories/>
      <VideoSection/>
     <Form/>
     
    </main>
  );
};

export default Home;

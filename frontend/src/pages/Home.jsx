

import AboutSection from "../components/AboutSection";
import Destinations from "../components/Destinations";
import Form from "../components/Form";
import Searchbar from "../components/Searchbar";
import Stories from "../components/Stories";

// import Places from "./Places";


const Home = () => {


  return (
    <main>
      <Searchbar />
      <Destinations/>
      <AboutSection/>
      <Stories/>
     <Form/>
     
    </main>
  );
};

export default Home;

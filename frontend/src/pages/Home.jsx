

import { lazy } from 'react';

const AboutSection = lazy(() => import('../components/AboutSection'));
const Destinations = lazy(() => import('../components/Destinations'));
const Form = lazy(() => import('../components/Form'));
const HomeSection = lazy(() => import('../components/HomeSection'));
const Stories = lazy(() => import('../components/Stories'));
const VideoSection = lazy(() => import('../components/VideoSection'));


const Home = () => {


  return (
    <main>
      
      <HomeSection/>       
      <Destinations />
      <AboutSection />
      <Stories />
      <VideoSection />
      <Form />

    </main>
  );
};

export default Home;

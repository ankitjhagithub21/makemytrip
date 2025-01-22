import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Place from './pages/Place';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import CreatePlace from './pages/CreatePlace';
import useFetch from './hooks/useFetch';
import './App.css';
import UpdatePlace from './pages/UpdatePlace';
import ScrollToTop from './components/ScrollToTop';
import { setIsLoading, setIsLoggedIn, setUser } from './redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logoutUser } from './api/user';
import About from './pages/About';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';

const App = () => {
  const dispatch = useDispatch();
  const [data, setData, loading, error] = useFetch(`${import.meta.env.VITE_SERVER_URL}/api/places`);
  const { user } = useSelector((state) => state.user);

  // Add a new place to the state
  const updatePlaces = (newPlace) => {
    setData((prev) => [...prev, newPlace]);
  };

  // Delete a place from the state
  const deletePlace = (placeId) => {
    const updatedPlaces = data.filter((place) => place._id !== placeId);
    setData(updatedPlaces);
  };


  const likeUnlike = (placeId, updatedPlace) => {
    setData(data.map((place) => place._id == placeId ? updatedPlace : place))

  }



  useEffect(() => {
    const fetchUser = async () => {

      try {
        dispatch(setIsLoading(true))
        const data = await getUser();
        dispatch(setIsLoggedIn(true));
        dispatch(setUser(data));
      } catch (error) {
        dispatch(setIsLoggedIn(false));
        dispatch(setUser(null))
      } finally {
        dispatch(setIsLoading(false))
      }
    };
    fetchUser();
  }, []);

  const logout = () => {
    try {
      logoutUser();
      dispatch(setIsLoggedIn(false));
      dispatch(setUser(null));
      toast.success("Logout successfull.");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <BrowserRouter>
      <ScrollToTop>
        <Toaster />
        <Navbar user={user} logout={logout} />
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home data={data || []} loading={loading} error={error} likeUnlike={likeUnlike} />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<ProtectedRoute>
            <Profile />
          </ProtectedRoute>} />
          <Route path="/contact" element={<Contact />} />

          {/* Place Details Route */}
          <Route exact path="/place/:id" element={<Place deletePlace={deletePlace} />} />

          {/* Create New Place Route */}
          <Route exact path="/place/new" element={<CreatePlace updatePlaces={updatePlaces} />} />

          {/* Update Place route */}
          <Route exact path="/place/:id/edit" element={<UpdatePlace />} />

          {/* User Authentication Routes */}
          <Route path="/signup" element={<PublicRoute>
            <Signup />
          </PublicRoute>} />
          <Route path="/login" element={
            <PublicRoute>
            <Login />
          </PublicRoute>
          } />

          {/* Fallback Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default App;

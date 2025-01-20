import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
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

const App = () => {
  const [data, setData, loading, error] = useFetch(`${import.meta.env.VITE_SERVER_URL}/api/places`);
 
  // Add a new place to the state
  const updatePlaces = (newPlace) => {
    setData((prev) => [...prev, newPlace]);
  };

  // Delete a place from the state
  const deletePlace = (placeId) => {
    const updatedPlaces = data.filter((place) => place._id !== placeId);
    setData(updatedPlaces);
  };

  return (
    <BrowserRouter>
      <Toaster />
      <Navbar />
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home data={data || []} loading={loading} error={error} />} />

        {/* Place Details Route */}
        <Route exact path="/place/:id" element={<Place deletePlace={deletePlace} />} />

        {/* Create New Place Route */}
        <Route exact path="/place/new" element={<CreatePlace updatePlaces={updatePlaces} />} />

          {/* Update Place route */}
        <Route exact path="/place/:id/edit" element={<UpdatePlace  />} />

        {/* User Authentication Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Fallback Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

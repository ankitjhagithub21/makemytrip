import React from 'react'
import "./App.css"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Place from './pages/Place'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Footer from './components/Footer'
import useFetch from './hooks/useFetch'
import NotFound from './pages/NotFound'
import {Toaster} from 'react-hot-toast'
import CreatePlace from './pages/CreatePlace'

const App = () => {
  const [data,loading,error] = useFetch(`${import.meta.env.VITE_SERVER_URL}/api/places`);

  return (
    <BrowserRouter>
    <Toaster/>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home data={data} loading={loading} error={error}/>}/>
      <Route path='/place/:id' element={<Place/>}/>
      <Route path='/place/new' element={<CreatePlace/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    
    <Footer/>
    </BrowserRouter>
  )
}

export default App
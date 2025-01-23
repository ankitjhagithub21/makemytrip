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
import UpdatePlace from './pages/UpdatePlace';
import ScrollToTop from './components/ScrollToTop';
import About from './pages/About';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import AdminRoute from './routes/AdminRoute';
import './App.css';

const App = () => {

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Toaster />
        <Navbar />
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<ProtectedRoute>
            <Profile />
          </ProtectedRoute>} />
          <Route path="/contact" element={<Contact />} />

          {/* Place Details Route */}
          <Route exact path="/place/:id" element={<Place />} />

          {/* Create New Place Route */}
          <Route exact path="/place/new" element={<AdminRoute>
            <CreatePlace />
          </AdminRoute>} />

          {/* Update Place route */}
          <Route exact path="/place/:id/edit" element={<AdminRoute>
            <UpdatePlace />
          </AdminRoute>} />

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

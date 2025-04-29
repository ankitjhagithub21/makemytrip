
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { lazy, Suspense } from 'react';
const LoadingPage = lazy(()=>import('./components/LoadingPage'))
const Navbar = lazy(() => import('./components/Navbar'));
const Footer = lazy(() => import('./components/Footer'));
const Home = lazy(() => import('./pages/Home'));
const Place = lazy(() => import('./pages/Place'));
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));
const CreatePlace = lazy(() => import('./pages/CreatePlace'));
const UpdatePlace = lazy(() => import('./pages/UpdatePlace'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const About = lazy(() => import('./pages/About'));
const Profile = lazy(() => import('./pages/Profile'));
const Contact = lazy(() => import('./pages/Contact'));
const ProtectedRoute = lazy(() => import('./routes/ProtectedRoute'));
const PublicRoute = lazy(() => import('./routes/PublicRoute'));
const AdminRoute = lazy(() => import('./routes/AdminRoute'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Users = lazy(() => import('./pages/Users'));
const Places = lazy(() => import('./pages/Places'));
const Hotels = lazy(() => import('./pages/Hotels'));
const CreateHotel = lazy(() => import('./pages/CreateHotel'));
const Bookings = lazy(() => import('./pages/Bookings'));
import "./App.css"

const App = () => {

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage/>}>
        <ScrollToTop>
          <Toaster />
          <Navbar />
          <Routes>

            {/* Home Route */}
            <Route path="/" element={<Home />} />
            <Route path="/places" element={<Places />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<ProtectedRoute>
              <Profile />
            </ProtectedRoute>} />
            <Route path="/bookings" element={<ProtectedRoute>
              <Bookings />
            </ProtectedRoute>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

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

            {/* Create New hotel Route */}
            <Route exact path="/hotel/new" element={<AdminRoute>
              <CreateHotel />
            </AdminRoute>} />

            {/* Update Place route */}
            <Route exact path="/users" element={<AdminRoute>
              <Users />
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
      </Suspense >
    </BrowserRouter >

  );
};

export default App;


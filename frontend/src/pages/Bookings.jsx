import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserBookings } from "../api/booking";
import toast from "react-hot-toast";
import LoadingPage from "../components/LoadingPage";

const Bookings = () => {
  const { user } = useSelector((state) => state.user);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) {
        toast.error("Please log in to view your bookings.");
        return;
      }

      try {
        const { data } = await getUserBookings(user._id);
        setBookings(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) {
    return <LoadingPage/>;
  }

  if (bookings.length === 0) {
    return <div className="text-center py-24 my-24">No bookings found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-5 w-full py-12">
      <h1 className="text-2xl font-semibold mb-6">My Bookings</h1>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
        {bookings.map((booking) => (
          <div key={booking._id} className="shadow-lg rounded-lg bg-white p-5">
            <h2 className="text-xl font-semibold mb-2">{booking.hotelId.name}</h2>
          
            <p><strong>Check-In:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
            <p><strong>Check-Out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
            <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>
            <p><strong>Location:</strong> {booking.hotelId.location}</p>
            <p><strong>Payment Status:</strong> {booking.paymentStatus}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;

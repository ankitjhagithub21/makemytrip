import { useEffect, useState, lazy } from "react";
import { useSelector } from "react-redux";
import { getUserBookings } from "../api/booking";
import toast from "react-hot-toast";
const LoadingPage = lazy(() => import('../components/LoadingPage'))
import { createPayment } from "../api/payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

axios.defaults.withCredentials = true;

// Load Stripe with your public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

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

  const PaymentForm = ({ bookingId, amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isSubmitting, setIsSubmitting] = useState(false); // Local state
  
    const handlePayment = async () => {
      if (!stripe || !elements) {
        toast.error("Stripe is not loaded yet.");
        return;
      }
  
      setIsSubmitting(true);
      try {
        const data = await createPayment({
          userId: user._id,
          bookingId,
          amount,
        });
  
        const { clientSecret } = data;
  
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: user.fullName,
              email: user.email
            },
          },
        });
  
        if (result.error) {
          toast.error(result.error.message);
        } else if (result.paymentIntent.status === "succeeded") {
          await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/payments/success`, {
            userId: user._id,
            bookingId,
            amount,
            transactionId: result.paymentIntent.id,
          });
  
          toast.success("Payment successful!");
          setBookings((prev) =>
            prev.map((booking) =>
              booking._id === bookingId
                ? { ...booking, paymentStatus: "Paid" }
                : booking
            )
          );
        }
      } catch (error) {
        console.error(error);
        toast.error("Payment failed.");
      } finally {
        setIsSubmitting(false);
      }
    };
  
    return (
      <div className="mt-4">
        <CardElement className="border p-2 rounded" />
        <button
          disabled={isSubmitting}
          className="bg-indigo-600 text-white px-4 py-2 rounded mt-3"
          onClick={handlePayment}
        >
          {isSubmitting ? "Please wait..." : `Pay ₹${amount}`}
        </button>
      </div>
    );
  };
  

  if (loading) {
    return <LoadingPage />;
  }

  if (bookings.length === 0) {
    return <div className="text-center py-24 my-24">No bookings found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-5 w-full py-12">
      <h1 className="text-2xl font-semibold mb-6">My Bookings</h1>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="shadow-lg rounded-lg bg-white p-5 flex flex-col gap-2"
          >
            <h2 className="text-xl font-semibold mb-2">
              {booking.hotelId.name}
            </h2>

            <p>
              <strong>Check-In:</strong>{" "}
              {new Date(booking.checkInDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Check-Out:</strong>{" "}
              {new Date(booking.checkOutDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Total Price:</strong> ₹{booking.totalPrice}
            </p>
            <p>
              <strong>Location:</strong> {booking.hotelId.location}
            </p>
            <p>
              <strong>Payment Status:</strong>{" "}
              {booking.paymentStatus === "Pending" ? (
                <Elements stripe={stripePromise}>
                  <PaymentForm
                    bookingId={booking._id}
                    amount={booking.totalPrice}
                  />
                </Elements>
              ) : (
                booking.paymentStatus
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;

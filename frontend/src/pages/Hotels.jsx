import { useSelector } from "react-redux";
import useFetchHotels from "../hooks/useFetchHotels";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createBooking } from "../api/booking";
import HotelSearch from "../components/HotelSearch";
import LoadingPage from "../components/LoadingPage";

const Hotels = () => {
  useFetchHotels();
  const { hotels, isLoading, searchTerm } = useSelector((state) => state.hotel);
  const { user } = useSelector((state) => state.user);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const navigate = useNavigate();

  // Filter hotels based on search term
  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total price based on date difference
  const calculateTotalPrice = (pricePerNight) => {
    if (!checkInDate || !checkoutDate) return 0;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkoutDate);
    const diffTime = checkOut - checkIn;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      toast.error("Check-out date must be after check-in date.");
      return 0;
    }

    return pricePerNight * diffDays;
  };

  // Handle booking
  const handleBookNow = async (hotelId, price) => {
    if (!user) {
      return toast.error("You are not logged in.");
    }

    if (!checkInDate || !checkoutDate) {
      return toast.error("Please select check-in and check-out date.");
    }

    const totalPrice = calculateTotalPrice(price);
    if (totalPrice <= 0) {
      return;
    }

    const bookingData = {
      userId: user._id,
      hotelId,
      checkInDate,
      checkOutDate: checkoutDate,
      totalPrice,
    };

    try {
      const data = await createBooking(bookingData);
      toast.success(data.message);
      navigate("/bookings");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to book the hotel.");
    }
  };

  if (isLoading) {
    return <LoadingPage/>;
  }

  return (
    <div className="max-w-6xl mx-auto px-5 w-full py-12 ">
      {/* Date Input Fields */}
      <HotelSearch />
      <div className="flex gap-4 items-center my-8 px-5">
        <div className="flex flex-col">
          <label htmlFor="checkInDate" className="text-gray-700 mb-1">
            Check-In Date
          </label>
          <input
            type="date"
            id="checkInDate"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="checkoutDate" className="text-gray-700 mb-1">
            Check-Out Date
          </label>
          <input
            type="date"
            id="checkoutDate"
            value={checkoutDate}
            onChange={(e) => setCheckoutDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Filtered Hotel List */}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
        {filteredHotels.length==0 ? <div className="text-xl py-24">Hotel not found.</div> : filteredHotels.map((hotel) => (
          <div key={hotel._id} className="flex md:flex-row flex-col gap-5 items-center shadow-lg rounded-lg bg-white p-5">
            <img
              src={hotel.images[0]}
              alt={hotel.name}
              className="h-56 md:w-56 w-full object-cover object-center rounded-xl"
            />
            <div className="flex flex-col items-start gap-2">
              <h2 className="text-xl font-semibold">{hotel.name}</h2>
              <p className="text-gray-600 text-sm">{hotel.description}</p>
              <p className="text-indigo-700 font-bold">₹ {hotel.price} / night</p>
              {checkInDate && checkoutDate && (
                <p className="text-green-600">Total Price: ₹ {calculateTotalPrice(hotel.price)}</p>
              )}
              <button
                onClick={() => handleBookNow(hotel._id, hotel.price)}
                className="bg-indigo-700 text-white rounded-lg px-4 py-2 hover:bg-indigo-800 transition"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotels;

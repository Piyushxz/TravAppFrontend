import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useDate } from "../../context/date-context";
import { useHotel } from "../../context/hotel-context";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";

export const Payment = () => {
  const params = useParams();
  const { id } = params;

  const navigate = useNavigate();

  const { guests, checkinDate, checkOutDate } = useDate();
  const { setHotel } = useHotel();

  const numberOfNights =
    checkinDate && checkOutDate
      ? (checkOutDate.getTime() - checkinDate.getTime()) / (1000 * 3600 * 24)
      : 0;

  const [singleHotel, setSingleHotel] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://travelapp-backend-3hjw.onrender.com/api/hotels/${id}`
        );
        setSingleHotel(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);

  const { image, name, address, state, rating, price } = singleHotel;

  const totalPayableAmount = price * numberOfNights + 150;

  const loadScript = (source) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = source;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleConfirmBookingClick = async () => {
    const response = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!response) {
      console.log({ message: "Razorpay SDK failed to load" });
    }

    const options = {
      key: "rzp_test_VSdp7X3K39GwBK",
      amount: totalPayableAmount * 100,
      currency: "INR",
      name: "TravelO",
      email: "piyushsavale2@gmail.com",
      contact: "9673004344",
      description: "Thank you for booking with us",

      handler: ({ payment_id }) => {
        setSingleHotel({
          ...singleHotel,
          orderId: uuid(),
          payment_id,
          checkinDate: checkinDate
            ? checkinDate.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              })
            : "N/A",
          checkOutDate: checkOutDate
            ? checkOutDate.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              })
            : "N/A",
          totalPayableAmount,
        });
        navigate("/");
      },
      prefill: {
        name: "Piyush Savale",
        email: "piyushsavale2@gmail.com",
        contact: "9673004344",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <Fragment>
      <header className="heading">
        <h1 className="heading-1">
          <Link className="link" to="/">
            TravelO
          </Link>
        </h1>
      </header>
          <main className="payment-page flex flex-col md:flex-row justify-center p-6 md:p-36 gap-8">
      
      <div className="final-details flex flex-col gap-4 border border-accent rounded-lg p-4 w-full md:w-80 shadow-lg">
        <div className="flex gap-4">
          <img className="image w-32 h-32 object-cover rounded-lg" src={image} alt={name} />
          <div className="flex flex-col justify-between">
            <div className="flex flex-col">
              <span className="font-semibold text-lg">{name}</span>
              <span className="text-sm text-gray-600">
                {address}, {state}
              </span>
            </div>
            <div className="rating-container mt-2">
              <span className="rating flex items-center">
                <span className="material-icons-outlined">star</span>
                <span>{rating}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="tag border-t border-b border-accent py-2 text-center">
          Your booking is protected by{" "}
          <strong className="text-primary">TravelO</strong> cover
        </div>
        <div className="price-detail-container">
          <div className="price-distribution flex flex-col">
            <h3 className="text-lg font-semibold">Price Details</h3>
            <div className="final-price flex justify-between items-center py-2">
              <span className="font-medium">
                Rs. {price} x {numberOfNights} nights
              </span>
              <span className="font-medium">Rs. {price * numberOfNights}</span>
            </div>
            <div className="final-price flex justify-between items-center py-2">
              <span className="font-medium">Service fee</span>
              <span className="font-medium">Rs. 200</span>
            </div>
            <div className="final-price flex justify-between items-center py-2">
              <span className="font-medium">Total</span>
              <span className="font-bold">Rs. {totalPayableAmount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trip Details Card */}
      <div className="final-details-container flex flex-col gap-6 p-4 w-full md:w-80 shadow-lg border border-accent rounded-lg">
        <h2 className="text-xl font-bold text-center">Trip Details</h2>
        <div className="dates-and-guests flex flex-col gap-4 border-b border-accent p-2">
          <h3 className="text-lg font-semibold">Your Trip</h3>
          <div>
            <p className="font-medium">Dates</p>
            <span>
              {checkinDate
                ? checkinDate.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                  })
                : "N/A"}{" "}
              -
              {checkOutDate
                ? checkOutDate.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                  })
                : "N/A"}
            </span>
          </div>
          <div>
            <p className="font-medium">Guests</p>
            <span>{guests} Guests</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-center">
          <h3 className="text-lg font-semibold">Pay with</h3>
          <div className="font-medium text-blue-600">Razorpay</div>
        </div>
        <button
          className="btn-pay bg-primary text-white font-bold rounded-lg py-3 mt-4"
          onClick={handleConfirmBookingClick}
        >
          Confirm Booking
        </button>
      </div>
    </main>


    </Fragment>
  );
};

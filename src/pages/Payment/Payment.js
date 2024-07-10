import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useDate } from "../../context/date-context";
import { useHotel } from "../../context/hotel-context";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";

import "./Payment.css";

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
          `https://travelapp-backend-cdeh.onrender.com/api/hotels/${id}`
        );
        setSingleHotel(data);
        console.log(singleHotel)
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
        navigate("/order-summary");
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
      <main className="payment-page d-flex justify-center">
        <div className="final-details-container d-flex direction-column gap-md">
          <h2>Trip Details</h2>
          <div className="dates-and-guests d-flex direction-column gap-md">
            <h3>Your Trip</h3>
            <div>
              <p>Dates</p>
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
              <p>Guests</p>
              <span>{guests} Guests</span>
            </div>
          </div>
          <div className="d-flex direction-column gap-sm">
            <h3>Pay with</h3>
            <div>Razorpay</div>
          </div>
          <button
            className="button btn-primary btn-reserve cursor btn-pay"
            onClick={handleConfirmBookingClick}
          >
            Confirm Booking
          </button>
        </div>
        <div className="final-details d-flex direction-column gap-large">
          <div className="d-flex gap-sm">
            <img className="image" src={image} alt={name} />
            <div className="d-flex direction-column">
              <div className="d-flex direction-column grow-shrink-basis">
                <span>{name}</span>
                <span>
                  {address}, {state}
                </span>
              </div>
              <div className="rating-container">
                <span className="rating d-flex align-center">
                  <span className="material-icons-outlined">star</span>
                  <span>{rating}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="tag">
            Your booking is protected by{" "}
            <strong className="strong">TravelO</strong> cover
          </div>
          <div className="price-detail-container">
            <div className="price-distribution d-flex direction-column">
              <h3>Price Details</h3>
              <div className="final-price d-flex align-center justify-space-between">
                <span className="span">
                  Rs. {price} x {numberOfNights} nights
                </span>
                <span className="span">Rs. {price * numberOfNights}</span>
              </div>
              <div className="final-price d-flex align-center justify-space-between">
                <span className="span">Service fee</span>
                <span className="span">Rs. 200</span>
              </div>
              <div className="final-price d-flex align-center justify-space-between">
                <span className="span">Total</span>
                <span className="span">Rs. {totalPayableAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

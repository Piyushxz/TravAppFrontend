import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { HotelImages } from "../HotelImages/HotelImages";
import { HotelDetails } from "../HotelDetails/HotelDetails";
import { FinalPrice } from "../FinalPrice/FinalPrice";
import NewNavbar from "../NewNavbar/NewNavbar";

export const SingleHotel = () => {
  const { id } = useParams();
  const [singleHotel, setSingleHotel] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`https://travelapp-backend-3hjw.onrender.com/api/hotels/${id}`);
        setSingleHotel(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  const { city, state } = singleHotel;

  return (
    <>
      <NewNavbar />
      <main className="single-hotel-page p-4 md:p-8 font-manrope tracking-tight ">
        <p className="hotel-name-address text-xl md:text-2xl pb-2 mt-20 font-manrope tracking-tight">
          {city}, {state}
        </p>
        <HotelImages singleHotel={singleHotel} />
        <div className="w-full flex flex-col md:flex-row gap-6 mt-6">
          {/* Added gap and adjusted layout */}
          <div className="flex-grow md:w-2/3"> {/* Flex-grow for HotelDetails */}
            <HotelDetails singleHotel={singleHotel} />
          </div>
          <div className="md:w-1/3"> {/* Fixed width for FinalPrice */}
            <FinalPrice singleHotel={singleHotel} />
          </div>
        </div>
      </main>
    </>
  );
};

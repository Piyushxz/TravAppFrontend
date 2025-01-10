import Navbar from "../Navbar/Navbar";
import { useDate } from "../../context/date-context";
import { useCategory } from "../../context/category-context";
import { useState, useEffect } from "react";
import { HotelCard } from "../HotelCard/HotelCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SearchResult = () => {
    const { destination } = useDate();
    const { hotelCategory } = useCategory();
    const [hotels, setHotels] = useState([]);
    const nav = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(
                    `https://travelapp-backend-3hjw.onrender.com/api/hotels?category=${hotelCategory}`
                );
                setHotels(data);
            } catch (err) {
                console.error("Error fetching hotels:", err);
            }
        })();
    }, [destination, hotelCategory]); 

    const filteredSearchResults = hotels.filter(
        ({ city, address, state }) =>
            address.toLowerCase() === destination.toLowerCase() ||
            city.toLowerCase() === destination.toLowerCase() ||
            state.toLowerCase() === destination.toLowerCase()
    );

    return (
        <>
            <Navbar />
            <div className="w-screen flex justify-center">
            <section className="main flex flex-wrap gap-4 p-4 w-[80vw]">
                {filteredSearchResults.length > 0 ? (
                    filteredSearchResults.map(hotel => (
                        <HotelCard key={hotel._id} hotel={hotel} />
                    ))
                ) : (
                    <h3 className="text-center w-full">Not found</h3>
                )}
            </section>
            </div>
            <div className="w-screen flex justify-center mt-6">
                <div className="w-[80vw]">
                <button onClick={()=>nav("/search")}
                className="md:px-6 md:py-3 px-4 py-2 font-manrope font-bold text-white rounded-lg bg-[#FF7518] hover:opacity-60">
                            All Hotels
                      </button>
                </div>
            </div>


        </>
    );
};

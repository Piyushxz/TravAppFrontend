import Navbar from "../Navbar/Navbar";
import { useDate } from "../../context/date-context";
import { useCategory } from "../../context/category-context";
import { useState, useEffect } from "react";
import { HotelCard } from "../HotelCard/HotelCard";
import axios from "axios";

export const SearchResult = () => {
    const { destination } = useDate();
    const { hotelCategory } = useCategory();
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(
                    `https://travelapp-backend-cdeh.onrender.com/api/hotels?category=${hotelCategory}`
                );
                setHotels(data);
            } catch (err) {
                console.error("Error fetching hotels:", err);
            }
        })();
    }, [destination, hotelCategory]); // Added hotelCategory as dependency

    const filteredSearchResults = hotels.filter(
        ({ city, address, state }) =>
            address.toLowerCase() === destination.toLowerCase() ||
            city.toLowerCase() === destination.toLowerCase() ||
            state.toLowerCase() === destination.toLowerCase()
    );

    return (
        <>
            <Navbar />
            <section className="main flex flex-wrap gap-4 p-4">
                {filteredSearchResults.length > 0 ? (
                    filteredSearchResults.map(hotel => (
                        <HotelCard key={hotel._id} hotel={hotel} />
                    ))
                ) : (
                    <h3 className="text-center w-full">Not found</h3>
                )}
            </section>
        </>
    );
};

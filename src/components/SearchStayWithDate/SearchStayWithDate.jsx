import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDate } from "../../context/date-context";
import { useCategory } from "../../context/category-context";
import { DateSelector } from "../DateSelector/DateSelector";
import { useNavigate } from "react-router-dom";

export const SearchStayWithDate = () => {
    const { dateDispatch, destination, guests, isSearchResultOpen } = useDate();
    const { hotelCategory } = useCategory();
    const [hotels, setHotels] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`https://travelapp-backend-3hjw.onrender.com/api/hotels?category=${hotelCategory}`);
                setHotels(data);
            } catch (err) {
                console.error("Error fetching hotels:", err);
            }
        })();
    }, [hotelCategory]);

    const handleDestinationChange = (e) => {
        dateDispatch({
            type: "DESTINATION",
            payload: e.target.value
        });
    };

    const handleGuestChange = (e) => {
        dateDispatch({
            type: "GUESTS",
            payload: e.target.value
        });
    };

    const handleSearchResultClick = (address) => {
        dateDispatch({
            type: "DESTINATION",
            payload: address
        });
    };

    const destinationOptions = hotels.filter(({ address, city, state, country }) =>
        address.toLowerCase().includes(destination.toLowerCase()) ||
        city.toLowerCase().includes(destination.toLowerCase()) ||
        state.toLowerCase().includes(destination.toLowerCase()) ||
        country.toLowerCase().includes(destination.toLowerCase())
    );

    const handleDestinationFocus = () => {
        dateDispatch({
            type: "SHOW_SEARCH_RESULT",
        });
    };

    const handleSearchButtonClick = () => {
        dateDispatch({
            type: "CLOSE_SEARCH_MODAL",
        });
        navigate(`/hotels/${destination}`);
    };

    const handleCloseModal = () => {
        dateDispatch({
            type: "OPEN_SEARCH_MODAL"
        });
    };

    return (
        <div className="destination-container fixed inset-0 z-50 bg-overlay flex justify-center items-start">
            <div className="destination-options bg-background rounded-lg p-4 md:w-96 w-11/12 mt-12 relative flex ">
                <button
                    onClick={handleCloseModal}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                >
                    <span className="material-icons-outlined text-2xl">
                        highlight_off
                    </span>
                </button>
                <div className="flex flex-col space-y-4">
                    <div className="location-container">
                        <label className="label">Where</label>
                        <input
                            value={destination}
                            onChange={handleDestinationChange}
                            onFocus={handleDestinationFocus}
                            className="input search-dest p-2 border rounded w-full"
                            placeholder="Search Destination"
                            autoFocus
                        />
                    </div>
                    <div className="location-container">
                        <label className="label">Check in</label>
                        <DateSelector checkInType="in" />
                    </div>
                    <div className="location-container">
                        <label className="label">Check out</label>
                        <DateSelector checkInType="out" />
                    </div>
                    <div className="location-container">
                        <label className="label">No. of Guests</label>
                        <input
                            value={guests}
                            className="input search-dest p-2 border rounded w-full"
                            placeholder="Add guests"
                            onChange={handleGuestChange}
                        />
                    </div>
                    <div className="search-container flex items-center justify-center cursor-pointer bg-primary text-white p-2 rounded w-full sm:w-1/2 mx-auto" onClick={handleSearchButtonClick}>
                        <span className="material-icons-outlined">search</span>
                        <span className="ml-2">Search</span>
                    </div>
                </div>

               
                {isSearchResultOpen && (
                    <div className="search-result-container bg-background text-primary mt-4 ml-24 max-h-10 overflow-y-auto rounded shadow-md absolute right-0 w-64">
                        {destinationOptions.map(({ address, city }, index) => (
                            <p
                                key={index} 
                                className="p cursor-pointer hover:bg-gray-200 px-2 py-1"
                                onClick={() => handleSearchResultClick(address)}
                            >
                                {address}, {city}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

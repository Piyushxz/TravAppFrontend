import React, { useState, useEffect } from "react";
import { useDate } from "../context/date-context";
import { useCategory } from "../context/category-context";
import { DateSelector } from "./DateSelector/DateSelector";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MapPin } from "lucide-react";

export const HomeSelection = () => {
    const { dateDispatch, destination, guests, isSearchResultOpen } = useDate();
    const { hotelCategory } = useCategory();
    const [hotels, setHotels] = useState([]);
    const [isInputFocused, setIsInputFocused] = useState(false);

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
    }, [hotelCategory]);

    const navigate = useNavigate();

    const handleDestinationChange = (e) => {
        dateDispatch({
            type: "DESTINATION",
            payload: e.target.value,
        });
    };

    const handleGuestChange = (e) => {
        dateDispatch({
            type: "GUESTS",
            payload: e.target.value,
        });
    };

    const handleSearchResultClick = (hotel) => {
        const fullDestination = `${hotel.city}, ${hotel.country}`;
        dateDispatch({
            type: "DESTINATION",
            payload: fullDestination,
        });
        setIsInputFocused(false);
        dateDispatch({
            type: "HIDE_SEARCH_RESULT",
        });
    };

    const destinationOptions = hotels.filter(
        ({ address, city, state, country }) =>
            address.toLowerCase().includes(destination.toLowerCase()) ||
            city.toLowerCase().includes(destination.toLowerCase()) ||
            state.toLowerCase().includes(destination.toLowerCase()) ||
            country.toLowerCase().includes(destination.toLowerCase())
    );

    const handleDestinationFocus = () => {
        setIsInputFocused(true);
        dateDispatch({
            type: "SHOW_SEARCH_RESULT",
        });
    };

    const handleDestinationBlur = () => {
        // Delay hiding to allow clicking on options
        setTimeout(() => {
            setIsInputFocused(false);
            dateDispatch({
                type: "HIDE_SEARCH_RESULT",
            });
        }, 200);
    };

    const handleSearchButtonClick = () => {
        navigate(`/hotels/${destination}`);
    };

    const handleBlur = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            dateDispatch({
                type: "HIDE_SEARCH_RESULT",
            });
        }
    };

    return (
        <div
            className="destination-options border font-manrope tracking-tight border-white bg-background rounded-lg p-4 w-96 mt-4 relative flex shadow-2xl font-manrope flex justify-center"
            onBlur={handleBlur}
        >
            <div className="flex flex-col space-y-4 p-2">
                <div className="location-container relative">
                    <label className="label font-manrope font-bold text-xs">LOCATION</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            value={destination}
                            onChange={handleDestinationChange}
                            onFocus={handleDestinationFocus}
                            onBlur={handleDestinationBlur}
                            className="input search-dest pl-10 pr-4 py-4 border rounded w-full"
                            placeholder="Search Destination"
                            autoFocus
                        />
                    </div>
                    
                    {/* Hotel Options Dropdown */}
                    {isInputFocused && isSearchResultOpen && destinationOptions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                            {destinationOptions.slice(0, 5).map((hotel, index) => (
                                <div
                                    key={index}
                                    className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                    onClick={() => handleSearchResultClick(hotel)}
                                >
                                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 mr-3">
                                        <img
                                            src={hotel.image}
                                            alt={hotel.city}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900 text-sm">
                                            {hotel.city}, {hotel.country}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {hotel.name}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="location-container p-2 font-manrope tracking-tigther font-sm flex justify-between items-center">
                    <label className="label">Check in</label>
                    <DateSelector checkInType="in" />
                </div>
                <div className="location-container p-2 font-manrope tracking-tigther font-sm flex justify-between items-center">
                    <label className="label">Check out</label>
                    <DateSelector checkInType="out" />
                </div>
                <div className="location-container">
                    <label className="label">No. of Guests</label>
                    <input
                        value={guests}
                        className="input search-dest p-4 border rounded w-full"
                        placeholder="Add guests"
                        onChange={handleGuestChange}
                    />
                </div>
                <div
                    className="search-container font-manrope tracking-tigther p-4 w-full flex items-center justify-center hover:bg-opacity-60 transition-all ease-in-out cursor-pointer bg-primary text-white p-2 rounded mx-auto"
                    onClick={handleSearchButtonClick}
                >
                    <span className="material-icons-outlined">search</span>
                    <span className="ml-2">Search</span>
                </div>

            </div>

        </div>
    );
};

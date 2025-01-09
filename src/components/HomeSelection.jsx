import React, { useState, useEffect } from "react";
import { useDate } from "../context/date-context";
import { useCategory } from "../context/category-context";
import { DateSelector } from "./DateSelector/DateSelector";
import { useNavigate } from "react-router-dom";

export const HomeSelection = () => {
    const { dateDispatch, destination, guests, isSearchResultOpen } = useDate();
    const { hotelCategory } = useCategory();
    const [hotels, setHotels] = useState([]);

    const navigate = useNavigate();



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



    return (
            <div className="destination-options bg-background rounded-lg p-4 md:w-96 w-11/12 mt-4 relative flex shadow-2xl font-manrope flex justify-center hover:">

                <div className="flex flex-col space-y-4">
                    <div className="location-container">
                        <label className="label font-manrope font-bold text-xs">LOCATION</label>
                        <input
                            value={destination}
                            onChange={handleDestinationChange}
                            onFocus={handleDestinationFocus}
                            className="input search-dest p-4 border rounded w-full"
                            placeholder="Search Destination"
                            autoFocus
                        />
                    </div>
                    <div className="location-container  font-manrope  tracking-tigther font-sm flex justify-between items-center">
                        <label className="label">Check in</label>
                        <DateSelector checkInType="in" />
                    </div>
                    <div className="location-container font-manrope  tracking-tigther font-sm flex justify-between items-center">
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
                    <div className="search-container font-manrope  tracking-tigther p-4 w-full flex items-center justify-center hover:bg-opacity-60 transition-all ease-in-out cursor-pointer bg-primary text-white p-2 rounded mx-auto" onClick={handleSearchButtonClick}>
                        <span className="material-icons-outlined">search</span>
                        <span className="ml-2">Search</span>
                    </div>
                </div>

               
            </div>
    );
};

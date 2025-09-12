import { Categories } from "../components/Categories/Categories";
import { HotelCard } from "../components/HotelCard/HotelCard";
import { Navbar } from "../components/Navbar/Navbar";
import { useCategory } from "../context/category-context";
import { SearchStayWithDate } from "../components/SearchStayWithDate/SearchStayWithDate";
import { useDate } from "../context/date-context";
import axios from "axios";
import { useEffect, useState } from "react";
import { Filter } from "../components/Filter/Filter";
import { useFilter } from "../context/filter-context";
import { AuthModal } from "../components/AuthModal/AuthModal";
import { useAuth } from "../context/auth-context";
import { NewNavbar } from "../components/NewNavbar/NewNavbar";
import useIsMobile from "../hooks/isMobile";
import MobileNavbar from "../components/Navbar/MobileNavbar";

export const Home = () => {
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const { hotelCategory } = useCategory();
    const { isSearchModalOpen, destination, checkinDate, checkOutDate, guests } = useDate();
    const { isFilterModalOpen, priceRange, propertyType, isCancelable } = useFilter();
    const { isAuthModalOpen } = useAuth();
    const isMobile = useIsMobile()
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`https://travelapp-backend-3hjw.onrender.com/api/hotels?category=${hotelCategory}`);
                console.log(data);
                setHotels(data);
                setFilteredHotels(data);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [hotelCategory]);

    // Apply search filters when search criteria change
    useEffect(() => {
        let filtered = [...hotels];
        console.log('Total hotels:', hotels.length);
        console.log('Destination filter:', destination);

        // Filter by destination
        if (destination) {
            filtered = filtered.filter(hotel => {
                // Handle "City, Country" format from search bar
                if (destination.includes(',')) {
                    const [city, country] = destination.split(',').map(s => s.trim().toLowerCase());
                    const matches = hotel.city.toLowerCase().includes(city) && 
                                   hotel.country.toLowerCase().includes(country);
                    console.log(`Hotel: ${hotel.city}, ${hotel.country} - Matches: ${matches}`);
                    return matches;
                }
                // Handle individual field searches
                return hotel.city.toLowerCase().includes(destination.toLowerCase()) ||
                       hotel.country.toLowerCase().includes(destination.toLowerCase()) ||
                       hotel.address.toLowerCase().includes(destination.toLowerCase()) ||
                       hotel.state.toLowerCase().includes(destination.toLowerCase());
            });
        }

        // Filter by price range
        filtered = filtered.filter(hotel => hotel.price >= priceRange[0] && hotel.price <= priceRange[1]);

        // Filter by property type
        if (propertyType !== "Any") {
            filtered = filtered.filter(hotel => hotel.propertyType === propertyType);
        }

        // Filter by cancellation policy
        filtered = filtered.filter(hotel => hotel.isCancelable === isCancelable);

        console.log('Filtered hotels:', filtered.length);
        setFilteredHotels(filtered);
    }, [hotels, destination, priceRange, propertyType, isCancelable]);


    return (
        <div className="relative">
            {/* <Navbar /> */}
          { isMobile ? <MobileNavbar/> :<NewNavbar/>}
          
            <Categories />
            <main className="flex flex-wrap gap-4 justify-center items-start p-4">
                {filteredHotels && 
                    filteredHotels.map((hotel) => (
                        <HotelCard key={hotel._id} hotel={hotel} />
                    ))
                }
            </main>
            {isFilterModalOpen && <Filter />}
            {isAuthModalOpen && <AuthModal />}
        </div>
    );
}

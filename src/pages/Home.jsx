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

export const Home = () => {
    const [hotels, setHotels] = useState([]);
    const { hotelCategory } = useCategory();
    const { isSearchModalOpen } = useDate();
    const { isFilterModalOpen, priceRange, propertyType, isCancelable } = useFilter();
    const { isAuthModalOpen } = useAuth();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`https://travelapp-backend-3hjw.onrender.com/api/hotels?category=${hotelCategory}`);
                console.log(data);
                setHotels(data);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [hotelCategory]);

    const filteredHotelByPrice = hotels.filter(hotel => hotel.price >= priceRange[0] && hotel.price <= priceRange[1]);
    const filteredHotelByPropertyType = propertyType === "Any" ? filteredHotelByPrice : filteredHotelByPrice.filter(hotel => hotel.propertyType === propertyType);
    const filterHotelByIsCancelable = filteredHotelByPropertyType.filter(hotel => hotel.isCancelable === isCancelable);

    return (
        <div className="relative">
            {/* <Navbar /> */}
            <NewNavbar/>
          
            <Categories />
            <main className="flex flex-wrap gap-4 justify-center items-start p-4">
                {filterHotelByIsCancelable && 
                    filterHotelByIsCancelable.map((hotel) => (
                        <HotelCard key={hotel._id} hotel={hotel} />
                    ))
                }
            </main>
           {isFilterModalOpen && <Filter />}
            {isAuthModalOpen && <AuthModal />}
        </div>
    );
}

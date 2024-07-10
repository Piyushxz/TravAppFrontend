import { Categories } from "../components/Categories/Categories";
import { HotelCard } from "../components/HotelCard/HotelCard"
import { Navbar } from "../components/Navbar/Navbar"
import { useCategory } from "../context/category-context";
import { SearchStayWithDate } from "../components/SearchStayWithDate/SearchStayWithDate";
import "./Home.css"
import { useDate } from "../context/date-context";
import axios from "axios";
import { useEffect,useState } from "react";
import { Filter } from "../components/Filter/Filter";
import { useFilter } from "../context/filter-context";
import { AuthModal } from "../components/AuthModal/AuthModal";
import { useAuth } from "../context/auth-context";

export const Home = () =>{
    const [hotels,setHotels] = useState([])
    const {hotelCategory}= useCategory()

    const {isSearchModalOpen} = useDate();
    const {isFilterModalOpen,priceRange,propertyType,filterRating,isCancelable} = useFilter()

    const {isAuthModalOpen} = useAuth()

    useEffect(()=>{
        (async()=>{
            try{
                const {data} = await axios.get(`https://travelapp-backend-cdeh.onrender.com/api/hotels?category=${hotelCategory}`)
                console.log(data)
                setHotels(data)
            }catch(err){
                
            }
        })()
    },[hotelCategory])




    const filteredHotelByPrice = hotels.filter(hotel=> hotel.price >= priceRange[0] && hotel.price<= priceRange[1])
    const filteredHotelByPropertyType = propertyType === "Any" ? filteredHotelByPrice : filteredHotelByPrice.filter(hotel=> hotel.propertyType === propertyType)
    // const filterHotelByRatings = filteredHotelByPropertyType.filter(hotel => hotel.rating > filterRating)
    const filterHotelByIsCancelable = filteredHotelByPropertyType.filter(hotel=>hotel.isCancelable === isCancelable)


  
    return(
        <div className="relative">
        <Navbar/>
        <Categories/>
        <main className="main d-flex align-center wrap gap-larger">
            {
                filterHotelByIsCancelable &&
                filterHotelByIsCancelable.map((hotel)=><HotelCard key={hotel._id} hotel={hotel}/>)
            }
   
        </main>
        {
            isSearchModalOpen && <SearchStayWithDate/>
        }
        {
            isFilterModalOpen && <Filter/>
        }
        {
            isAuthModalOpen && <AuthModal/>
        }
        </div>

    )
}
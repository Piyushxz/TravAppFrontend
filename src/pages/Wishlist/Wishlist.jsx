import { HotelCard } from "../../components/HotelCard/HotelCard"
import Navbar from "../../components/Navbar/Navbar"
import { useWishlist } from "../../context/wishlist-context"
import "./Wishlist.css"
export const Wishlist = ()=>{
    const {wishlist} = useWishlist()
    return(
        <>
        <Navbar/>
        <h1 className="heading-2">Your Wishlist</h1>
        <section className="wishlist-page d-flex align-center wrap gap-larger">
            {
                wishlist && wishlist.map(hotel=> <HotelCard key={hotel._id}hotel={hotel}/>)
            }
        </section>
        </>
    )
}
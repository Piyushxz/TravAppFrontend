import { HotelCard } from "../../components/HotelCard/HotelCard";
import MobileNavbar from "../../components/Navbar/MobileNavbar";
import Navbar from "../../components/Navbar/Navbar";
import { useWishlist } from "../../context/wishlist-context";
import useIsMobile from "../../hooks/isMobile";

export const Wishlist = () => {
    const { wishlist } = useWishlist();
    const mobile = useIsMobile()
    

    return (
        <>
           { mobile ? <MobileNavbar /> : <Navbar />}
            <h1 className="text-3xl md:text-4xl tracking-tight font-manrope font-bold text-center my-4">Your Wishlist</h1>
            <section className="wishlist-page flex flex-wrap justify-center gap-4 p-4 md:p-8 lg:p-12">
                {wishlist && wishlist.map(hotel => (
                    <HotelCard key={hotel._id} hotel={hotel} />
                ))}
            </section>
        </>
    );
};

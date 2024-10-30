import { HotelCard } from "../../components/HotelCard/HotelCard";
import Navbar from "../../components/Navbar/Navbar";
import { useWishlist } from "../../context/wishlist-context";

export const Wishlist = () => {
    const { wishlist } = useWishlist();

    return (
        <>
            <Navbar />
            <h1 className="text-3xl md:text-4xl font-bold text-center my-4">Your Wishlist</h1>
            <section className="wishlist-page flex flex-wrap justify-center gap-4 p-4 md:p-8 lg:p-12">
                {wishlist && wishlist.map(hotel => (
                    <HotelCard key={hotel._id} hotel={hotel} />
                ))}
            </section>
        </>
    );
};

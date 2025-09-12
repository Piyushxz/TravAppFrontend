import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/wishlist-context";
import { findHotelInWishlist } from "../../utils/find-hotel-in-wishlist";
import { useAuth } from "../../context/auth-context";

export const HotelCard = ({ hotel }) => {
    const { _id, name, image, address, state, rating, price } = hotel;
    const navigate = useNavigate();
    const { wishlistDispatch, wishlist } = useWishlist();
    const { accessToken, authDispatch } = useAuth();

    const handleHotelCardClick = () => {
        navigate(`/hotels/${name}/${address}-${state}/${_id}/reserve`);
    };

    const isHotelInWishlist = findHotelInWishlist(wishlist, _id);

    const handleWishlistClick = (e) => {
        e.stopPropagation(); // Prevent triggering the hotel card click event
        if (accessToken) {
            if (!isHotelInWishlist) {
                wishlistDispatch({
                    type: "ADD_TO_WISHLIST",
                    payload: hotel,
                });
                navigate("/wishlist");
            } else {
                wishlistDispatch({
                    type: "REMOVE_FROM_WISHLIST",
                    payload: _id,
                });
            }
        } else {
            authDispatch({
                type: "SHOW_AUTH_MODAL",
            });
        }
    };

    return (
        <div className="relative font-manrope tracking-tigther max-w-xs rounded-lg shadow-lg transition-transform duration-200 transform hover:scale-105 bg-background h-[400px]">
            <div onClick={handleHotelCardClick}>
                <img className="w-full h-60 object-cover rounded-t-lg" src={image} alt={name} />
                <div className="flex flex-col justify-between h-full p-4">
                    <div>
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-base font-manrope tracking-tighter">{address}, {state}</span>
                            <span className="flex items-center">
                                <span className="material-icons-outlined text-yellow-500 text-base">star</span>
                                <span className="ml-1">{rating}</span>
                            </span>
                        </div>
                        <p className="text-sm font-normal py-1 truncate font-manrope tracking-tight ">{name}</p>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">
                        <span className="font-bold font-manrope tracking-tighter">Rs. {price}</span> per night
                    </p>
                </div>
            </div>
            <button
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md focus:outline-none"
                onClick={handleWishlistClick}
            >
                <span
                    className={`material-icons favorite cursor-pointer ${isHotelInWishlist ? "text-red-600" : "text-gray-400"}`}
                    aria-label={isHotelInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                    favorite
                </span>
            </button>
        </div>
    );
};

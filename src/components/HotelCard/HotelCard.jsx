import "./HotelCard.css"
import { useNavigate } from "react-router-dom"
import { useWishlist } from "../../context/wishlist-context"
import { findHotelInWishlist } from "../../utils/find-hotel-in-wishlist"
import { useAuth } from "../../context/auth-context"
export const HotelCard = ({hotel})=>{

    const {_id,name,image,address,state,rating,price} = hotel
    const navigate = useNavigate()

    const {wishlistDispatch,wishlist} = useWishlist()

    const {accessToken,authDispatch} = useAuth();
    console.log({accessToken})

    const handleHotelCardClick = ()=>{
        navigate(`/hotels/${name}/${address}-${state}/${_id}/reserve`)
    }
    const isHotelInWishlist = findHotelInWishlist(wishlist,_id);
   
    const handleWishlistClick = ()=>{
        if(accessToken){
            if(!isHotelInWishlist){
                wishlistDispatch({
                    type:"ADD_TO_WISHLIST",
                    payload :hotel
                })
                navigate("/wishlist")
            }else{
                wishlistDispatch({
                    type:"REMOVE_FROM_WISHLIST",
                    payload:_id,
                })
            }
        }else{
            authDispatch({
                type:"SHOW_AUTH_MODAL"
            })
        }


    }
    console.log({wishlist})

    return(
        <div className="relative hotelcard-container shadow cursor-pointer">
        <div onClick={handleHotelCardClick}>
          <img className="img" src={image} alt={name} />
          <div className="hotelcard-details">
            <div className="d-flex align-center">
              <span className="location">
                {address}, {state}
              </span>
              <span className="rating d-flex align-center">
                <span class="material-icons-outlined">star</span>
                <span>{rating}</span>
              </span>
            </div>
            <p className="hotel-name">{name}</p>
            <p className="price-details">
              <span className="price">Rs. {price}</span>
              <span>night</span>
            </p>
          </div>
        </div>
        <button
          className="button btn-wishlist absolute d-flex align-center"
          onClick={handleWishlistClick}
        >
          <span
            className={`material-icons favorite cursor ${isHotelInWishlist ? "fav-selected" : ""
              }`}
          >
            favorite
          </span>
        </button>
      </div>
    )
}
import "./FinalPrice.css"
import { useDate } from "../../context/date-context"
import { DateSelector } from "../DateSelector/DateSelector"
import { useNavigate } from "react-router-dom"
export const FinalPrice = ({singleHotel}) =>{
    const {_id,price,rating} = singleHotel
    const navigate = useNavigate()

    const {guests,checkinDate,checkOutDate,dateDispatch} = useDate()
    const handleGuestChange = (event) =>{
        dateDispatch({
            type:"GUESTS",
            payload : event.target.value
        })
    }
    const handleReserveClick = ()=>{
        navigate(`/confirm-booking/stay/${_id}`)
    }
    return(
        <div className="price-details-container d-flex direction-column gap shadow">
            <div className=" price-rating d-flex align-center justify-space-between">
                <p><span className="fs-bold fd-large">Rs. {price}</span>night</p>
                <span className="rating d-flex align-center"></span>
                <span className="material-icons-outlined">star</span>
                <span>{rating}</span>
            </div>
            <div className="d-flex direction-column">
                <div className="grid-container-two-col selected-dates">
                    <div className="check-in loc-container">
                        <label className="label">Check in</label>
                        <DateSelector checkInType="in"/>
                    </div>
                    <div className="check-in loc-container">
                        <label className="label">Check in</label>
                        <DateSelector checkInType="out"/>
                    </div>
                </div>
                <div className="guests gutter-sm">
                    <p>Guests</p>
                    {
                        guests <= 0 ?
                        <input placeholder="Add Guests" value={guests} onChange={handleGuestChange} className="guest-count-input" type="number"></input>
                        :
                        <span>{guests} guests</span>
                    }
                   
                </div>
            </div>
            <div>
                <button disabled={checkinDate && checkOutDate && guests > 0 ? false : true }onClick={handleReserveClick}className="button btn-reserve btn-primary cursor">Reserve</button>
            </div>
            <div className="price-distribution d-flex direction-column">
                <div  className="final-price d-flex align-center align-center justify-space-between">
                    <span className="span">Rs. {price} x 2 nights</span>
                    <span className="span"> Rs {price * 2}</span>
                </div>
                <div className="final-price d-flex align-center align-center justify-space-between">
                    <span className="span">Service Fee</span>
                    <span className="span"> Rs 200</span>
                </div>
                <div className="final-price d-flex align-center align-center justify-space-between">
                    <span className="span">Total</span>
                    <span className="span"> Rs Rs. {price * 2 + 200}</span>
                </div>
            </div>
        </div>
    )
}
import { useDate } from "../../context/date-context"
import { DateSelector } from "../DateSelector/DateSelector"
import { useNavigate } from "react-router-dom"

export const FinalPrice = ({ singleHotel }) => {
    const { _id, price, rating } = singleHotel
    const navigate = useNavigate()
    const { guests, checkinDate, checkOutDate, dateDispatch } = useDate()

    const handleGuestChange = (event) => {
        dateDispatch({
            type: "GUESTS",
            payload: event.target.value
        })
    }

    const handleReserveClick = () => {
        navigate(`/confirm-booking/stay/${_id}`)
    }

    return (
        <div className="self-start bg-background px-6 w-full max-w-lg mt-8 shadow rounded">
            <div className="flex justify-between items-center">
                <p>
                    <span className="font-bold  font-manrope tracking-tight text-lg">Rs. {price}</span> per night
                </p>
                <span className="flex items-center">
                    <span className="material-icons-outlined text-yellow-500">star</span>
                    <span className="ml-1">{rating}</span>
                </span>
            </div>
            <div className="flex flex-col mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex flex-col ">
                        <label className="label font-manrope tracking-tight">Check-in</label>
                        <DateSelector  checkInType="in" />
                    </div>
                    <div className="flex flex-col font-manrope tracking-tight ">
                        <label className="label">Check-out</label>
                        <DateSelector checkInType="out" />
                    </div>
                </div>
                <div className="border border-container-border-color p-2 mt-4">
                    <p className="font-manrope tracking-tight">Guests</p>
                    {
                        guests <= 0 ?
                            <input
                                placeholder="Add Guests"
                                value={guests}
                                onChange={handleGuestChange}
                                className="w-full border border-gray-300 p-2 focus:outline-none"
                                type="number"
                            />
                            :
                            <span>{guests} guests</span>
                    }
                </div>
            </div>
            <div>
                <button
                    disabled={checkinDate && checkOutDate && guests > 0 ? false : true}
                    onClick={handleReserveClick}
                    className={`font-manrope tracking-tight w-full p-4 mt-4 bg-primary text-white rounded ${checkinDate && checkOutDate && guests > 0 ? "cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
                >
                    Reserve
                </button>
            </div>
            <div className="flex flex-col mt-4">
                <div className="font-manrope tracking-tight flex justify-between p-2">
                    <span>Rs. {price} x 2 nights</span>
                    <span>Rs {price * 2}</span>
                </div>
                <div className="font-manrope tracking-tight flex justify-between p-2">
                    <span>Service Fee</span>
                    <span>Rs 200</span>
                </div>
                <div className="font-manrope tracking-tight flex justify-between p-2 border-t border-container-border-color">
                    <span>Total</span>
                    <span>Rs {price * 2 + 200}</span>
                </div>
            </div>
        </div>
    )
}

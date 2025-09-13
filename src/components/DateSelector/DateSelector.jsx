import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

import "./DateSelector.css"
import { useDate } from "../../context/date-context";
export const DateSelector =({checkInType})=>{
  const {dateDispatch , checkinDate,checkOutDate} = useDate()

  const handleDateChange = (data) =>{
          dateDispatch({
            type: checkInType === "in" ? "CHECK_IN" : "CHECK_OUT" ,
          payload: data
        })
  }

  const handleDateFocus = () =>{
    dateDispatch({
      type:"DATE_FOCUS"
    })
  }

    return <DatePicker  onFocus={handleDateFocus} selected={checkInType  === "in" ? checkinDate : checkOutDate} onChange={date=>handleDateChange(date)} className="search-dest input" dateFormat = "dd/mm/yyyy" placeholderText="Add dates" closeOnScroll={true}/>
}
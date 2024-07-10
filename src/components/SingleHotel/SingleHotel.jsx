
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import {Navbar} from "../Navbar/Navbar"
import { HotelImages } from "../HotelImages/HotelImages";
import {HotelDetails} from "../HotelDetails/HotelDetails"
import "./SingleHotel.css"
import { FinalPrice } from "../FinalPrice/FinalPrice";
export const SingleHotel = ()=>{

    const {id} = useParams();
    const [singleHotel,setSingleHotel] = useState({})

    useEffect(()=>{
        (async ()=>{
            try{
                const {data} = await axios.get(`https://travelapp-backend-cdeh.onrender.com/api/hotels/${id}`)
                console.log(data)
                setSingleHotel(data)
                
            }
            catch(err){

            }
        })()
    },[id])
    const {city,state} = singleHotel
    return (
        <>
          <Navbar/>
          <main className="single-hotel-page">
            <p className="hotel-name-address">{city},{state}</p>
            <HotelImages singleHotel={singleHotel}/>
            <div className="d-flex">
                <HotelDetails singleHotel={singleHotel}/>
                <FinalPrice singleHotel={singleHotel}/>
            </div>
          </main>
        </>
      
    )
}
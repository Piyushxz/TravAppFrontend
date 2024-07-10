
import { createContext, useContext, useState } from "react";


const initialValue ="National Parks"



const categoryContext = createContext(initialValue)


const CategoryProvider = ({children}) =>{

    const [hotelCategory,setHotelCategory] = useState(initialValue)

    return(
        <categoryContext.Provider value={{hotelCategory,setHotelCategory}}>
            {children}
        </categoryContext.Provider>
    )

}
const useCategory = () => useContext(categoryContext)
export {useCategory , CategoryProvider};
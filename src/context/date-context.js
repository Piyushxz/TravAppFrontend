import { createContext,useContext, useReducer } from "react";
import { dateReducer } from "../reducer/date-reducer";


const initialValue = {
    destination:"",
    guests:"",
    checkinDate : null,
    checkOutDate : null,
    isSearchModalOpen : false,
    isSearchResultOpen : true
}
const DateContext = createContext(initialValue);
const DateProvider = ({children}) =>{

    const [{isSearchResultOpen,guests,destination,checkinDate,checkOutDate,isSearchModalOpen},dateDispatch] = useReducer(dateReducer,initialValue)
    return(
        <DateContext.Provider value={{isSearchResultOpen,guests,destination,checkinDate,checkOutDate,isSearchModalOpen,dateDispatch}}>
            {children}
        </DateContext.Provider>
    )
}

const useDate = () => useContext(DateContext);

export {useDate,DateProvider}
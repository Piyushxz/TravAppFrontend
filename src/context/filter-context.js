import { useContext ,createContext, useReducer} from "react"
import { filterReducer } from "../reducer/filter-reducer"

const initialValue = {
    isFilterModalOpen :false,
    priceRange : [300,20000],
    propertyType:"Any",
    travelRating:1,
    isCancelable:true

}
const FilterContext = createContext(initialValue)


const   FilterProvider = ({children}) =>{

    const [{isCancelable,travelRating,isFilterModalOpen,priceRange,propertyType},filterDispatch] = useReducer(filterReducer,initialValue)
    return(
        <FilterContext.Provider value={{isCancelable,travelRating,propertyType,priceRange,isFilterModalOpen,filterDispatch}}>
            {children}
        </FilterContext.Provider>
    )
}

const useFilter =()=> useContext(FilterContext);

export {useFilter,FilterProvider}
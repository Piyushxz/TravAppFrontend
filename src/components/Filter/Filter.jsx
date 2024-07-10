
import { useFilter } from "../../context/filter-context"
import "./Filter.css"
import { FreeCancel } from "./FreeCancel/FreeCancel"
import { PriceRange } from "./PriceRange/PriceRange"
import { PropertyType } from "./PropertyType/ProperyType"
import { Ratings } from "./Ratings/Ratings"
export const Filter = () =>{


    const {filterDispatch} = useFilter()

    const handleCloseFilterModal = ()=>{
        filterDispatch({
            type:"SHOW_FILTER_MODAL"
        })
    }

    const handleClearFilterClick = ()=>{
        filterDispatch({
            type:"CLEAR_ALL"
        })
    }
    return(
    <div className="filter-modal">
        <div className="filter-page shadow">
            <div className="d-flex align-center justify-space-between">
            <span className="filter-label">Filter</span>
            <button className="btn-close button d-flex align-center justify-center cursor-pointer">
                <span onClick={handleCloseFilterModal}className="material-icons-outlined">close</span>
            </button>
            </div>
            <PriceRange/>
            <PropertyType/>
            <Ratings/>
            <FreeCancel/>
            <div className="d-flex align-center justify-space-between">
                <button className="button cursor btn-link-primary" onClick={handleClearFilterClick}>Clear All</button>
                <button className="button cursor btn-primary btn-apply" onClick={handleCloseFilterModal} >Apply  All</button>
            </div>
            </div>    
    </div>
    
    )
}

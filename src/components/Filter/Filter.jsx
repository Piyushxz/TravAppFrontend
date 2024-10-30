import { useFilter } from "../../context/filter-context";

import { FreeCancel } from "./FreeCancel/FreeCancel";
import { PriceRange } from "./PriceRange/PriceRange";
import { PropertyType } from "./PropertyType/ProperyType";
import { Ratings } from "./Ratings/Ratings";

export const Filter = () => {
    const { filterDispatch } = useFilter();

    const handleCloseFilterModal = () => {
        filterDispatch({
            type: "SHOW_FILTER_MODAL",
        });
    };

    const handleClearFilterClick = () => {
        filterDispatch({
            type: "CLEAR_ALL",
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="filter-page shadow-lg rounded-lg w-11/12 md:w-1/3 max-w-sm p-4 bg-white">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold">Filter</span>
                    <button className="text-gray-600 hover:text-gray-900" onClick={handleCloseFilterModal}>
                        <span className="material-icons-outlined">close</span>
                    </button>
                </div>
                <PriceRange />
               <PropertyType/>
                <Ratings />
                <FreeCancel />
                <div className="flex items-center justify-between mt-4">
                    <button className="text-primary hover:underline" onClick={handleClearFilterClick}>
                        Clear All
                    </button>
                    <button className="bg-primary text-white rounded px-4 py-2 hover:bg-blue-600" onClick={handleCloseFilterModal}>
                        Apply All
                    </button>
                </div>
            </div>
        </div>
    );
};

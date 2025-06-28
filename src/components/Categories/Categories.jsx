import axios from "axios";
import { useEffect, useState } from "react";
import { useCategory } from "../../context/category-context";
import { useFilter } from "../../context/filter-context";
import useIsMobile from "../../hooks/isMobile";

export const Categories = () => {
    const { filterDispatch } = useFilter();
    const [categories, setCategories] = useState([]);
    const [totalCategories, setTotalCategories] = useState([]); // Store all categories
    const [numberofCategoryToShow, setnumberofCategoryToShow] = useState(0);
    const { hotelCategory, setHotelCategory } = useCategory();
    const isMobile = useIsMobile();

    const offset = isMobile ? 4 : 10;
        
    const handleFilterClick = () => {
        filterDispatch({
            type: "SHOW_FILTER_MODAL",
        });
    };

    const handleShowMoreLeftClick = () => {
        setnumberofCategoryToShow((prev) => prev - offset);
    };

    const handleShowMoreRightClick = () => {
        setnumberofCategoryToShow((prev) => prev + offset);
    };

    const handleCategoryClick = (category) => {
        console.log(category);
        setHotelCategory(category);
    };

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("https://travelapp-backend-3hjw.onrender.com/api/category");
                setTotalCategories(data); // Store all categories
                
                if (isMobile) {
                    // On mobile, show all categories for scrolling
                    setCategories(data);
                } else {
                    // On desktop, show paginated categories
                    const categoriesToShow = data.slice(numberofCategoryToShow, numberofCategoryToShow + offset);
                    setCategories(categoriesToShow);
                }
            } catch (err) {
                console.log(err);
            }
        })();
    }, [numberofCategoryToShow, isMobile]);

    return (
        <section className="flex md:pt-[150px] pt-[100px] font-manrope md:flex-row items-center justify-center gap-1 md:gap-4 p-2 md:p-4">
            {/* Left navigation button - hidden on mobile */}
            {!isMobile && numberofCategoryToShow >= offset && (
                <button className="btn-category button btn-left cursor-pointer" onClick={handleShowMoreLeftClick}>
                    <span className="material-icons-outlined">chevron_left</span>
                </button>
            )}

            {/* Categories container */}
            <div className={`flex ${isMobile ? 'overflow-x-auto scrollbar-hide gap-4 px-2' : 'flex-wrap justify-center gap-10'}`}>
                {categories && categories.map(({ category, _id }) => (
                    <span
                        className={`cursor-pointer flex font-manrope tracking-tight text-xs md:text-sm border-b-2 ${
                            isMobile ? 'whitespace-nowrap flex-shrink-0 pb-2' : ''
                        } ${category === hotelCategory ? "border-primary" : "border-transparent"}`}
                        key={_id}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </span>
                ))}
            </div>

            {/* Right navigation button - hidden on mobile */}
            {!isMobile && numberofCategoryToShow + offset < totalCategories.length && (
                <button className="btn-category button btn-right cursor-pointer" onClick={handleShowMoreRightClick}>
                    <span className="material-icons-outlined">chevron_right</span>
                </button>
            )}

            {/* Filter button - hidden on mobile */}
            {!isMobile && (
                <button onClick={handleFilterClick} className="button font-manrope tracking-tight flex items-center gap-2 cursor-pointer">
                    <span className="material-icons-outlined">filter_alt</span>
                    <span>Filter</span>
                </button>
            )}
        </section>
    );
};
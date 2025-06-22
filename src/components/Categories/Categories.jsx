import axios from "axios";
import { useEffect, useState } from "react";
import { useCategory } from "../../context/category-context";
import { useFilter } from "../../context/filter-context";

export const Categories = () => {
    const { filterDispatch } = useFilter();
    const [categories, setCategories] = useState([]);
    const [numberofCategoryToShow, setnumberofCategoryToShow] = useState(0);
    const { hotelCategory, setHotelCategory } = useCategory();

    const handleFilterClick = () => {
        filterDispatch({
            type: "SHOW_FILTER_MODAL",
        });
    };

    const handleShowMoreLeftClick = () => {
        setnumberofCategoryToShow((prev) => prev - 10);
    };

    const handleShowMoreRightClick = () => {
        setnumberofCategoryToShow((prev) => prev + 10);
    };

    const handleCategoryClick = (category) => {
        console.log(category);
        setHotelCategory(category);
    };

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("https://travelapp-backend-3hjw.onrender.com/api/category");
                const categoriesToShow = data.slice(numberofCategoryToShow, numberofCategoryToShow + 10);
                setCategories(categoriesToShow);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [numberofCategoryToShow]);

    return (
        <section className="flex pt-[150px] font-manrope flex-col md:flex-row items-center justify-center gap-4 p-4">
            {numberofCategoryToShow >= 10 && (
                <button className="btn-category button btn-left cursor-pointer" onClick={handleShowMoreLeftClick}>
                    <span className="material-icons-outlined">chevron_left</span>
                </button>
            )}

            <div className="flex flex-wrap justify-center gap-2">
                {categories && categories.map(({ category, _id }) => (
                    <span
                        className={`cursor-pointer font-manrope tracking-tight border-b-2 p-2 ${category === hotelCategory ? "border-primary" : "border-transparent"}`}
                        key={_id}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </span>
                ))}
            </div>

            {numberofCategoryToShow - 10 < categories.length && (
                <button className="btn-category button btn-right cursor-pointer" onClick={handleShowMoreRightClick}>
                    <span className="material-icons-outlined">chevron_right</span>
                </button>
            )}

            <button onClick={handleFilterClick} className="button font-manrope tracking-tight flex items-center gap-2 cursor-pointer">
                <span className="material-icons-outlined">filter_alt</span>
                <span>Filter</span>
            </button>
        </section>
    );
};

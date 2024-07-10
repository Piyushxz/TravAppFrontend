import axios from "axios"
import { useEffect, useState } from "react"
import "./Categories.css"
import { useCategory } from "../../context/category-context"
import { useFilter } from "../../context/filter-context"
export const Categories = () =>{
    const {filterDispatch} = useFilter()
    const [categories ,setCategories] = useState([])
    const [numberofCategoryToShow,setnumberofCategoryToShow]=useState(0);
    const {hotelCategory,setHotelCategory} = useCategory()



    const handleFilterClick = ()=>{
        filterDispatch({
            type:"SHOW_FILTER_MODAL"
        })
    }
    const handleShowMoreLeftClick =()=>{
        setnumberofCategoryToShow(prev => prev-10);
    }
    const handleShowMoreRigthClick =()=>{
        setnumberofCategoryToShow(prev => prev+10)
    }



    const handleCategoryClick = (category)=>{
        console.log(category)
        setHotelCategory(category)

    }

    
    useEffect(()=>{
        (async ()=>{
        try{
        const {data} = await axios.get("https://travelapp-backend-cdeh.onrender.com/api/category")
        const categoriesToShow = data.slice(numberofCategoryToShow,numberofCategoryToShow+10);
        console.log(data)
        setCategories(categoriesToShow)
        }catch(err){
        console.log(err)
        }
    })()
 } ,[numberofCategoryToShow])

    return (
        <section className="categories gap-large d-flex align center gap cursor-pointer">
            {
                numberofCategoryToShow >=10 &&
                <button className="btn-category button btn-left fixed cursor-pointer" onClick={handleShowMoreLeftClick}>
                <span className="material-icons-outlined">
                    chevron_left
                </span>
    
                </button>
            }

            {categories && categories.map(({category,_id})=><span className={`${category === hotelCategory ? "border-bottom ":""}`}
            key={_id} onClick={()=>handleCategoryClick(category)}>{category}</span>)}
            {
                numberofCategoryToShow - 10 < categories.length && 
                <button className="btn-category button btn-right fixed cursor-pointer"onClick={handleShowMoreRigthClick}>
                <span className="material-icons-outlined">
                    chevron_right
                </span>
    
                </button>
            }

            <button  onClick={handleFilterClick}className="button d-flex align-center gap-small cursor-pointer btn-filter fixed">
                <span className="material-icons-outlined">filter_alt</span>
                <span>filter</span>
            </button>

        </section>
    )
}
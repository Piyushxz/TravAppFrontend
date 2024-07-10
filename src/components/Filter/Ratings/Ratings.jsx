import { useFilter } from "../../../context/filter-context"
const ratings = ["1","2","3","4","5"]


export const Ratings = () =>{

    const {filterDispatch} = useFilter()
    const handleRatingsClick = (rating)=>{
        filterDispatch({
            type:"RATING",
            payload:rating
        })
    }
    return (
        <div className="filter-container">
            <span className="filter-label">Star Rating</span>
            <span className="filter-label"></span>
            <div className="d-flex align-center gap">
               {
                ratings.map(rating=>  <span onClick={handleRatingsClick}
                    className="span-label aminity-count star d-flex align-center justify-center cursor-pointer on-hover"
                key={rating}> {rating }&Up</span>)
                }
            </div>
        </div>
    )
}
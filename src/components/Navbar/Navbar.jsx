
import { useDate } from "../../context/date-context"
import "./Navbar.css"
import { useAuth } from "../../context/auth-context"

export const Navbar = () => {
  const {dateDispatch,destination,isSearchModalOpen,checkOutDate,checkinDate,guests} = useDate()
  const {authDispatch} = useAuth()
  const handleSearchClick = () =>{
    dateDispatch({
      type:"OPEN_SEARCH_MODAL",
    })

    console.log("Srach bar clicked :",isSearchModalOpen);
  }


  const handleNavClick = () =>{
    authDispatch({
      type:"SHOW_AUTH_MODAL"
    })
  }
  return (
    <>
    <header className="heading d-flex align-center">
        <h1 className="heading-1">
            <a className="link" href="/">TravApp</a>
        </h1>
      <div className="form-container d-flex align-center cursor-pointer shadow " onClick={handleSearchClick}>
        <span className="form-option">{destination || "Any Where"}</span>
        <span className="border-right-1px"></span>
       
        <span className="form-option">{checkinDate && checkOutDate ? 
          `${checkinDate.toLocaleDateString("en-US",{day :"numeric",month:"short"})} - ${checkOutDate.toLocaleDateString("en-US",{day :"numeric",month:"short"})}`
        : "Any Week"}</span>
        <span className="border-right-1px"></span>

        <span className="form-option">{guests > 0 ? `${guests} guests` : "Add Guests"}</span>
        <span className="search material-icons-outlined">search</span>
      </div>
    <nav className="d-flex align-center gap-large "onClick={handleNavClick}> 
        <ul className="d-flex align-center gap-large">
            <div className='nav d-flex align-center cursor-pointer'>
            <span className="material-icons-outlined profile-option menu">
            menu
          </span>
          <span className="material-icons-outlined profile-option person">
            person_2
          </span>
            </div>
        </ul>
    </nav>
</header>
    </>
  )
}



export default Navbar;

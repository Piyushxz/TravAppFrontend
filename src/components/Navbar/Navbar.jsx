import { useDate } from "../../context/date-context";
import { useAuth } from "../../context/auth-context";

export const Navbar = () => {
  const { dateDispatch, destination, isSearchModalOpen, checkOutDate, checkinDate, guests } = useDate();
  const { authDispatch } = useAuth();

  const handleSearchClick = () => {
    dateDispatch({ type: "OPEN_SEARCH_MODAL" });
    console.log("Search bar clicked:", isSearchModalOpen);
  };

  const handleNavClick = () => {
    authDispatch({ type: "SHOW_AUTH_MODAL" });
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b-2 border-containerBorder md:p-6 w-full">
      <h1 className="text-2xl font-bold">
        <a className="text-primary" href="/">TravApp</a>
      </h1>

      
      <div className="flex-grow flex justify-center">
        <div className="w-full max-w-md"> 
         
          <div className="flex items-center space-x-4 p-2 rounded-lg cursor-pointer shadow hover:shadow-lg transition bg-gray-100 md:hidden" onClick={handleSearchClick}>
            <span className="text-gray-700">{destination || "Any Where"}</span>
            <span className="w-px h-6 bg-gray-300"></span>
            <span className="text-gray-700">
              {checkinDate && checkOutDate
                ? `${checkinDate.toLocaleDateString("en-US", { day: "numeric", month: "short" })} - ${checkOutDate.toLocaleDateString("en-US", { day: "numeric", month: "short" })}`
                : "Any Week"}
            </span>
            <span className="w-px h-6 "></span>
            <span className="text-gray-700">{guests > 0 ? `${guests} guests` : "Add Guests"}</span>
            <span className="material-icons-outlined text-gray-500">search</span>
          </div>

       
          <div className="hidden md:flex items-center space-x-4 p-2 bg-gray-100 rounded-lg cursor-pointer shadow hover:shadow-lg transition" onClick={handleSearchClick}>
            <span className="text-gray-700">{destination || "Any Where"}</span>
            <span className="w-px h-6 "></span>
            <span className="text-gray-700">
              {checkinDate && checkOutDate
                ? `${checkinDate.toLocaleDateString("en-US", { day: "numeric", month: "short" })} - ${checkOutDate.toLocaleDateString("en-US", { day: "numeric", month: "short" })}`
                : "Any Week"}
            </span>
            <span className="w-px h-6 "></span>
            <span className="text-gray-700">{guests > 0 ? `${guests} guests` : "Add Guests"}</span>
            <span className="material-icons-outlined text-white bg-primary">search</span>
          </div>
        </div>
      </div>

      <nav className="flex items-center cursor-pointer" onClick={handleNavClick}>
        <div className="flex items-center">
          <span className="material-icons-outlined text-gray-500">menu</span>
          <span className="material-icons-outlined text-gray-500">person_2</span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

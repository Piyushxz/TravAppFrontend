import { useDate } from "../../context/date-context";
import { useAuth } from "../../context/auth-context";
import { Tabs } from "./Tabs";
import { SearchBar } from "../SearchBar/SearchBar";

export const NewNavbar = () => {
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
      <h1 className="text-xl md:text-2xl font-manrope tracking-tigther font-bold">
        <a className="text-primary" href="/">TravO</a>
      </h1>

      <div className="flex-grow flex justify-center">
        <div className="">
          {/* <div
            className="flex items-center flex-wrap md:flex-nowrap justify-between p-2 md:p-3 bg-gray-100 rounded-lg shadow hover:shadow-lg transition cursor-pointer mx-2 "
            onClick={handleSearchClick}
          >
            <span className="text-gray-700 text-xs md:text-sm">{destination || "Any Where"}</span>
            <span className="hidden md:block w-px h-5 bg-gray-300"></span>
            <span className="text-gray-700 text-xs md:text-sm">
              {checkinDate && checkOutDate
                ? `${checkinDate.toLocaleDateString("en-US", { day: "numeric", month: "short" })} - ${checkOutDate.toLocaleDateString("en-US", { day: "numeric", month: "short" })}`
                : "Any Week"}
            </span>
            <span className="hidden md:block w-px h-5 bg-gray-300"></span>
            <span className="text-gray-700 text-xs md:text-sm">{guests > 0 ? `${guests} guests` : "Add Guests"}</span>
            <span className="material-icons-outlined text-gray-500 bg-primary text-white p-1 md:p-2 rounded-full text-xs md:text-base">search</span>
          </div> */}
          {/* <Tabs/> */}
          <SearchBar/>

        </div>
      </div>

      <nav className="flex items-center cursor-pointer" onClick={handleNavClick}>
        <div className="flex items-center">
          <span className="material-icons-outlined text-gray-500 text-sm md:text-base">menu</span>
          <span className="material-icons-outlined text-gray-500 text-sm md:text-base">person_2</span>
        </div>
      </nav>
    </header>
  );
};

export default NewNavbar;

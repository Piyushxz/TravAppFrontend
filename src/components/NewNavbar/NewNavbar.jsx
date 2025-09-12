import { useDate } from "../../context/date-context";
import { useAuth } from "../../context/auth-context";
import { Tabs } from "./Tabs";
import { SearchBar } from "../SearchBar/SearchBar";
import { useCategory } from "../../context/category-context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MobileNavbar from "../Navbar/MobileNavbar";
import useIsMobile from "../../hooks/isMobile";

export const NewNavbar = () => {
  const { authDispatch, isAuthModalOpen } = useAuth();
  const { dateDispatch, destination, isSearchModalOpen, checkOutDate, checkinDate, guests } = useDate();
  const mobile = useIsMobile();
  const navigate = useNavigate();

  const handleNavClick = () => {
    authDispatch({ type: "SHOW_AUTH_MODAL" });
  };

  const handleSearchClick = () => {
    dateDispatch({ type: "OPEN_SEARCH_MODAL" });
    console.log("Search bar clicked:", isSearchModalOpen);
  };


  // Render mobile navbar for mobile devices
  if (mobile) {
    return <MobileNavbar />;
  }

  return (
    <header className="flex z-10 fixed items-center justify-between p-4 bg-white border-b border-containerBorder md:p-6 w-full">
      <h1 className="text-xl md:text-2xl font-manrope tracking-tigther font-bold">
        <a className="text-primary" href="/">TravO</a>
      </h1>

      <div className="flex-grow flex justify-center">
        <div className="">
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

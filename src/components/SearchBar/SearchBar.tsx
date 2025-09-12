import React, { useState, useEffect } from "react";
import { ImageIcon, MinusIcon, PlusIcon, SearchIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";
import { useRef } from "react";
import { useCategory } from "../../context/category-context";
import { useNavigate } from "react-router-dom";
import { useDate } from "../../context/date-context";
import axios from "axios";
import { Calendar } from "../Calender";

export function SearchBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckInDateModalOpen, setIsCheckInDateModalOpen] = useState(false);
  const [isCheckOutDateModalOpen, setIsCheckOutDateModalOpen] = useState(false);
  const [isAddGuestsModalOpen, setIsAddGuestsModalOpen] = useState(false);
  const [isInitialTabOpen, setIsInitialTabOpen] = useState(false);
  const [initialTabOpen, setInitialTabOpen] = useState(null);
  const [activeTab, setActiveTab] = useState(null); // New state for active tab
  const modalRef = useRef(null);
  const [ref, { width, height }] = useMeasure();
  const searchbarRef = useRef(null);
  const { dateDispatch, destination, isSearchModalOpen, checkOutDate, checkinDate, guests } = useDate();
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 5, 12)
  )
  const [adultCount, setAdultCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);

  const { hotelCategory } = useCategory() as any ;
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();
  
      useEffect(() => {
          (async () => {
              try {
                  const { data } = await axios.get(`https://travelapp-backend-3hjw.onrender.com/api/hotels?category=${hotelCategory}`);
                  setHotels(data);
              } catch (err) {
                  console.error("Error fetching hotels:", err);
              }
          })();
      }, [hotelCategory]);

  const handleSearchClick = () => {
    dateDispatch({ type: "OPEN_SEARCH_MODAL" });
    console.log("Search bar clicked:", isSearchModalOpen);
  };

  const handleDestinationChange = (e) => {
    dateDispatch({
        type: "DESTINATION",
        payload: e.target.value
    });
};

const handleGuestChange = (type, increment) => {
    let newAdultCount = adultCount;
    let newChildrenCount = childrenCount;
    let newInfantCount = infantCount;
    
    if (type === 'adults') {
        newAdultCount = increment ? adultCount + 1 : Math.max(1, adultCount - 1);
        setAdultCount(newAdultCount);
    } else if (type === 'children') {
        newChildrenCount = increment ? childrenCount + 1 : Math.max(0, childrenCount - 1);
        setChildrenCount(newChildrenCount);
    } else if (type === 'infants') {
        newInfantCount = increment ? infantCount + 1 : Math.max(0, infantCount - 1);
        setInfantCount(newInfantCount);
    }
    
    const totalGuests = newAdultCount + newChildrenCount + newInfantCount;
    dateDispatch({
        type: "GUESTS",
        payload: totalGuests
    });
};

const handleSearchResultClick = (address) => {
    dateDispatch({
        type: "DESTINATION",
        payload: address
    });
    // Move to next tab (Check In)
    setActiveTab("checkInTab");
};

const destinationOptions = hotels.filter(({ address, city, state, country }) =>
    address.toLowerCase().includes(destination.toLowerCase()) ||
    city.toLowerCase().includes(destination.toLowerCase()) ||
    state.toLowerCase().includes(destination.toLowerCase()) ||
    country.toLowerCase().includes(destination.toLowerCase())
);

const handleDestinationFocus = () => {
    dateDispatch({
        type: "SHOW_SEARCH_RESULT",
    });
};

const handleSearchButtonClick = () => {
    dateDispatch({
        type: "CLOSE_SEARCH_MODAL",
    });
    navigate(`/hotels/${destination}`);
};

const handleCloseModal = () => {
    dateDispatch({
        type: "OPEN_SEARCH_MODAL"
    });
};

  // Reset isInitialTabOpen after first animation
  useEffect(() => {
    if (isInitialTabOpen) {
      const timeout = setTimeout(() => {
        setIsInitialTabOpen(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isInitialTabOpen]);

  console.log(hotels,22)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        searchbarRef.current &&
        !searchbarRef.current.contains(event.target)
      ) {
        // Reset state to close modal
        setInitialTabOpen(null);
        setActiveTab(null); // Reset active tab
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTabClick = (tabName, tabNumber) => {
    setActiveTab(tabName); // Set active tab for animation
    if (!initialTabOpen) {
      setInitialTabOpen(tabName);
      setIsInitialTabOpen(true);
    }
  };

  return (
    <>
      <div onClick={()=>{}}  ref={searchbarRef} className={`relative font-manrope tracking-tight border w-[700px] h-14 rounded-full bg-white shadow-xl flex items-center justify-between overflow-hidden`}>
        <div className={`border flex items-center justify-between w-full relative ${activeTab ? "bg-gray-200 ": " bg-white "} rounded-full transition-colors ease-in-out duration-400`}>
          {/* Where */}
          <div className="relative">
            <div
              className={`${activeTab ? " hover:bg-gray-300 " : " hover:bg-gray-100 "} rounded-full cursor-pointer py-2.5 px-4 relative`}
              onClick={() => handleTabClick("whereTab", 1)}
            >
              {activeTab === "whereTab" && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 z-0 bg-white rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className="relative z-10 w-32">
                <h5 className="text-xs tracking-tight text-black">Where</h5>
                <h5 className="text-sm tracking-tight text-gray-400 truncate">
                  {destination || "Search Destinations"}
                </h5>
              </div>
            </div>
          </div>

          <div className="border-l h-6 border-gray-300"></div>

          {/* Check In */}
          <div className="relative">
            <div
              onClick={() => handleTabClick("checkInTab", 2)}
              className={`${activeTab ? " hover:bg-gray-300 " : " hover:bg-gray-100 "}rounded-full cursor-pointer py-2.5 px-4 relative`}
            >
              {activeTab === "checkInTab" && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 z-0 bg-white rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className="relative z-10 w-24">
                <h5 className="text-xs tracking-tight text-black">Check In</h5>
                <h5 className="text-sm tracking-tight text-gray-400 truncate">
                  {checkinDate ? checkinDate.toLocaleDateString("en-US", { day: "numeric", month: "short" }) : "Add Dates"}
                </h5>
              </div>
            </div>
          </div>

          <div className="border-l h-6 border-gray-300"></div>

          {/* Check Out */}
          <div className="relative">
            <div
              onClick={() => handleTabClick("checkOutTab", 3)}
              className={`${activeTab ? "hover:bg-gray-300" : " hover:bg-gray-100"} rounded-full cursor-pointer py-2.5 px-4 relative`}
            >
              {activeTab === "checkOutTab" && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 z-0 bg-white rounded-full border"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className="relative z-10 w-24">
                <h5 className="text-xs tracking-tight text-black">Check Out</h5>
                <h5 className="text-sm tracking-tight text-gray-400 truncate">
                  {checkOutDate ? checkOutDate.toLocaleDateString("en-US", { day: "numeric", month: "short" }) : "Add Dates"}
                </h5>
              </div>
            </div>
          </div>

          <div className="border-l h-6 border-gray-300"></div>

          {/* Who */}
          <div className="relative">
            <div
              onClick={() => handleTabClick("guestTab", 4)}
              className={`${activeTab ? " hover:bg-gray-300 " : " hover:bg-gray-100 "} rounded-full cursor-pointer py-2 pl-4 flex items-center justify-between relative`}
            >
              {activeTab === "guestTab" && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 z-0 bg-white rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className={`mr-20 relative z-10 w-24`}>
                <h5 className="text-xs tracking-tight text-black">Who</h5>
                <h5 className="text-sm tracking-tight text-gray-400 truncate">
                  {guests ? `${guests} guests` : "Add guests"}
                </h5>
              </div>

              <motion.div 
              layout
              className="p-2 bg-orange-400 rounded-full cursor-pointer mr-2 relative z-10 flex">
                <SearchIcon className="text-white" />
        </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Section */}
     
            <motion.div
            layout
            className="absolute z-50 top-[90px]" ref={modalRef}>
        
        <AnimatePresence mode="wait">
               <div ref={ref}>
            <motion.div 
              layout
              transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
            >
              {/* Where Tab */}

            
              {activeTab === "whereTab" && (
            <motion.div
              layoutId="modal"
              key={"whereTab"}
              exit={{ opacity: 0}}
              initial={
                isInitialTabOpen
                  ? { scaleY: 0.5, scaleX: 0.1, opacity: 0 }
                  : false
              }
              animate={{ scaleY: 1, scaleX: 1, opacity: 1, }}
              transition={{ type: "spring", duration: 0.5, ease: "easeInOut", bounce: 0 }}
              className="bg-white origin-top border rounded-2xl shadow-md w-96 h-96 absolute left-4 flex flex-col"
            >
              <div className="w-full font-manrope tracking-tight overflow-y-auto flex-1 px-2 py-2 ">
              {hotels.map((hotel, index) => (
              <div 
                key={index} 
                onClick={() => handleSearchResultClick(`${hotel.city}, ${hotel.country}`)}
                className="flex gap-2 mx-2 my-2 p-2 rounded-md hover:bg-black/10 transition-colors ease-in cursor-pointer"
              >
                <div className="min-w-[110px] h-[70px] rounded-md overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center relative">
                  <img
                    src={hotel.image}
                    className="w-full h-full object-cover rounded-md"
                    alt={hotel.city}
                    onError={(e) => {
                      //@ts-ignore
                      e.target.style.display = 'none';
                      //@ts-ignore
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <ImageIcon 
                    className="w-8 h-8 text-gray-400 absolute inset-0 m-auto hidden"
                  />
                </div>
                <div className="flex flex-col justify-center pb-4">
                  <h3 className="text-sm font-manrope font-semibold text-black">{hotel.city}, {hotel.country}</h3>
                  <h4 className="text-sm font-manrope text-black/60">{hotel.name}</h4>
                </div>
              </div>
            ))}
              </div>
            </motion.div>
          )}
             



             
                              {/* Check In Tab */}
              {activeTab === "checkInTab" && (
                <motion.div
                  layoutId="modal"
                  key={"checkInTab"}
                  initial={
                    isInitialTabOpen
                      ? { scaleY: 0.5, scaleX: 0.1, opacity: 0 }
                      : false
                  }
                  animate={{ scaleY: 1, scaleX: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.5, ease: "easeInOut", bounce: 0 }}
                  className="bg-white origin-top border rounded-2xl shadow-md w-[700px]  z-50 h-90 absolute"
                >
                <Calendar
                      mode="single"
                      defaultMonth={checkinDate || date}
                      numberOfMonths={2}
                      selected={checkinDate || date}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        if (selectedDate) {
                          dateDispatch({
                            type: "CHECK_IN",
                            payload: selectedDate
                          });
                        }
                      }}
                      disabled={{ before: new Date() }}
                      className="rounded-lg font-manrope tracking-tight border shadow-sm w-[100%] h-[100%] pb-6"
                    />

                </motion.div>
              )}
       

                              {/* Check Out Tab */}
              {activeTab === "checkOutTab" && (
                <motion.div
                  layoutId="modal"
                  key={"checkOutTab"}
                  initial={
                    isInitialTabOpen
                      ? { scaleY: 0.5, scaleX: 0.1, opacity: 0 }
                      : false
                  }
                  animate={{ scaleY: 1, scaleX: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.5, ease: "easeInOut", bounce: 0 }}
                  className="bg-white origin-top border rounded-2xl shadow-md w-[700px] h-90  absolute z-50"
                >
                <Calendar
                      mode="single"
                      defaultMonth={checkOutDate || date}
                      numberOfMonths={2}
                      selected={checkOutDate || date}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        if (selectedDate) {
                          dateDispatch({
                            type: "CHECK_OUT",
                            payload: selectedDate
                          });
                        }
                      }}
                      disabled={{ before: new Date() }}
                      className="rounded-lg font-manrope tracking-tight border shadow-sm w-[100%] h-[100%] pb-6"
                    />
                </motion.div>
              )}
    


              
                              {/* Guest Tab */}
              {activeTab === "guestTab" && (
                <motion.div
                  layoutId="modal"
                  key={"guestTab"}
                  initial={
                    isInitialTabOpen
                      ? { scaleY: 0.5, scaleX: 0.1, opacity: 0 }
                      : false
                  }
                  animate={{ scaleY: 1, scaleX: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.5, ease: "easeInOut", bounce: 0 }}
                  className="bg-white origin-top border rounded-2xl shadow-md w-80  absolute z-50 left-[370px]"
                >

                <div className="p-6 flex flex-col">
                  <div className="flex justify-between items-center">
                    <div className=" flex flex-col">
                      <h4 className="text-md font-manrope tracking-tight text-black font-semibold">Adults</h4>
                      <h5 className="text-sm font-manrope tracking-tight text-gray-600">Age 13 or Above</h5>
                    </div>
                    <div className="flex items-center ">
                      <button 
                        onClick={() => handleGuestChange('adults', false)}
                        className="rounded-full p-2 border border-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        <MinusIcon className="size-4 text-gray-600"/>
                      </button>
                      <span className="text-lg font-semibold text-black min-w-[2rem] text-center">
                        {adultCount}
                      </span>
                      <button 
                        onClick={() => handleGuestChange('adults', true)}
                        className="rounded-full p-2 border border-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        <PlusIcon className="size-4 text-gray-600"/>
                      </button>
                    </div>
                  </div>
                  <div className="w-[100%] border bg-gray-600 my-4"></div>

                  <div className="flex justify-between items-center">
                    <div className="font-manrope tracking-tight flex flex-col">
                      <h4 className="text-md font-manrope tracking-tight text-black font-semibold">Children</h4>
                      <h5 className="text-sm font-manrope tracking-tight text-gray-600">Age 2-12</h5>
                    </div>
                    <div className="flex items-center ">
                      <button 
                        onClick={() => handleGuestChange('children', false)}
                        className="rounded-full p-2 border border-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        <MinusIcon className="size-4 text-gray-600"/>
                      </button>
                      <span className="text-lg font-semibold text-black min-w-[2rem] text-center">
                        {childrenCount}
                      </span>
                      <button 
                        onClick={() => handleGuestChange('children', true)}
                        className="rounded-full p-2 border border-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        <PlusIcon className="size-4 text-gray-600"/>
                      </button>
                    </div>
                  </div>
                  <div className="w-[100%] border bg-gray-600 my-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="font-manrope tracking-tight flex flex-col">
                      <h4 className="text-md font-manrope tracking-tight text-black font-semibold">Infants</h4>
                      <h5 className="text-sm font-manrope tracking-tight text-gray-600">Age 0-2</h5>
                    </div>
                    <div className="flex items-center ">
                      <button 
                        onClick={() => handleGuestChange('infants', false)}
                        className="rounded-full p-2 border border-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        <MinusIcon className="size-4 text-gray-600"/>
                      </button>
                      <span className="text-lg font-semibold text-black min-w-[2rem] text-center">
                        {infantCount}
                      </span>
                      <button 
                        onClick={() => handleGuestChange('infants', true)}
                        className="rounded-full p-2 border border-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        <PlusIcon className="size-4 text-gray-600"/>
                      </button>
                    </div>
                  </div>
                </div>
                </motion.div>
              )}
            

            </motion.div>
          </div>
        </AnimatePresence>
     
       
      </motion.div>
    </>
  );
}
import React, { useEffect, useState } from 'react';
import { Search, Compass, Heart, User, CrossIcon, Cross, X, ImageIcon, SearchIcon, ChevronDown, MinusIcon, PlusIcon } from 'lucide-react';
import {motion} from "motion/react"
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useCategory } from '../../context/category-context';
import { useDate } from '../../context/date-context';
import { useAuth } from '../../context/auth-context';
import { Calendar } from '../Calender';
import { UserProfile } from '../UserProfile/UserProfile';

const MobileNavbar = () => {
  const [isMobileSearchModalOpen, setIsMobileSearchModalOpen] = useState(false);
  const [isHotelModalOpen,setIsHotelModalOpen] = useState(true)
  const [isDateModalOpen,setIsDateModalOpen] = useState(false)
  const [isGuestModalOpen,setIsGUestModalOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [activeTab, setActiveTab] = useState('explore');
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null,
  });
  const [hotels, setHotels] = useState([]);
  const [searchDestination, setSearchDestination] = useState('');
  const [adultCount, setAdultCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { hotelCategory } = useCategory();
  const { dateDispatch, destination, checkOutDate, checkinDate, guests } = useDate();
  const { authDispatch, accessToken } = useAuth();
    
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

  // Handle destination selection
  const handleDestinationSelect = (hotel) => {
    const fullDestination = `${hotel.city}, ${hotel.country}`;
    setSearchDestination(fullDestination);
    dateDispatch({
      type: "DESTINATION",
      payload: fullDestination
    });
  };

  // Handle date selection
  const handleDateSelect = (range) => {
    setDateRange(range);
    if (range?.from) {
      dateDispatch({
        type: "CHECKIN_DATE",
        payload: range.from
      });
    }
    if (range?.to) {
      dateDispatch({
        type: "CHECKOUT_DATE",
        payload: range.to
      });
    }
  };

  // Handle guest count changes
  const handleGuestChange = (type, increment) => {
    if (type === 'adults') {
      const newCount = increment ? adultCount + 1 : Math.max(1, adultCount - 1);
      setAdultCount(newCount);
    } else if (type === 'children') {
      const newCount = increment ? childrenCount + 1 : Math.max(0, childrenCount - 1);
      setChildrenCount(newCount);
    } else if (type === 'infants') {
      const newCount = increment ? infantCount + 1 : Math.max(0, infantCount - 1);
      setInfantCount(newCount);
    }
    
    const totalGuests = adultCount + childrenCount + infantCount;
    dateDispatch({
      type: "GUESTS",
      payload: totalGuests
    });
  };

  // Handle search button click
  const handleSearchClick = () => {
    if (searchDestination) {
      navigate(`/hotels/${searchDestination}`);
      setIsMobileSearchModalOpen(false);
    }
  };

  // Handle wishlist click
  const handleWishlistClick = () => {
    if (accessToken) {
      setActiveTab('wishlist');
      navigate('/wishlist');
    } else {
      authDispatch({ type: "SHOW_AUTH_MODAL" });
    }
  };

  // Handle explore click
  const handleExploreClick = () => {
    setActiveTab('explore');
    navigate('/search');
  };

  // Handle auth modal
  const handleAuthClick = () => {
    if (accessToken) {
      // User is logged in, show profile modal
      setActiveTab('profile');
      setIsProfileOpen(true);
    } else {
      // User is not logged in, show auth modal
      authDispatch({ type: "SHOW_AUTH_MODAL" });
    }
  };

  // Set active tab based on current location
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setActiveTab('explore');
    } else if (path === '/wishlist') {
      setActiveTab('wishlist');
    } else {
      setActiveTab('explore'); // Default to explore for other routes
    }
  }, [location.pathname]);

  useEffect(()=>{
    if (isMobileSearchModalOpen) {
      setHasAnimated(false);
    }
    return()=>{
      setIsHotelModalOpen(true)
      setIsDateModalOpen(false)
      setIsGUestModalOpen(false)
      setHasAnimated(false);
    }
  },[isMobileSearchModalOpen])

  return (
    <>
      {isMobileSearchModalOpen ? (
        <div className="fixed inset-0 z-20 bg-white w-screen h-[100vh] p-4">
          {/* Search Modal Content */}
          <div className="flex  justify-end">
        
        <button className='p-2 shadow-lg rounded-full bg-white border'>
        <X onClick={() => setIsMobileSearchModalOpen(false)} className="text-sm text-black ">Close</X>
        </button>
           
          </div>
        <section className='mt-4 mb-2 w-full flex flex-col gap-2'>
        {
    isHotelModalOpen ?
        <motion.div
  initial={hasAnimated ? false : { y: '-80px', opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5, ease: "easeIn", type: 'spring', bounce: 0 }}
  onAnimationComplete={() => setHasAnimated(true)}
  className='w-full h-[50vh] rounded-2xl border shadow-lg overflow-hidden flex flex-col'
>
 
  {/* Header and Search */}
  <div className='flex flex-col gap-2 px-4 py-2'>
    <h3 className='text-3xl font-bold font-manrope tracking-tighter text-black py-2'>Where?</h3>
    <div className="relative w-full">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input 
        type="text"
        placeholder="Search destination"
        value={searchDestination}
        onChange={(e) => setSearchDestination(e.target.value)}
        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 tracking-tighter text-sm focus:border-transparent text-gray-700 placeholder-gray-400"
      />
    </div>
  </div>

  {/* Scrollable Hotels List */}
  <div className="w-full flex-1 overflow-y-auto px-2 font-manrope tracking-tight">
    {hotels
      .filter(({ address, city, state, country }) =>
        address.toLowerCase().includes(searchDestination.toLowerCase()) ||
        city.toLowerCase().includes(searchDestination.toLowerCase()) ||
        state.toLowerCase().includes(searchDestination.toLowerCase()) ||
        country.toLowerCase().includes(searchDestination.toLowerCase())
      )
      .map((hotel, index) => (
      <div
        key={index}
        onClick={() => handleDestinationSelect(hotel)}
        className="flex gap-1 mx-2 my-2 p-2 rounded-md hover:bg-black/10 transition-colors ease-in cursor-pointer"
      >
        <div className="min-w-[110px] h-[70px] rounded-md flex-shrink-0 bg-gray-100 flex items-center justify-center relative">
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
          <ImageIcon className="w-8 h-8 text-gray-400 absolute inset-0 m-auto hidden" />
        </div>
        <div className="flex flex-col justify-center pb-4">
          <h3 className="text-sm font-manrope font-semibold text-black">
            {hotel.city}, {hotel.country}
          </h3>
          <h4 className="text-sm font-manrope text-black/60">
            {hotel.name}
          </h4>
        </div>
      </div>
    ))}
  </div>

  {/* Fixed Bottom Bar */}
  <div className="border-t  bg-neutral-750 backdrop-blur-sm bg-white mx-4">
    <button className="w-full  rounded-lg text-sm font-semibold  flex justify-center">
      <ChevronDown className='text-black/30 text-sm'/>
    </button>
  </div>
  

</motion.div>
:
<div onClick={()=>{setIsHotelModalOpen(true)
  setIsDateModalOpen(false)
  setIsGUestModalOpen(false)
}} className='w-full h-[10vh] rounded-2xl border shadow-lg flex justify-between py-5 px-3 cursor-pointer hover:bg-gray-50 transition-colors'>
  <h3 className="text-sm text-black/30 tracking-tighter font-semibold">Where</h3>
  <Search className="w-5 h-5 text-gray-500 mr-3" />
</div>
}


      {
        isDateModalOpen ? 
        <div className='w-full h-[50vh] rounded-2xl border shadow-lg overflow-hidden flex flex-col !ov
        erflow-y-auto gap-2 px-1 '>
              <h3 className='text-3xl font-bold font-manrope tracking-tighter text-black py-2 px-4'> When?</h3>
    <Calendar
      mode="range"
      defaultMonth={dateRange?.from ?? new Date()}
      numberOfMonths={3} 
      selected={dateRange}
      onSelect={handleDateSelect}
      disabled={{ before: new Date() }}
      className="rounded-lg font-manrope tracking-tight border shadow-sm w-full h-full pb-6"
    />
        </div>
        :
        <motion.div onClick={()=>{setIsHotelModalOpen(false)
          setIsDateModalOpen(true)
          setIsGUestModalOpen(false)
        }} initial={hasAnimated ? false : {y:'-80px',opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.5,ease:"easeIn",delay:0.15,type:'spring',bounce:0}} className='w-full h-[10vh] rounded-2xl border shadow-lg flex justify-between py-5 px-3 cursor-pointer hover:bg-gray-50 transition-colors'>
        <h3 className='text-sm text-black/30 tracking-tighter font-semibold'>When</h3>
        <h3 className='text-sm text-black tracking-tighter '>Add Dates</h3>
        </motion.div>
      }

      {
        isGuestModalOpen ?
        <div className='w-full h-[50vh] rounded-2xl border shadow-lg overflow-hidden flex flex-col'>
                   <h3 className='text-3xl font-bold font-manrope tracking-tighter text-black py-2 px-4'> Who?</h3>
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

        </div>
        :
                  <motion.div  onClick={()=>{setIsHotelModalOpen(false)
                    setIsDateModalOpen(false)
                    setIsGUestModalOpen(true)
                  }}  initial={hasAnimated ? false : {y:'-80px',opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.5,ease:"easeIn",delay:0.25,type:'spring',bounce:0}}  className='w-full h-[10vh] rounded-2xl border shadow-lg flex justify-between py-6 px-3 cursor-pointer hover:bg-gray-50 transition-colors'>
                  <h3 className=' text-sm text-black/30 tracking-tighter font-semibold'>Who</h3>
                  <h3 className=' text-sm text-black tracking-tighter '>Add Guests</h3>
                  </motion.div>
        
      }

        </section>
        <div className='flex justify-end mt-10'>
          <motion.button  
            onClick={handleSearchClick}
            initial={hasAnimated ? false : {y:'80px',opacity:0}} 
            animate={{y:0,opacity:1}} 
            transition={{duration:0.5,ease:"easeIn",delay:0.3,type:'spring',bounce:0}} 
            className='py-2 px-4 shadow-lg rounded-md border flex !bg-orange-400 gap-2 items-center'
          >
            <Search className="text-xs text-white" />
            <h5 className='text-sm font-semibold font-manrope tracking-tighter text-white'>Search</h5>
          </motion.button>
        </div>
        </div>
      ) : (
        <div className="w-full max-w-sm mx-auto bg-white">
          {/* Top Navbar */}
          <div className="px-4 py-3 border-b border-gray-200 top-0 fixed left-0 w-full z-10 bg-white">
            <div
              onClick={() => setIsMobileSearchModalOpen(true)}
              className="flex items-center justify-center bg-gray-100 rounded-full px-4 py-3 cursor-pointer"
            >
              <Search className="w-5 h-5 text-gray-500 mr-3" />
              <span className="text-gray-500 text-sm">Start your search</span>
            </div>
          </div>

          {/* Bottom Navbar */}
          <div className="border-t border-gray-200 bg-white bottom-0 left-0 z-10 w-full fixed">
            <div className="flex justify-around">
              {/* Explore */}
              <button 
                onClick={handleExploreClick}
                className={`flex flex-col items-center py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors ${
                  activeTab === 'explore' ? 'text-orange-500' : 'text-gray-600'
                }`}
              >
                <Compass className={`w-6 h-6 mb-1 ${activeTab === 'explore' ? 'text-orange-500' : 'text-gray-600'}`} />
                <span className={`text-xs ${activeTab === 'explore' ? 'text-orange-500' : 'text-gray-600'}`}>Explore</span>
              </button>

              {/* Wishlist */}
              <button 
                onClick={handleWishlistClick}
                className={`flex flex-col items-center py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors ${
                  activeTab === 'wishlist' ? 'text-orange-500' : 'text-gray-600'
                }`}
              >
                <Heart className={`w-6 h-6 mb-1 ${activeTab === 'wishlist' ? 'text-orange-500' : 'text-gray-600'}`} />
                <span className={`text-xs ${activeTab === 'wishlist' ? 'text-orange-500' : 'text-gray-600'}`}>Wishlist</span>
              </button>

              {/* Login/Profile */}
              <button 
                onClick={handleAuthClick}
                className={`flex flex-col items-center py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors ${
                  activeTab === 'profile' ? 'text-orange-500' : 'text-gray-600'
                }`}
              >
                <User className={`w-6 h-6 mb-1 ${activeTab === 'profile' ? 'text-orange-500' : 'text-gray-600'}`} />
                <span className={`text-xs ${activeTab === 'profile' ? 'text-orange-500' : 'text-gray-600'}`}>
                  {accessToken ? 'Profile' : 'Login'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Profile Modal */}
      <UserProfile 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />
    </>
  );
};

export default MobileNavbar;

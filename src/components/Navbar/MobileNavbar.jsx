import React, { useState } from 'react';
import { Search, Compass, Heart, User, CrossIcon, Cross, X } from 'lucide-react';
import {motion} from "motion/react"

const MobileNavbar = () => {
  const [isMobileSearchModalOpen, setIsMobileSearchModalOpen] = useState(false);

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
          <motion.div initial={{y:'-80px',opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.5,ease:"easeIn",type:'spring',bounce:0}} className='w-full h-[50vh] rounded-2xl border shadow-lg'>

          </motion.div>
          <motion.div initial={{y:'-80px',opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.5,ease:"easeIn",delay:0.15,type:'spring',bounce:0}} className='w-full h-[10vh] rounded-2xl border shadow-lg'>

          </motion.div>

          <motion.div  initial={{y:'-80px',opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.5,ease:"easeIn",delay:0.25,type:'spring',bounce:0}}  className='w-full h-[10vh] rounded-2xl border shadow-lg'>

          </motion.div>


        </section>
        <div className='flex justify-end mt-10'>
          <motion.button  initial={{y:'80px',opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.5,ease:"easeIn",delay:0.3,type:'spring',bounce:0}} className='py-2 px-4 shadow-lg rounded-md  border flex !bg-orange-400 gap-2 items-center'>
        <Search onClick={() => setIsMobileSearchModalOpen(false)} className="text-xs text-white ">Close</Search>
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
              <button className="flex flex-col items-center py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors">
                <Compass className="w-6 h-6 text-gray-600 mb-1" />
                <span className="text-xs text-gray-600">Explore</span>
              </button>

              {/* Wishlist */}
              <button className="flex flex-col items-center py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors">
                <Heart className="w-6 h-6 text-gray-600 mb-1" />
                <span className="text-xs text-gray-600">Wishlist</span>
              </button>

              {/* Login */}
              <button className="flex flex-col items-center py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors">
                <User className="w-6 h-6 text-gray-600 mb-1" />
                <span className="text-xs text-gray-600">Login</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavbar;

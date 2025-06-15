import { useState, useEffect } from "react";
import { SearchIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";
import { useRef } from "react";

export function SearchBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckInDateModalOpen, setIsCheckInDateModalOpen] = useState(false);
  const [isCheckOutDateModalOpen, setIsCheckOutDateModalOpen] = useState(false);
  const [isAddGuestsModalOpen, setIsAddGuestsModalOpen] = useState(false);
  const [isInitialTabOpen, setIsInitialTabOpen] = useState(false);
  const [initialTabOpen, setInitialTabOpen] = useState(null);
  const [tabToTransit, setTabToTransit] = useState(null);
  const modalRef = useRef(null);
  const [ref, { width, height }] = useMeasure();
  const searchbarRef = useRef(null);
  // Reset isInitialTabOpen after first animation
  useEffect(() => {
    if (isInitialTabOpen) {
      const timeout = setTimeout(() => {
        setIsInitialTabOpen(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isInitialTabOpen]);

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
        setTabToTransit(null);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <>
      <div onClick={()=>{}}  ref={searchbarRef} className="relative font-manrope border w-[700px] h-14 rounded-full bg-white shadow-xl flex items-center justify-between">
        <div className="flex items-center justify-between w-full relative">
          {/* Where */}
          <div className="relative">
            <div
              className="hover:bg-gray-100 rounded-full cursor-pointer py-2.5 pr-24 pl-4"
              onClick={() => {
                if (!initialTabOpen) {
                  setInitialTabOpen("whereTab");
                  setIsInitialTabOpen(true);
                } else {
                  setTabToTransit(1);
                }
              }}
            >
              <h5 className="text-xs tracking-tight text-black">Where</h5>
              <h5 className="text-sm tracking-tight text-gray-400">Search Destinations</h5>
            </div>
          </div>

          <div className="border-l h-6"></div>

          {/* Check In */}
          <div className="relative">
            <div
              onClick={() => {
                if (!initialTabOpen) {
                  setInitialTabOpen("checkInTab");
                  setIsInitialTabOpen(true);
                } else {
                  setTabToTransit(2);
                }
              }}
              className="hover:bg-gray-100 rounded-full cursor-pointer py-2.5 px-4"
            >
              <h5 className="text-xs tracking-tight text-black">Check In</h5>
              <h5 className="text-sm tracking-tight text-gray-400">Add Dates</h5>
            </div>
          </div>

          <div className="border-l h-6"></div>

          {/* Check Out */}
          <div className="relative">
            <div
              onClick={() => {
                if (!initialTabOpen) {
                  setInitialTabOpen("checkOutTab");
                  setIsInitialTabOpen(true);
                } else {
                  setTabToTransit(3);
                }
              }}
              className="hover:bg-gray-100 rounded-full cursor-pointer py-2.5 px-4"
            >
              <h5 className="text-xs tracking-tight text-black">Check Out</h5>
              <h5 className="text-sm tracking-tight text-gray-400">Add Dates</h5>
            </div>
          </div>

          <div className="border-l h-6"></div>

          {/* Who */}
          <div className="relative">
            <div
              onClick={() => {
                if (!initialTabOpen) {
                  setInitialTabOpen("guestTab");
                  setIsInitialTabOpen(true);
                } else {
                  setTabToTransit(4);
                }
              }}
              className="hover:bg-gray-100 rounded-full cursor-pointer py-2.5 pl-4 flex items-center justify-between"
            >
              <div className="mr-20">
                <h5 className="text-xs tracking-tight text-black">Who</h5>
                <h5 className="text-sm tracking-tight text-gray-400">Add guests</h5>
              </div>

              <div className="p-2 bg-orange-400 rounded-full cursor-pointer mr-2">
                <SearchIcon className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Section */}
      <div className="absolute z-50 top-[90px]" ref={modalRef}>
        <AnimatePresence mode="popLayout">
          <div ref={ref}>
            <motion.div transition={{ type: "spring", bounce: 0 }}>
              {/* Where Tab */}
              {(initialTabOpen === "whereTab" || tabToTransit === 1) && (
                <motion.div
                  layoutId="modal"
                  key={"whereTab"}
                  initial={
                    isInitialTabOpen
                      ? { scaleY: 0.5, scaleX: 0.1, opacity: 0 }
                      : false
                  }
                  animate={{ scaleY: 1, scaleX: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.5, ease: "easeIn", bounce: 0 }}
                  className="bg-white origin-top border rounded-2xl shadow-md w-80 h-96 absolute left-4"
                ></motion.div>
              )}

              {/* Check In Tab */}
              {(initialTabOpen === "checkInTab" || tabToTransit === 2) && (
                <motion.div
                  layoutId="modal"
                  key={"checkInTab"}
                  initial={
                    isInitialTabOpen
                      ? { scaleY: 0.5, scaleX: 0.1, opacity: 0 }
                      : false
                  }
                  animate={{ scaleY: 1, scaleX: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.3, ease: "easeIn", bounce: 0 }}
                  className="bg-white origin-top border rounded-2xl shadow-md w-[700px] h-96 absolute"
                ></motion.div>
              )}

              {/* Check Out Tab */}
              {(initialTabOpen === "checkOutTab" || tabToTransit === 3) && (
                <motion.div
                  layoutId="modal"
                  key={"checkOutTab"}
                  initial={
                    isInitialTabOpen
                      ? { scaleY: 0.5, scaleX: 0.1, opacity: 0 }
                      : false
                  }
                  animate={{ scaleY: 1, scaleX: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.3, ease: "easeIn", bounce: 0 }}
                  className="bg-white origin-top border rounded-2xl shadow-md w-[700px] h-96 absolute z-50"
                ></motion.div>
              )}

              {/* Guest Tab */}
              {(initialTabOpen === "guestTab" || tabToTransit === 4) && (
                <motion.div
                  layoutId="modal"
                  key={"guestTab"}
                  initial={
                    isInitialTabOpen
                      ? { scaleY: 0.5, scaleX: 0.1, opacity: 0 }
                      : false
                  }
                  animate={{ scaleY: 1, scaleX: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.3, ease: "easeIn", bounce: 0 }}
                  className="bg-white origin-top border rounded-2xl shadow-md w-80 h-96 absolute z-50 left-[370px]"
                ></motion.div>
              )}
            </motion.div>
          </div>
        </AnimatePresence>
      </div>
    </>
  );
}

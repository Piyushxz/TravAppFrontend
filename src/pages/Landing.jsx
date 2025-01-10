import {motion } from "motion/react"
import { HomeSelection } from "../components/HomeSelection"
import { HomeCard } from "../components/HomeCard"
import { HomeCarousel } from "../components/HomeCarousel"
import { Faq } from "../components/Faq"
import { Footer } from "../components/Footer"
import { useNavigate } from "react-router-dom"

export const Landing = ()=>{
    const nav = useNavigate()
    return(
        <>
            <div className="w-screen h-screen flex flex-col ">
                <div className="w-[100vw] flex justify-center border-b border-black border-opacity-20 ">
                    <div className=" w-[80vw] flex py-6  ">
                        <h1 className="font-manrope font-extrabold text-[#FF7518] text-3xl  tracking-tighter ">TravO</h1>
                    </div>
                 </div>
                 <div className="w-screen flex justify-center">
                                <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                }}
                className="w-[80vw] flex flex-col md:flex-row justify-center items-center mt-8 relative"
                >
        
                <div className="w-[80vw] flex flex-col  z-10 relative ">
                    <h1 className="font-manrope text-[#FF7518] tracking-tighter text-4xl md:text-6xl font-extrabold">
                    Find places to stay on TravO
                    </h1>
                    <h1 className="font-manrope text-[#FF7518] tracking-tighter text-lg md:text-2xl font-extrabold">
                    Discover entire homes and rooms perfect for any trip.
                    </h1>

                    <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.7,
                        ease: "easeInOut",
                        
                    }}
                    className="flex justify-center md:flex md:justify-normal	"
                    >
                    <HomeSelection />
                    </motion.div>
                </div>
                    

                            <img
                    className=" w-[60vw] md:h-[500px] h-[96] mt-8 md:mt-0 shadow-sm  md:absolute relative md:translate-x-[150px] md:translate-y-[50px]"
                    src="https://a0.muscache.com/im/pictures/f4b1d5fa-da61-4ad6-945b-f5e9cab3f3f2.jpg?im_w=1440"
                    alt="Descriptive text about the image"
                    />
             
          
                </motion.div>

                 </div>


                <div className="w-screen flex justify-center">
                <div className="w-[80vw] grid grid-cols-12  mt-14 md:mt-24">
                    <motion.div  initial={{ opacity: 0, x: -50 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.5, ease: "easeInOut" }}
                viewport={{ amount: 0.5 }} 
                className="md:col-span-4 col-span-12 h-48 m-2 flex flex-col p-4 "
                
                  >
                    <svg style={{}}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-[32px]" aria-hidden="true" role="presentation" focusable="false"><path d="m16 .8.56.37C20.4 3.73 24.2 5 28 5h1v12.5C29 25.57 23.21 31 16 31S3 25.57 3 17.5V5h1c3.8 0 7.6-1.27 11.45-3.83L16 .8zm0 2.4-.34.2a22.58 22.58 0 0 1-10.3 3.55L5 6.97V17.5C5 24.33 9.72 28.86 15.71 29H16c6.13 0 11-4.56 11-11.5V6.97l-.35-.02a22.58 22.58 0 0 1-10.31-3.54L16 3.19zm7 7.39L24.41 12 13.5 22.91 7.59 17 9 15.59l4.5 4.5 9.5-9.5z"></path>
                    </svg>
                    <h1 className="font-manrope text-[#FF7518] tracking-tighter text-lg md:text-2xl font-extrabold pt-4">Book with Confidence</h1>
                    <h1 className="font-manrope text-black tracking-tighter text-sm md:text-lg font-extrabold ">Get 24/7 support and discover helpful reviews from our trusted community of guests.</h1>

                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: -50 }} 
                whileInView={{ opacity: 1, y: -30 }} 
                transition={{ duration: 0.5, ease: "easeInOut" }}
                viewport={{ amount: 0.5 }} 
                    className="md:col-span-4 col-span-12   m-2 flex flex-col p-4  ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-[32px]"aria-hidden="true" role="presentation" focusable="false"><path d="M9.5 2a4.5 4.5 0 0 1 3.53 7.3c.6.21 1.17.54 1.66.98l.19.19L17.4 13H31v2h-2v14a2 2 0 0 1-1.85 2H5a2 2 0 0 1-2-1.85V15H1v-2h2.1a5 5 0 0 1 2.96-3.6A4.5 4.5 0 0 1 9.5 2zm7.08 13H5v14h22V15h-7.59l3.3 3.3-1.42 1.4zM9.5 4a2.5 2.5 0 0 0-1 4.8V11H8a3 3 0 0 0-2.83 2h9.41l-1.12-1.12a3 3 0 0 0-1.92-.87l-.2-.01h-.84V8.8a2.5 2.5 0 0 0-1-4.8zm15.49-3a6.96 6.96 0 0 1-1.8 4.07l-.45.46A8.97 8.97 0 0 0 20.35 11h-2a10.97 10.97 0 0 1 3.2-7.12A4.96 4.96 0 0 0 22.97 1zm2 0h2a10.96 10.96 0 0 1-3.2 7.12A4.97 4.97 0 0 0 24.38 11h-2a6.97 6.97 0 0 1 1.8-4.06l.44-.47A8.96 8.96 0 0 0 26.99 1z"></path></svg>
                    <h1 className="font-manrope text-[#FF7518] tracking-tighter text-lg md:text-2xl font-extrabold pt-4">Find more amenities
                    </h1>
                    <h1 className="font-manrope text-black tracking-tighter text-sm md:text-lg font-extrabold ">Explore stays based on the comforts you want for the perfect, dreamy getaway.</h1>

                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 50 }} 
                whileInView={{ opacity: 1, x: 0 ,y:20}} 
                transition={{ duration: 0.5, ease: "easeInOut" }}
                viewport={{ amount: 0.5 }} 
                    className="md:col-span-4 col-span-12   m-2 flex flex-col p-4 mb-24 md:mb-0 ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"  className="w-[32px]" aria-hidden="true" role="presentation" focusable="false"><path d="M28 2h-6V0h-2v2h-8V0h-2v2H4a2 2 0 0 0-2 2v21a5 5 0 0 0 5 5h12.59a2.01 2.01 0 0 0 1.41-.59L29.41 21a2.01 2.01 0 0 0 .59-1.41V4a2 2 0 0 0-2-2Zm-8 25.59V23a3 3 0 0 1 3-3h4.59ZM28 10H4v2h24v6h-5a5 5 0 0 0-5 5v5H7a3 3 0 0 1-3-3V4h6v2h2V4h8v2h2V4h6Z"></path></svg>
                    <h1 className="font-manrope text-[#FF7518] tracking-tighter text-lg md:text-2xl font-extrabold pt-4">Keep it flexible
                    </h1>
                    <h1 className="font-manrope text-black tracking-tighter text-sm md:text-lg font-extrabold ">Stays with flexible cancellation make it easy to rebook if your plans change.</h1>

                    </motion.div>
                </div>
                </div>

            
            <div className="w-screen flex justify-center items-center mt-14 flex-col gap-4">
                    <div className="w-[80vw]">
                        <h1 className="font-manrope text-[#FF7518] tracking-tighter text-3xl md:text-5xl font-extrabold">
                        Stays with all the best comforts
                        </h1>
                        <h1 className="font-manrope text-black tracking-tighter text-lg md:text-xl font-extrabold">
                        Find entire homes complete with kitchens, wifi, hot tubs and more.
                        </h1>
                    </div>
                    <div>
                    <div className="w-[80vw] flex gap-4 hidden grid md:flex ">
 
                            <HomeCard link={"https://a0.muscache.com/im/pictures/miso/Hosting-1014506245981978233/original/bb677725-63e2-4aae-befa-a835264011aa.jpeg?im_w=720&im_format=avif"} title={'Old House,Tennessee'} rating={4.3}/>
                            <HomeCard link={"https://a0.muscache.com/im/pictures/miso/Hosting-1152177177875845044/original/c552d1ce-3e75-46e9-9a54-4e201dd3a2bf.jpeg?im_w=720&im_format=avif"} title={'Home in Favelas, Brazil'} rating={4.6}/>
                            <HomeCard link={"https://a0.muscache.com/im/pictures/miso/Hosting-971172991313485288/original/36fc6516-4006-4be4-b8a3-ae865fd42e86.jpeg?im_w=720&im_format=avif"} title={'Treehouse,Texas'} rating={3.9}/>
                            <HomeCard link={"https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA1MzQ2Mjc0MTk1ODU4Njg2Mw%3D%3D/original/53177020-9817-4078-9cb0-d36702ee60f3.jpeg?im_w=720&im_format=avif"} title={'Resort,Alabama'} rating={5.0}/>

                        </div>
                            <div className="md:hidden flex justify-center items-center">
                            <HomeCarousel/>
                            </div>
                      </div>


            </div>
            <div className="w-screen flex justify-center mt-6">
                <div className="w-[80vw]">
                <button onClick={()=>nav("/search")}
                className="md:px-6 md:py-3 px-4 py-2 font-manrope font-bold text-white rounded-lg bg-[#FF7518] hover:opacity-60">
                            Explore more
                      </button>
                </div>
            </div>


            <div className="w-screen flex justify-center items-center mt-20">
                    <div className="w-[80vw] grid grid-cols-12 ">
                        <motion.div 
                        initial={{ opacity: 0, x: -20 }} 
                        whileInView={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        viewport={{ amount: 0.5 }} 
                        className="col-span-12 md:col-span-6  md:h-96  flex justify-center   ">
                                <h1 className="font-manrope text-[#FF7518] tracking-tighter text-4xl md:text-5xl font-extrabold">
                                Your questions, answered
                            </h1>
                            


                        </motion.div>
                        <motion.div 
                        initial={{ opacity: 0, x: 20 }} 
                        whileInView={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        viewport={{ amount: 0.5 }} 
                        className="col-span-12 md:col-span-6 md:mt-0 mt-6 h-96 flex flex-col gap-6 ">
                            
                        <Faq question={"What is TravO and how does it work?"} answer={"We verify personal profiles and listings to make sharing easy, enjoyable and safe for millions of Hosts and travellers worldwide. Find out more about Trav0"}/>
                        <Faq question={"How do I use search filters?"} answer={"It’s easy to use our search filters to only show the listings that have the accessibility features you need. Learn more about using search filters and discover more flexible ways to search."}/>
                        <Faq question={"What if I need to cancel due to a problem with the listing or Host?"} answer={"In most cases, you can resolve any issues directly by messaging your Host. If they can't help, simply contact Airbnb within 24 hours of discovering the issue. Learn more"}/>
                        <Faq question={"Need more information?"} answer={"Visit our Help Centre to get additional answers to your questions. Learn more"}/>


                        </motion.div>

                    </div>
                    
            </div>

                    <Footer/>

            </div>


        </>
    )
}
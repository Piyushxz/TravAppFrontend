export const HotelImages = ({ singleHotel }) => {
  const { image, imageArr } = singleHotel;

  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-4">
      <div className="flex-shrink-0 h-[25rem] md:h-[30rem] md:w-2/3"> {/* Primary Image */}
        <img
          className="w-full h-full object-cover rounded-lg" 
          src={image}
          alt="hotel"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:w-1/3"> 
        {imageArr &&
          imageArr.map((img, index) => (
            <div key={index} className="relative group"> {/* Group for hover effect */}
              <img
                className="w-full h-32 md:h-40 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105" // Scale on hover
                src={img}
                alt="hotel"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

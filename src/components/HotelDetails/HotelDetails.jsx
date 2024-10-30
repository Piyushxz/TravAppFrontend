export const HotelDetails = ({ singleHotel }) => {
  const {
    hostName,
    hostJoinedOn,
    numberOfBathrooms,
    numberOfBeds,
    numberOfguest,
    numberOfBedrooms,
  } = singleHotel;

  return (
    <div className="p-4 md:p-6">
      <div className="host-details pb-4 border-b border-gray-300 mb-4"> {/* Add margin-bottom for spacing */}
        <p className="text-gray-800 text-base">
          Hosted by <span className="font-bold">{hostName}</span>, Joined on{" "}
          <span className="font-bold">{hostJoinedOn}</span>
        </p>
        <div className="text-gray-800 text-sm pt-2">
          {numberOfguest} guests, {numberOfBedrooms} bedrooms, {numberOfBeds}{" "}
          beds, {numberOfBathrooms} bathrooms.
        </div>
      </div>

      <div className="key-features host-details pb-4 border-b border-gray-300 mb-4"> {/* Add margin-bottom for spacing */}
        <div className="pb-6">
          <p className="text-gray-800 text-base flex items-center gap-2">
            <span className="material-icons-outlined">apps</span>
            <span className="font-bold">Dedicated Workspace</span>
          </p>
          <span className="text-gray-800 text-sm block pt-1">
            A common area with wifi that is well suited for working.
          </span>
        </div>

        <div className="pb-6">
          <p className="text-gray-800 text-base flex items-center gap-2">
            <span className="material-icons-outlined">apps</span>
            <span className="font-bold">Great Location</span>
          </p>
          <span className="text-gray-800 text-sm block pt-1">
            80% of recent guests gave the location a 5-star rating.
          </span>
        </div>

        <p className="text-gray-800 text-base flex items-center gap-2 mb-2"> {/* Add margin-bottom for spacing */}
          <span className="material-icons-outlined">apps</span>
          <span className="font-bold">Free cancellation before 7 days of booking</span>
        </p>
      </div>

      <div className="amenities-container mb-4"> {/* Add margin-bottom for spacing */}
        <p className="text-gray-800 text-lg pb-2 font-bold">What this place offers</p>
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-gray-800 text-sm flex items-center gap-2">
              <span className="material-icons-outlined">apps</span> Kitchen
            </span>
            <span className="text-gray-800 text-sm flex items-center gap-2">
              <span className="material-icons-outlined">apps</span> Free parking
              on premises
            </span>
            <span className="text-gray-800 text-sm flex items-center gap-2">
              <span className="material-icons-outlined">apps</span> Dedicated
              Workspace
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-gray-800 text-sm flex items-center gap-2">
              <span className="material-icons-outlined">apps</span> Wifi
            </span>
            <span className="text-gray-800 text-sm flex items-center gap-2">
              <span className="material-icons-outlined">apps</span> Washing
              Machine
            </span>
            <span className="text-gray-800 text-sm flex items-center gap-2">
              <span className="material-icons-outlined">apps</span> Patio or
              Balcony
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

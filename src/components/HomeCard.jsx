export const HomeCard = ({ link, title, rating }) => {
    return (
      <div className="w-80 md:w-[500px] border rounded-lg flex flex-col">
        <div className="w-full h-48 rounded-lg overflow-hidden">
          <img className="w-full h-full object-cover" src={link} alt={title} />
        </div>
        <div className="px-2 flex justify-between">
          <h1 className="font-manrope text-black tracking-tighter text-md font-bold">{title}</h1>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#434343"
            >
              <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
            </svg>
            <h1 className="font-manrope text-black tracking-tighter text-md font-bold">{rating}</h1>
          </div>
        </div>
      </div>
    );
  };
  
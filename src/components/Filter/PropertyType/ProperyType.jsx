import { v4 as uuid } from "uuid";
import { useFilter } from "../../../context/filter-context";

const propertyTypes = [
  { id: uuid(), type: "House" },
  { id: uuid(), type: "Guest House" },
  { id: uuid(), type: "Flat" },
  { id: uuid(), type: "Hotel" },
];

export const PropertyType = () => {
  const { propertyType, filterDispatch } = useFilter();

  const handlePropertyClick = (property) => {
    filterDispatch({
      type: "PROPERTY_TYPE",
      payload: property,
    });
  };

  return (
    <div className="filter-container mb-4">
      <span className="text-lg font-medium">Property Type</span>
      <div className="flex flex-wrap gap-4 mt-2">
        {propertyTypes.map(({ id, type }) => (
          <span
            className={`flex items-center justify-center cursor-pointer px-4 py-2 border rounded-md transition duration-200 ease-in-out ${
              propertyType === type ? "bg-black text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            key={id}
            onClick={() => handlePropertyClick(type)}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

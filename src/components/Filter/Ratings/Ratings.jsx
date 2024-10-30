import { useFilter } from "../../../context/filter-context";

const ratings = ["1", "2", "3", "4", "5"];

export const Ratings = () => {
  const { filterDispatch } = useFilter();

  const handleRatingsClick = (rating) => {
    filterDispatch({
      type: "RATING",
      payload: rating,
    });
  };

  return (
    <div className="filter-container mb-4">
      <span className="text-lg font-medium">Star Rating</span>
      <div className="flex flex-wrap gap-4 mt-2">
        {ratings.map((rating) => (
          <span
            onClick={() => handleRatingsClick(rating)}
            className={`flex items-center justify-center cursor-pointer px-4 py-2 border rounded-md transition duration-200 ease-in-out ${
            "bg-gray-200 text-gray-800 hover:bg-black hover:text-white"
            }`}
            key={rating}
          >
            {rating}&Up
          </span>
        ))}
      </div>
    </div>
  );
};

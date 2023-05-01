import React from "react";

function SearchMeal({ searchMeal, setSearchMeal }) {
  return (
    <input
      className="search-bar"
      type="text"
      input={searchMeal}
      onChange={(e) => setSearchMeal(e.target.value)}
      placeholder="Search for a meal.."
    />
  );
}

export default SearchMeal;

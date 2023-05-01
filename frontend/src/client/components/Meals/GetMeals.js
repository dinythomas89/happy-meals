import React, { useEffect, useState } from "react";

import RenderMeals from "./RenderMeals";
import SearchMeal from "./SearchMeal";

function GetMeals() {
  const [meals, setMeals] = useState([]);
  const [searchMeal, setSearchMeal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  let API_URL;
  if (searchMeal === "") API_URL = "/api/meals";
  else API_URL = `/api/meals?title=${searchMeal}`;
  useEffect(() => {
    setIsLoading(true);
    fetch(API_URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then((data) => {
        setIsLoading(false);
        setMeals(data);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [searchMeal]); //state will change when searchMeal is changed

  return (
    <div className="meals">
      <h1>Meals</h1>
      <SearchMeal searchMeal={searchMeal} setSearchMeal={setSearchMeal} />
      {error && <p>{error.message}</p>}
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <ul className="render-meals">
          {meals.length > 0
            ? meals.map((meal) => {
                return (
                  <li key={meal.id}>
                    <RenderMeals meal={meal} />
                  </li>
                );
              })
            : "No meals found"}
        </ul>
      )}
    </div>
  );
}

export default GetMeals;

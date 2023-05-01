import React from "react";
import { Link } from "react-router-dom";

import MealImage from "./MealImage";
import RatingForMeal from "./RatingForMeal";

function RenderMeals({ meal }) {
  return (
    <div>
      <Link to={`/meals/${meal.id}`}>
        <MealImage mealTitle={meal.title} /> 
        <br />
        <br />
        <span className="meal-title">{meal.title}</span>
      </Link>
      <RatingForMeal mealId={meal.id} />
      <br />
    </div>
  );
}

export default RenderMeals;

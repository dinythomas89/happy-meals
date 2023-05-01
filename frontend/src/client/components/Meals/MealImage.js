import React from "react";

import mealImages from "../utils/mealImages";
import RandomImage from "../../meal-image.png";

function MealImage({ mealTitle }) {
  let mealImage;
  const filteredImage = mealImages.filter(
    (element) => element.title === mealTitle.toLowerCase()
  );
  if (filteredImage) mealImage = filteredImage[0].image;
  else mealImage = RandomImage;

  return (
    <div>
      <img className="meal-image" src={mealImage} alt="meal image" />
    </div>
  );
}

export default MealImage;

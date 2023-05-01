import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";

function RatingForMeal({ mealId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    //get all reviews
    fetch("/api/reviews")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then((data) => {
        setReviews(data);
      });
  }, []);
  console.log(reviews)

  let averageRating = 0;
  if (reviews.length > 0) {
    //filter reviews to find duplicate values
    const mealWithRating = reviews.filter((element) => {
      if (mealId === element.meal_id) {
        return element;
      }
    });
    if (mealWithRating.length > 1) {
      //if duplicate value is present finf the average rating using .reduce
      const duplicateRatingsInAMeal = mealWithRating.map((star) => star.stars);
      const totalRatings = duplicateRatingsInAMeal.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      averageRating = Math.round(totalRatings / duplicateRatingsInAMeal.length);
    } else {
      //if no duplicate values exist get the star value as average rating
      const averageRatingArray = mealWithRating.map((star) => star.stars); //console.log->[5]
      averageRating = averageRatingArray[0];
    }
  }
  
  return (
    <div className="meal-star-container">
      {averageRating ? (
        <ReactStars
          className="stars"
          size={34}
          edit={false}
          value={averageRating}
          activeColor="#8f5908"
        />
      ) : (
        <p>No rating yet </p>
      )}
    </div>
  );
}

export default RatingForMeal;

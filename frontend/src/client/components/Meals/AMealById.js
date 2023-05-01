import React, { useState } from "react";

import useMealById from "../utils/useMealById";
import useMealAvailability from "../utils/useMealAvailability";
import AddReservation from "./AddReservation";
import AddReview from "./AddReview";

const AMealById = () => {
  const [isReservationAvailable, setIsReservationAvailable] = useState(true);
  const [viewReservationForm, setViewReservationForm] = useState(false);
  const [viewReviewForm, setViewReviewForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //custom hooks to get meal with an is and available reservations
  const mealById = useMealById({ setIsLoading, setError });
  console.log(mealById)
  const filteredMealWithReservation = useMealAvailability({
    setIsLoading,
    setError,
    mealById,
  });

  const onReservationClick = () => {
    //only when clicking the button will set the reservation form to be true
    // and check if available reservation is there or not
    setViewReservationForm(true);
    setViewReviewForm(false);
    if (filteredMealWithReservation.length === 0)
      setIsReservationAvailable(false);
  };
  const onReviewClick = () => {
    setViewReviewForm(true);
    setViewReservationForm(false);
  };
  console.log(filteredMealWithReservation)

  return (
    <div className="meal-details">
      {error && <p>{error.message}</p>}
      {isLoading && <h2>Loading...</h2>}
      <section>
        <h1>Meal details</h1>
        <h3>{mealById.title}</h3>
        <p>{mealById.description}</p>
        <p>Location: {mealById.location}</p>
        <p>Price: {mealById.price}</p>
        <button onClick={onReservationClick}>Reserve</button>
        <br />
        <br />
        <button onClick={onReviewClick}>Add Review</button>
        <br />
        <br />
        <div>
          {viewReservationForm ? (
            isReservationAvailable ? (
              <AddReservation
                meal={filteredMealWithReservation}
                setReservationForm={setViewReservationForm}
              />
            ) : (
              `Sorry, no reservation is available for ${mealById.title}`
            )
          ) : (
            ""
          )}
        </div>
        <div>
          {viewReviewForm ? (
            <AddReview meal={mealById} setReviewForm={setViewReviewForm} />
          ) : (
            ""
          )}
        </div>
        <br />
      </section>
    </div>
  );
};

export default AMealById;

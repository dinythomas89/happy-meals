import { useEffect, useState } from "react";

//custom hook
//used to find available reservations
const useMealAvailability = ({ setIsLoading, setError, mealById }) => {
  const [availableMeals, SetAvailableMeals] = useState([]);
  let filteredMealWithReservation;
  useEffect(() => {
    setIsLoading(true);
    //to check whether reservations for particular meal is available
    fetch(`/api/meals?availableReservations=true`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then((data) => {
        setIsLoading(false);
        SetAvailableMeals(data);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (availableMeals) {
    filteredMealWithReservation = availableMeals.filter((meal) => {
      if (meal.id === mealById.id) return meal;
    });
  }
  console.log(availableMeals)
  console.log(filteredMealWithReservation)
  return filteredMealWithReservation;
};

export default useMealAvailability;

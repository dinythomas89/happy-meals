import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//custom hook to get meal with specific id
const useMealById = ({ setIsLoading, setError }) => {
  //useParams to get the id value for meal
  const params = useParams(); //console.log->['id', 2]
  const [mealById, setMealById] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    //fetch meal detail by getting the meal.id from meals
    fetch(`/api/meals/${params.id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then((data) => {
        setIsLoading(false);
        setMealById(data[0]);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return mealById;
};

export default useMealById;

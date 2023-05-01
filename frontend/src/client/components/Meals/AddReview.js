import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";

import postData from "../utils/postData";

//same as AddReservation.js
function AddReview({ meal, setReviewForm }) {
  const initialValues = {
    title: "",
    description: "",
    stars: "",
  };
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  let newStars;
  const ratingChanged = (newRating) => {
    newStars = newRating;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title: values.title,
      description: values.description,
      stars: newStars,
      meal_id: meal.id,
      created_date: new Date().toISOString().split("T")[0],
    };
    
    const response = postData("api/reviews", formData);
    if (response) {
      alert(`Thank you for your feedback`);
    } else {
      alert(`The feedback was not successful. Please try again..`);
    }
    setReviewForm(false);
  };

  return (
    <form className="review-form">
      <h2>Review form</h2>
      <p className="important-message">Please fill out all the fields</p>
      <div>
        <input
          type="text"
          value={values.title}
          onChange={handleInputChange}
          name="title"
          placeholder="Title"
          required
        />
        <br />
        <textarea
          rows="4"
          value={values.description}
          onChange={handleInputChange}
          name="description"
          placeholder="Description"
          required
        />
        <br />
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={42}
          activeColor="#8f5908"
        />
        <br />
        <button onClick={onSubmit}>Submit</button>
      </div>
    </form>
  );
}

export default AddReview;

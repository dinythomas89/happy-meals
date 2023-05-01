import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import postData from "../utils/postData";

function AddMeal() {
  //same as AddReservation. To set the initial values
  const initialValues = {
    title: "",
    description: "",
    location: "",
    max_reservations: "",
    price: "",
  };
  const [values, setValues] = useState(initialValues);
  const [startDate, setStartDate] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  //to convert date from the date-picker to the same type as date in the db
  const formatDate = (date) => {
    let d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth().toString().padStart(2, "0")}-${d
      .getDate()
      .toString()
      .padStart(2, "0")}`;
  };
  const formattedDate = formatDate(startDate);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title: values.title,
      description: values.description,
      location: values.location,
      when: formattedDate,
      max_reservations: values.max_reservations,
      price: values.price,
      created_date: new Date().toISOString().split("T")[0],
    };
    const response = postData("api/meals", formData);
    if (response) {
      alert("you added a meal");
      setValues(initialValues);
      setStartDate("");
    }
  };

  return (
    <form className="new-meal">
      <div>
        <h2>Add a meal</h2>
        <p className="important-message">Please fill out all the fields</p>
        <br />
        <input
          type="text"
          value={values.title}
          onChange={handleInputChange}
          name="title"
          placeholder="Title"
          required
        />
        <br />
        <input
          type="text"
          value={values.description}
          onChange={handleInputChange}
          name="description"
          placeholder="Description"
          required
        />
        <br />
        <input
          type="text"
          value={values.location}
          onChange={handleInputChange}
          name="location"
          placeholder="Location"
          required
        />
        <br />
        <DatePicker
          className="date-picker"
          dateFormat="yyyy-MM-dd"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          minDate={new Date()}
          placeholderText="yyyy-mm-dd"
          required
        />
        <br />
        <input
          type="number"
          value={values.max_reservations}
          onChange={handleInputChange}
          name="max_reservations"
          min="1"
          placeholder="Maximum reservations"
          required
        />
        <br />
        <input
          type="number"
          value={values.price}
          onChange={handleInputChange}
          name="price"
          placeholder="Price"
          required
        />
        <br />
        <br />
        <button onClick={onSubmit}>Submit</button>
        <br />
        <br />
      </div>
    </form>
  );
}

export default AddMeal;

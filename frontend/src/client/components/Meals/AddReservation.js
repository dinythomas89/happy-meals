import React, { useState } from "react";

import postData from "../utils/postData";

function AddReservation({ meal, setReservationForm }) {
  console.log(meal)
  //setting the initial values for input fields
  //link->dev.to/deboragaleano/how-to-handle-multiple-inputs-in-react-55el
  const initialValues = {
    noOfGuests: "",
    name: "",
    email: "",
    phoneNumber: "",
  };
  const [values, setValues] = useState(initialValues);
  const numberOfReservationsAvailable = (meal[0].max_reservations)
  console.log(meal[0])
    //parseInt(meal[0].max_reservations) - parseInt(meal[0].total_reservations);
    console.log(numberOfReservationsAvailable)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = {
      number_of_guests: values.noOfGuests,
      contact_name: values.name,
      contact_email: values.email,
      contact_phonenumber: values.phoneNumber,
      meal_id: meal[0].meal_id,
      created_date: new Date().toISOString().split("T")[0],
    };
    const response = postData("api/reservations", formData);
    if (response) {
      const message = `Your reservation for ${values.noOfGuests} persons is booked`;
      alert(message);
    } else {
      alert(`The reservation was not successful. Please try again..`);
    }
    setReservationForm(false);
  };

  return (
    <form>
      <h2>Reservation form</h2>
      <div>Available reservations: {numberOfReservationsAvailable}</div>
      <br />
      <p className="important-message">Please fill out all the fields</p>
      <input
        type="number"
        value={values.noOfGuests}
        onChange={handleInputChange}
        name="noOfGuests"
        min="1"
        placeholder="Number of guests"
        required
      />
      <br />
      <input
        type="text"
        value={values.name}
        onChange={handleInputChange}
        name="name"
        placeholder="Name"
        required
      />
      <br />
      <input
        type="email"
        value={values.email}
        onChange={handleInputChange}
        name="email"
        placeholder="Email"
        required
      />
      <br />
      <input
        type="tel"
        value={values.phoneNumber}
        onChange={handleInputChange}
        name="phoneNumber"
        placeholder="Phone number"
        required
      />
      <br />
      <button onClick={onSubmit}>Submit</button>
    </form>
  );
}

export default AddReservation;

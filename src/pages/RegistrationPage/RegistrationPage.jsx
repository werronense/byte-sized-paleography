import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegistrationPage.scss";

const RegistrationPage = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  // check whether the form is valid each time values change
  useEffect(() => {
    const values = Object.values(formValues);

    // set isFormValid to true if there are no falsy formValues
    setIsFormValid(!values.map(val => !!val).includes(false));
  }, [formValues]);

  // event handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <>
      <h1>Get Started</h1>
      <form>
        <div>
          <label htmlFor="username">User name: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formValues.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formValues.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formValues.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
          <button type="submit" disabled={!isFormValid}>
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default RegistrationPage;

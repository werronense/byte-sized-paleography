import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegistrationPage.scss";

import FormFieldInput from "../../components/FormFieldInput/FormFieldInput";

const { VITE_API_BASE_URL } = import.meta.env;

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
    setIsFormValid(!values.map((val) => !!val).includes(false));
  }, [formValues]);

  // event handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${VITE_API_BASE_URL}/api/register`,
        formValues
      );

      if (response.data.success) navigate("/login");
    } catch (err) {
      console.log(err.response.data.error);
    }
  };

  return (
    <>
      <h1>Get Started</h1>
      <form onSubmit={handleSubmit} action="/register">
        <FormFieldInput
          labelText="Username: "
          inputType="text"
          inputNameId="username"
          inputPlaceholder="choose a username"
          inputValue={formValues.username}
          changeHandler={handleInputChange}
          isRequired={true}
        />
        <FormFieldInput
          labelText="Email: "
          inputType="email"
          inputNameId="email"
          inputPlaceholder="enter your email address"
          inputValue={formValues.email}
          changeHandler={handleInputChange}
          isRequired={true}
        />
        <FormFieldInput
          labelText="Password: "
          inputType="password"
          inputNameId="password"
          inputPlaceholder="choose a password"
          inputValue={formValues.password}
          changeHandler={handleInputChange}
          isRequired={true}
        />
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

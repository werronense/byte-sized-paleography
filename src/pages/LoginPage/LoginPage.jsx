import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./LoginPage.scss";

import FormFieldInput from "../../components/FormFieldInput/FormFieldInput";
import Btn from "../../components/Btn/Btn";

const { VITE_API_BASE_URL } = import.meta.env;

const LoginPage = () => {
  const initialValues = {
    username: "",
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
        `${VITE_API_BASE_URL}/api/login`,
        formValues
      );

      sessionStorage.setItem("token", response.data.token);
      navigate("/profile");
    } catch (err) {
      console.log(err.response.data.error);
    }
  };

  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit} action="/login">
        <FormFieldInput
          labelText="Username: "
          inputType="text"
          inputNameId="username"
          inputPlaceholder="enter your username"
          inputValue={formValues.username}
          changeHandler={handleInputChange}
          isRequired={true}
        />
        <FormFieldInput
          labelText="Password: "
          inputType="password"
          inputNameId="password"
          inputPlaceholder="enter your password"
          inputValue={formValues.password}
          changeHandler={handleInputChange}
          isRequired={true}
        />
        <div>
          <Btn
            btnType="button"
            btnText="Cancel"
            btnDisabled={false}
            clickHandler={() => navigate("/")}
          />
          <Btn
            btnType="submit"
            btnText="Log In"
            btnModifier="success"
            btnDisabled={!isFormValid}
          />
        </div>
      </form>
    </>
  );
};

export default LoginPage;

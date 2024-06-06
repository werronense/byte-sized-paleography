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
    <div className="login-page">
      <div className="login-page__content-container">
        <h1 className="login-page__title">Login Page</h1>
        <section>
          <p>
            Log in to start playing and see where you are in the leaderboard!
          </p>
        </section>
        <form
          className="login-page__form"
          onSubmit={handleSubmit}
          action="/login"
        >
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
          <div className="login-page__buttons">
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
      </div>
    </div>
  );
};

export default LoginPage;

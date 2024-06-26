import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./UpdateProfilePage.scss";

import FormFieldInput from "../../components/FormFieldInput/FormFieldInput";
import Btn from "../../components/Btn/Btn";

const { VITE_API_BASE_URL } = import.meta.env;

const UpdateProfilePage = () => {
  const { token } = sessionStorage;

  // redirect unauthorized users to the login page
  if (!token) return navigate("/login");

  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  // component states
  const [formValues, setFormValues] = useState(initialValues);
  const [messages, setMessages] = useState(initialValues);

  // event handlers
  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // handle form submissions
  const handleFormSubmit = async (e, formName) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `${VITE_API_BASE_URL}/api/users/${formName}`,
        { [formName]: formValues[formName] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // update messages with success message (response.data)
      setMessages({
        ...messages,
        [formName]: response.data,
      });

      // reset username form
      setFormValues({
        ...formValues,
        [formName]: "",
      });
    } catch (err) {
      console.error(err);

      // update messages with error message (err.response.data)
      setMessages({
        ...messages,
        [formName]: err.response.data,
      });
    }
  };

  // handle delete user
  const handleDeleteUser = async () => {
    try {
      await axios.delete(`${VITE_API_BASE_URL}/api/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // clear token of deleted user from sessionStorage
      sessionStorage.clear();

      // redirect to home page
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="update-page">
      <div className="update-page__content-container">
        <h1>Update Profile</h1>
        <form
          className="update-page__form"
          onSubmit={(e) => handleFormSubmit(e, "username")}
          action="/update-profile"
        >
          <p
            className={`update-page__message ${
              messages.username.error ? "update-page__message--error" : ""
            }`}
          >
            {messages.username.message || messages.username.error || ""}
          </p>
          <FormFieldInput
            labelText="New Username"
            inputType="text"
            inputNameId="username"
            inputPlaceholder="Enter a new username"
            inputValue={formValues.username}
            changeHandler={handleInputChange}
            isRequired={true}
          />
          <div className="update-page__submit">
            <Btn
              btnType="submit"
              btnText="Change Username"
              btnDisabled={false}
            />
          </div>
        </form>
        <form
          className="update-page__form"
          onSubmit={(e) => handleFormSubmit(e, "email")}
          action="/update-profile"
        >
          <p
            className={`update-page__message ${
              messages.email.error ? "update-page__message--error" : ""
            }`}
          >
            {messages.email.message || messages.email.error || ""}
          </p>
          <FormFieldInput
            labelText="New Email"
            inputType="email"
            inputNameId="email"
            inputPlaceholder="Enter a new email"
            inputValue={formValues.email}
            changeHandler={handleInputChange}
            isRequired={true}
          />
          <div className="update-page__submit">
            <Btn btnType="submit" btnText="Change Email" btnDisabled={false} />
          </div>
        </form>
        <form
          className="update-page__form"
          onSubmit={(e) => handleFormSubmit(e, "password")}
          action="/update-profile"
        >
          <p
            className={`update-page__message ${
              messages.password.error ? "update-page__message--error" : ""
            }`}
          >
            {messages.password.message || messages.password.error || ""}
          </p>
          <FormFieldInput
            labelText="New Password"
            inputType="password"
            inputNameId="password"
            inputPlaceholder="Enter a new password"
            inputValue={formValues.password}
            changeHandler={handleInputChange}
            isRequired={true}
          />
          <div className="update-page__submit">
            <Btn
              btnType="submit"
              btnText="Change Password"
              btnDisabled={false}
            />
          </div>
        </form>
        <div className="update-page__delete">
          <Btn
            btnType="button"
            btnText="Delete Account"
            btnModifier="danger"
            clickHandler={handleDeleteUser}
            btnDisabled={false}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePage;

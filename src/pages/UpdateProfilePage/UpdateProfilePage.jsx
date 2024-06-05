import { useEffect, useState } from "react";
import axios from "axios";

import "./UpdateProfilePage.scss";

import FormFieldInput from "../../components/FormFieldInput/FormFieldInput";
import Btn from "../../components/Btn/Btn";

const { VITE_API_BASE_URL } = import.meta.env;

const UpdateProfilePage = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [messages, setMessages] = useState(initialValues);

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
      <h1>Update Profile</h1>
      <form action="/update-profile">
        <p>{messages.username}</p>
        <FormFieldInput
          labelText="New Username"
          inputType="text"
          inputNameId="username"
          inputPlaceholder="Enter a new username"
          inputValue={formValues.username}
          changeHandler={handleInputChange}
          isRequired={true}
        />
        <Btn btnType="submit" btnText="Change Username" btnDisabled={false} />
      </form>
      <form action="/update-profile">
        <p>{messages.email}</p>
        <FormFieldInput
          labelText="New Email"
          inputType="email"
          inputNameId="email"
          inputPlaceholder="Enter a new email"
          inputValue={formValues.email}
          changeHandler={handleInputChange}
          isRequired={true}
        />
        <Btn btnType="submit" btnText="Change Email" btnDisabled={false} />
      </form>
      <form action="/update-profile">
        <p>{messages.password}</p>
        <FormFieldInput
          labelText="New Password"
          inputType="password"
          inputNameId="password"
          inputPlaceholder="Enter a new password"
          inputValue={formValues.password}
          changeHandler={handleInputChange}
          isRequired={true}
        />
        <Btn btnType="submit" btnText="Change Password" btnDisabled={false} />
      </form>
    </>
  );
};

export default UpdateProfilePage;

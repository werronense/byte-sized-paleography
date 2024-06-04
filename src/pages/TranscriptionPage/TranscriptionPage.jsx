import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import "./TranscriptionPage.scss";

const { VITE_API_BASE_URL } = import.meta.env;

const TranscriptionPage = () => {
  const [text, setText] = useState({});
  const [userInput, setUserInput] = useState("");

  // get the authentication token from sessionStorage
  const { token } = sessionStorage;

  const navigate = useNavigate();

  const getText = async () => {
    const response = await axios.get(`${VITE_API_BASE_URL}/api/text`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setText(response.data);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // todo: POST /api/user/text

    getText();
  };

  const handleClick = () => {
    // todo: check if input matches transcription
    // todo: if input matches description, POST /api/user/text

    navigate("/profile");
  };

  useEffect(() => {
    // redirect unauthorized users to the login page
    if (!token) return navigate("/login");

    getText();
  }, []);

  useEffect(() => {
    // reset user input when a new text loads
    setUserInput("");
  }, [text]);

  return (
    text && (
      <div>
        <img src={`${VITE_API_BASE_URL}/images/${text.image_url}`} alt="" />
        <p>
          {userInput?.split("").map((letter, i) => (
            <span
              key={uuidv4()}
              // todo: update error styling
              className={letter === text.transcription[i] ? "" : "error"}
            >
              {letter}
            </span>
          ))}
        </p>
        <form onSubmit={handleSubmit}>
          <input
            name="input"
            type="text"
            placeholder="Enter Your Transcription"
            value={userInput}
            onChange={handleInputChange}
          ></input>
          <div>
            <button type="button" onClick={handleClick}>
              Home
            </button>
            <button type="submit" disabled={userInput !== text.transcription}>
              Next
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default TranscriptionPage;

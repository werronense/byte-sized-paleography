import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import "./TranscriptionPage.scss";

const { VITE_API_BASE_URL } = import.meta.env;

const TranscriptionPage = () => {
  const [text, setText] = useState({});
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // todo: POST /api/user/:userId/text/:textId
    // todo: GET /api/text
  };

  useEffect(() => {
    const getText = async () => {
      const response = await axios.get(`${VITE_API_BASE_URL}/api/text`);
      setText(response.data);
    };
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
          <button type="submit" disabled={userInput !== text.transcription}>
            Next
          </button>
        </form>
      </div>
    )
  );
};

export default TranscriptionPage;

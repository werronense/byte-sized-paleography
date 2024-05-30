import { useEffect, useState } from "react";
import axios from "axios";

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
  }

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
        <p></p>
        <form onSubmit={handleSubmit}>
          <input
            name="input"
            type="text"
            placeholder="Enter Your Transcription"
            value={userInput}
            onChange={handleInputChange}
          ></input>
          <button type="submit">Next</button>
        </form>
      </div>
    )
  );
};

export default TranscriptionPage;

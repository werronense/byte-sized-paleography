import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import "./TranscriptionPage.scss";

import Btn from "../../components/Btn/Btn";

const { VITE_API_BASE_URL } = import.meta.env;

const TranscriptionPage = () => {
  const [text, setText] = useState({});
  const [userInput, setUserInput] = useState("");

  // get the authentication token from sessionStorage
  const { token } = sessionStorage;

  const navigate = useNavigate();

  const getText = async () => {
    try {
      const response = await axios.get(`${VITE_API_BASE_URL}/api/text`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setText(response.data);
    } catch (err) {
      console.error("GET request to /api/text failed: ", err);
    }
  };

  const updateUsersTexts = async () => {
    try {
      await axios.post(
        `${VITE_API_BASE_URL}/api/user/text`,
        { textId: text.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Request to POST /api/user/text failed: ", err);
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // POST /api/user/text
    await updateUsersTexts();

    // GET /api/text
    await getText();
  };

  const handleClick = async () => {
    if (userInput === text.transcription) {
      // POST /api/user/text
      await updateUsersTexts();
    }

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
            <Btn
              btnType="button"
              btnText="Home"
              btnDisabled={false}
              clickHandler={handleClick}
            />
            <Btn
              btnType="submit"
              btnText="Next"
              btnModifier="success"
              btnDisabled={userInput !== text.transcription}
            />
          </div>
        </form>
      </div>
    )
  );
};

export default TranscriptionPage;

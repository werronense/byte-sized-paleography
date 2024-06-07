import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import "./TranscriptionPage.scss";

import Btn from "../../components/Btn/Btn";

const { VITE_API_BASE_URL } = import.meta.env;

const TranscriptionPage = () => {
  const [text, setText] = useState({});
  const [userScore, setUserScore] = useState("");
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

  const getUserScore = async () => {
    try {
      const response = await axios.get(`${VITE_API_BASE_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserScore(response.data.score);
    } catch (err) {
      console.error("GET request to /api/profile failed: ", err);
    }
  }

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
      console.error("POST request to /api/user/text failed: ", err);
    }
  };

  const updateUserScore = async () => {
    try {
      const response = await axios.patch(
        `${VITE_API_BASE_URL}/api/users/score`,
        { score: text.point_value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserScore(response.data.newTotal);
    } catch (err) {
      console.error("POST request to /api/users/score failed: ", err);
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // POST /api/user/text
    await updateUsersTexts();

    // POST /api/users/score
    await updateUserScore();

    // GET /api/text
    await getText();
  };

  const handleClick = async () => {
    if (userInput === text.transcription) {
      // POST /api/user/text
      await updateUsersTexts();

      // POST /api/users/score
      await updateUserScore();
    }

    navigate("/profile");
  };

  useEffect(() => {
    // redirect unauthorized users to the login page
    if (!token) return navigate("/login");

    getUserScore();
    getText();
  }, []);

  useEffect(() => {
    // reset user input when a new text loads
    setUserInput("");
  }, [text]);

  return (
    text && (
      <div className="transcription">
        <div className="transcription__content-container">
          <div className="transcription__scores">
            <p>Your current score is <span className="bold">{userScore} points</span>.</p>
            <p>This text is worth <span className="bold">{text.point_value} points</span>.</p>
          </div>
          <div className="transcription__image-display">
            <img
              className="transcription__image"
              src={`${VITE_API_BASE_URL}/images/${text.image_url}`}
              alt=""
            />
          </div>
          <p className="transcription__text">
            {userInput?.split("").map((letter, i) => (
              <span
                key={uuidv4()}
                className={`transcription__letter ${
                  letter === text.transcription[i]
                    ? ""
                    : "transcription__letter--error"
                }`}
              >
                {letter}
              </span>
            ))}
          </p>
          <form className="transcription__interface" onSubmit={handleSubmit}>
            <input
              className="transcription__input"
              name="input"
              type="text"
              value={userInput}
              onChange={handleInputChange}
              autoFocus={true}
              autoComplete="off"
            ></input>
            <div className="transcription__controls">
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
          <section>
            <h2>Instructions</h2>
            <ol>
              <li>Start typing the letters you see in the image</li>
              <li>The feedback section will display what you type</li>
              <li>Change the incorrect (red) letters until you get them right</li>
            </ol>
          </section>
          <section>
            <h2>Hints</h2>
            <ul>
              <li>The words are in Latin, so don't expect to understand them!</li>
              <li>All letters are lowercase</li>
              <li>This script uses 'u' instead of 'v'</li>
              <li>The letters 'u' and 'n' look very similar</li>
              <li>An 'm' and 'in' look almost identical</li>
              <li>The letters 'l' and 'i' look similar, but 'l' is a little taller</li>
              <li>There's a special tall 's' that looks like an 'f'</li>
            </ul>
          </section>
        </div>
      </div>
    )
  );
};

export default TranscriptionPage;

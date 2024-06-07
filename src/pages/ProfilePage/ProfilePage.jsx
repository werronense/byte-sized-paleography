import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./ProfilePage.scss";

import Btn from "../../components/Btn/Btn";

const { VITE_API_BASE_URL } = import.meta.env;

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const { token } = sessionStorage;

    // redirect unauthorized users to the login page
    if (!token) return navigate("/login");

    // query database and set user with useEffect on page load
    const getUser = async () => {
      try {
        const response = await axios.get(`${VITE_API_BASE_URL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (err) {
        console.error("GET request to /api/profile failed: ", err);
      }
    };

    // query database and set leaderboard with useEffect on page load
    const getLeaderboard = async () => {
      try {
        const response = await axios(`${VITE_API_BASE_URL}/api/leaderboard`);
        setLeaderboard(response.data);
      } catch (err) {
        console.error("GET request to /api/leaderboard failed: ", err);
      }
    };

    getLeaderboard();
    getUser();
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-page__content-container">
        <h1>Profile Page</h1>
        <div>
          <p>{user.username}</p>
          <p>{user.score}</p>
        </div>
        <div>
          <ul>
            {leaderboard?.map((topUser) => (
              <li key={topUser.id}>
                <span>{topUser.username}</span>
                <span>{`${topUser.score} pts`}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="profile-page__buttons">
        <Btn
            btnType="button"
            btnText="Edit Profile"
            btnDisabled={false}
            clickHandler={() => navigate("/update-profile")}
          />
          <Btn
            btnType="button"
            btnText="Play Game!"
            btnModifier="success"
            btnDisabled={false}
            clickHandler={() => navigate("/transcribe")}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

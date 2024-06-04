import { useEffect, useState } from "react";
import axios from "axios";

const { VITE_API_BASE_URL } = import.meta.env;

import "./ProfilePage.scss";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // query database and set user with useEffect on page load
    const getUser = async () => {
      const { token } = sessionStorage;

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
    <>
      <h1>Profile Page</h1>
      <div>
        <p>{user.username}</p>
        <p>{user.score}</p>
      </div>
      <div>
        <ul>
          {leaderboard?.map(topUser => (
            <li key={topUser.id}>
              <span>{topUser.username}</span>
              <span>{`${topUser.score} pts`}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProfilePage;

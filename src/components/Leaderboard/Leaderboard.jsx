import "./Leaderboard.scss";

const Leaderboard = ({ leaderboard }) => {
  return (
    <table className="leaderboard">
      <thead className="leaderboard__head">
        <tr>
          <td className="leaderboard__cell">User</td>
          <td className="leaderboard__cell">Score</td>
        </tr>
      </thead>
      <tbody>
        {leaderboard?.map((topUser) => (
          <tr key={topUser.id}>
            <td className="leaderboard__cell">{topUser.username}</td>
            <td className="leaderboard__cell">{topUser.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Leaderboard;

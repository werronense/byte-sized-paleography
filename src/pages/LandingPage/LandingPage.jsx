import { useNavigate, Link } from "react-router-dom";
import "./LandingPage.scss";

import Btn from "../../components/Btn/Btn";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Byte-Sized Medieval Paleography</h1>
      <div>
        <Btn
          btnType="button"
          btnText="Register"
          btnDisabled={false}
          clickHandler={() => navigate("/register")}
        />
        <Btn
          btnType="button"
          btnText="Sign In"
          btnModifier="success"
          btnDisabled={false}
          clickHandler={() => navigate("/login")}
        />
      </div>
      <p>
        Master the skill of reading old handwriting (paleography) the fun and
        easy way! This app helps you learn from real examples by breaking them
        into digestible pieces and giving you instant feedback as you type.
      </p>

      <section>
        <h2>Paleography is a Tough Subject</h2>
        <p>
          Learning to read medieval handwriting is hard. Usually you have to
          learn by transcribing a big chunk of text for homework, and you don't
          know what you did wrong until your professor grades it.
        </p>
        <p>
          You could build up your skills and confidence if you practiced on
          smaller bits of text more frequently, and got feedback right away on
          how you were doing.
        </p>
      </section>

      <section>
        <h2>Who is the App For?</h2>
        <p>
          The user of this app is someone who loves learning. You could be a
          graduate student in a medieval studies program, an amateur handwriting
          enthusiast, or someone who enjoys games and puzzles.
        </p>
        <p>
          If that sounds like you, then{" "}
          <Link to="/register">create a user profile</Link> to get started now!
        </p>
      </section>
    </>
  );
};

export default LandingPage;

import { useNavigate, Link } from "react-router-dom";
import "./LandingPage.scss";

import hellmouth from "../../assets/images/master-of-cleves-hellmouth.jpeg";
import manuscript from "../../assets/images/kloster-heilsbronn-uer-ms-114-fol2v.jpg";

import Btn from "../../components/Btn/Btn";

const LandingPage = () => {
  const { token } = sessionStorage;

  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-page__content-container">
        <h1>Byte-Sized Medieval Paleography</h1>
        <p>
          Master the skill of reading old handwriting (paleography) the fun and
          easy way! This app teaches you with real examples by breaking them
          into digestible pieces and giving you instant feedback as you type.
        </p>

        <figure className="landing-page__figure">
          <img
            className="landing-page__image"
            src={hellmouth}
            alt="Medieval manuscript painting of a hellmouth."
          />
          <figcaption className="landing-page__figcaption">
            Hellmouth, Morgan Library, MS M.945, fol. 107r, via Wikimedia
            Commons
          </figcaption>
        </figure>

        {!token && (
          <div className="landing-page__buttons">
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
        )}

        <section>
          <h2>Paleography is a Tough Subject</h2>
          <p>
            Learning to read medieval handwriting is hard. Usually you have to
            learn by transcribing a big chunk of text for homework, and you
            don't know what you did wrong until your professor grades it.
          </p>
          <p>
            With this app you can build up your skills and confidence by
            practicing on small bits of text, and get feedback right away.
          </p>
        </section>

        <figure className="landing-page__figure">
          <img
            className="landing-page__image"
            src={manuscript}
            alt="A page of medieval text written in Gothic bookhand."
          />
          <figcaption className="landing-page__figcaption">
            Kloster Heilsbronn Bibliothek, UER MS 114, fol. 2v
          </figcaption>
        </figure>

        <section>
          <h2>Who is the App For?</h2>
          <p>
            The user of this app is someone who loves learning. You could be a
            graduate student in a medieval studies program, an amateur
            handwriting enthusiast, or someone who enjoys games and puzzles.
          </p>
          <p>
            If that sounds like you, then{" "}
            <Link to="/register">create a user profile</Link> to get started
            now!
          </p>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;

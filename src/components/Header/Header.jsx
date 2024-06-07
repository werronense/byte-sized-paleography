import { Link, useNavigate } from "react-router-dom";

import "./Header.scss";

import Btn from "../Btn/Btn";

const Header = () => {
  const { token } = sessionStorage;

  const navigate = useNavigate();

  // event handlers
  const handleSignout = () => {
    // clear the user token and redirect to the landing page
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <header className="site-header">
      <Link className="site-header__link" to={token ? "/profile" : "/"}>
        <p className="site-header__title">Byte-Sized Medieval Paleography</p>
      </Link>
      <div className="site-header__group">
        {!token && (
          <>
            <Btn
              btnType="button"
              btnText="Register"
              btnModifier="success"
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
          </>
        )}
        {token && (
          <Btn
            btnType="button"
            btnText="Sign Out"
            btnModifier="success"
            btnDisabled={false}
            clickHandler={handleSignout}
          />
        )}
      </div>
    </header>
  );
};

export default Header;

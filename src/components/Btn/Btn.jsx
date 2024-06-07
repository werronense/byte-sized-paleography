import "./Btn.scss";

const Btn = ({ btnType, btnModifier, btnText, btnDisabled, clickHandler }) => {
  return (
    <button
      type={btnType}
      className={`btn ${btnModifier ? ("btn--" + btnModifier) : ""}`}
      onClick={clickHandler}
      disabled={btnDisabled}
    >
      {btnText}
    </button>
  );
};

export default Btn;

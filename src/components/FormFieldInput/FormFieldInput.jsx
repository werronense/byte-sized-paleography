import "./FormFieldInput.scss";

const FormFieldInput = ({
  labelText,
  inputType,
  inputNameId,
  inputPlaceholder,
  inputValue,
  changeHandler,
  isRequired,
}) => {
  return (
    <div className="form-field-input">
      <label className="form-field-input__label" htmlFor={inputNameId}>
        {labelText}
      </label>
      <input
        className="form-field-input__input"
        type={inputType}
        name={inputNameId}
        id={inputNameId}
        placeholder={inputPlaceholder}
        value={inputValue}
        onChange={changeHandler}
        required={isRequired}
      />
    </div>
  );
};

export default FormFieldInput;

import "./FormFieldInput.scss";

const FormFieldInput = ({
  labelText,
  inputType,
  inputNameId,
  inputPlaceholder,
  inputValue,
  changeHandler,
  isRequired
}) => {
  return (
    <div>
      <label htmlFor={inputNameId}>{labelText}</label>
      <input
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

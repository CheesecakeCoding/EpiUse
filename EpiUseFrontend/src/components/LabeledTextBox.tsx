interface LabledTextBoxProps {
  type?: "text" | "date" | "number";
  placeholder?: String;
  id: String;
  className?: String;
  required?: Boolean;
  defaultValue?: String;
}

function LabledTextBox({
  children,
  type = "text",
  placeholder = "",
  id,
  className = "",
  required = false,
  defaultValue = "",
}) {
  return (
    <div className="row">
      <div className="col">
        <label htmlFor={id} className="form-label">
          {children}:
        </label>
      </div>

      <div className="col">
        <input
          type={type}
          placeholder={placeholder}
          id={id}
          name={id}
          className={className}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
}

export default LabledTextBox;

interface LabledTextBoxProps {
  children?: string;
  type?: "text" | "date" | "number";
  placeholder?: string;
  id: string;
  className?: string;
  required?: boolean;
  defaultValue?: string;
}

function LabledTextBox({
  children,
  type = "text",
  placeholder = "",
  id,
  className = "",
  required = false,
  defaultValue = "",
}: LabledTextBoxProps) {
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

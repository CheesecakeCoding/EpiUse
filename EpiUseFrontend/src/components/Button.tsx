self.$RefreshReg$ = () => {};
self.$RefreshSig$ = () => () => {};


interface buttonProps {
  children: String;
  color?: "primary" | "secondary" | "danger" | "outline-secondary";
  onClick: () => void;
  size?: "btn-lg" | "btn-sm";
  block: "" | "btn-block";
  float: "float-left" | "float-right" | "float-none";
  type: "submit" | "button" | "reset";
}

export const Button = ({
  children,
  color = "primary",
  onClick,
  size = "btn-lg",
  block = "",
  float = "float-right",
  type = "button",
}: buttonProps) => {
  return (
    <button
      className={"btn btn-" + color + " " + size + " " + float}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

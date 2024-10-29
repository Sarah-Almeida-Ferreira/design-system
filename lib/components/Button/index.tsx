import { ButtonHTMLAttributes } from "react";
import "./index.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  textOnly?: boolean;
  size?: "small" | "medium" | "large";
  textAlign?: "left" | "right" | "center";
  label: string;
  fullWidth?: boolean;
  onClick?: () => void;
}

export const Button = ({
  primary = false,
  textOnly = false,
  fullWidth = false,
  size = "medium",
  textAlign = "center",
  label,
  ...props
}: ButtonProps) => {
  const mode = primary ? "primary" : "secondary";
  const width = fullWidth ? "full-width" : "";
  const isTextOnly = textOnly ? "text-only" : "";

  return (
    <button
      type="button"
      className={["button", size, mode, width, isTextOnly, `align-text-${textAlign}`].join(" ")}
      style={{...props.style}}
      {...props}
    >
      {label}
    </button>
  );
};

import { ChangeEvent, InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import "./index.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = ({ id, label, type, name, placeholder, value, onChange, ...props }: InputProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e);
  };

  useEffect(() => {
    const inputEl = inputRef.current;
    inputEl?.addEventListener("focus", handleFocus);
    inputEl?.addEventListener("blur", handleBlur);

    return () => {
      inputEl?.removeEventListener("focus", handleFocus);
      inputEl?.removeEventListener("blur", handleBlur);
    };
  }, []);

  return (
    <div className="input-field">
      <label className={`input-label ${inputValue || isFocused ? "focused" : ""}`} htmlFor={id}>
        {label}
      </label>
      <div className="input-wrapper">
        <input
          id={id}
          className="input"
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          name={name}
          value={value}
          ref={inputRef}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder={inputValue || isFocused ? placeholder : ""}
          {...props}
          data-testid="input"
        />
        {type === "password" && (
          <button
            type="button"
            className="toggle-password"
            data-testid="toggle-password-button"
            onClick={handleTogglePassword}
          >
            {
              showPassword ?
                <FaEyeSlash /> :
                <FaEye />
            }
          </button>
        )}
      </div>
    </div>
  );
};
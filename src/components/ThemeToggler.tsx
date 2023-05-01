import React from "react";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";

const ThemeToggler = () => {
  const { changeTheme } = useActions();
  const { theme } = useAppSelector((state) => state.marvelApp);

  const checkbox = document.getElementById("themeToggler") as HTMLInputElement;

  if (checkbox !== null) {
    checkbox.checked = theme === "dark" ? true : false;
  }

  return (
    <label className="toggleDarkBtn">
      <input
        type="checkbox"
        id="themeToggler"
        onClick={() => {
          changeTheme(theme === "light" ? "dark" : "light");
        }}
      />
      <span className="slideBtnTg round"></span>
    </label>
  );
};

export default ThemeToggler;

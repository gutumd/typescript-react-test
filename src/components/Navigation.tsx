import React from "react";

import ThemeToggler from "./ThemeToggler";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";

const Navigation = () => {
  const { changeView } = useActions();
  const { theme } = useAppSelector((state) => state.marvelApp);

  return (
    <nav
      className={`${
        theme === "dark" ? "dark:bg-gray-900" : ""
      } flex justify-between items-center h-[100px] px-5 shadow-md bg-gray-500 text-white`}
    >
      <h3 className="text-white font-bold uppercase text-lg">Comics App</h3>
      <span className="flex justify-between items-center">
        <button
          onClick={() => changeView("grid")}
          className="mr-2 bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded text-xs font-medium uppercase"
        >
          Grid View
        </button>
        <button
          onClick={() => changeView("list")}
          className="mr-2 bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded text-xs font-medium uppercase"
        >
          List View
        </button>
        <ThemeToggler />
      </span>
    </nav>
  );
};

export default Navigation;

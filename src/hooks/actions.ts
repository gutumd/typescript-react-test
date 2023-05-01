import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { marvelAppActions } from "../store/marvel/marvel.slice";

const actions = {
  ...marvelAppActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};

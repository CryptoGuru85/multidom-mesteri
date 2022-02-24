import { combineReducers } from "redux";
import auth from "./auth";
import errors from "./errors";
import profile from "./profile";
import registration from "./registration";

export default combineReducers({
  auth,
  errors,
  profile,
  registration,
});

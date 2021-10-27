import { combineReducers } from "redux";
import userLoginReducer from "./user/userLoginReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userLoginReducer,
});

export default persistReducer(persistConfig, rootReducer);

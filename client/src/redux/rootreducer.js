import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import { AuthReducer } from './reducers/Auth/authReducer'
import { prescriptionData } from './reducers/Prescription/prescriptionReducer'
import { hospitalReducer } from './reducers/hospital/hospitalReducer'
// import {
//   personDetailsReducer,
//   reportDetailsReducer,
// } from "./reducers/petientdetailsReducer";
// import { loginDetailsReducer } from "./reducers/loginDeyailsReducer";

import storage from "redux-persist/lib/storage";
const rootReducer = combineReducers({
  AuthReducer,prescriptionData,hospitalReducer
  // personDetails: personDetailsReducer,
  // reportDetails: reportDetailsReducer,
  // loginDetails: loginDetailsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["personDetails", "reportDetails"],
};

export default persistReducer(persistConfig, rootReducer);

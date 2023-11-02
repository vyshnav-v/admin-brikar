import { combineReducers } from "redux";
import { configureStore} from "@reduxjs/toolkit";
import loginReducer from "./Reducers/loginReducer";
import commonReducer from "./Reducers/commonReducer";
import workTypeReducer from "./Reducers/workTypeReducer";

const rootReducer = combineReducers({
    login: loginReducer,
    common : commonReducer,
    workType : workTypeReducer

});

const store = configureStore({
    reducer: rootReducer
  });

export default store;

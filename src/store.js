import { combineReducers } from "redux";
import { configureStore} from "@reduxjs/toolkit";
import loginReducer from "./Reducers/loginReducer";
import commonReducer from "./Reducers/commonReducer";
import workTypeReducer from "./Reducers/workTypeReducer";
import educationReducer from "./Reducers/educationReducer";

const rootReducer = combineReducers({
    login: loginReducer,
    common : commonReducer,
    workType : workTypeReducer,
    education:educationReducer

});

const store = configureStore({
    reducer: rootReducer
  });

export default store;

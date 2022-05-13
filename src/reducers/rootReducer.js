import { combineReducers } from "redux";
import sideBarReducer from "./sideBarReducer";
import userReducer from "./userReducer";



const rootReducer = combineReducers(
    {
        SideBar: sideBarReducer,
        User: userReducer,
    }
);

export default rootReducer;
import { combineReducers } from "redux";
import sideBarReducer from "./sideBarReducer";



const rootReducer = combineReducers(
    {
        SideBar: sideBarReducer,
    }
);

export default rootReducer;
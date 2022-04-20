import { Fragment } from "react";
import NavigationBar from "./NavigationBar";
import SideBar from "./SideBar";

export default function App(props){
    return (
        <Fragment>
            <div className="flex">
                <SideBar></SideBar>
                <div className="max-w-[1340px] min-w-0 w-full mx-auto flex flex-col">
                    <NavigationBar></NavigationBar>
                    <div className="py-10 px-3">
                        {props.children}
                    </div>                         
                </div>
                
            </div>
        </Fragment>
    );
};
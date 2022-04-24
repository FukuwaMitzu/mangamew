import { Fragment } from "react";
import NavigationBar from "./NavigationBar";
import SideBar from "./SideBar";

export default function App(props) {
    return (
        <Fragment>
            <div className="flex">
                <SideBar></SideBar>
                <div className="min-w-0 w-full flex flex-col">
                    <NavigationBar></NavigationBar>
                    <div className="max-w-[1340px] mx-auto w-full py-10 px-3">
                        {props.children}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
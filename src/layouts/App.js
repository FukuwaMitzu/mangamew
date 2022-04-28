import Head from "next/head";
import { Fragment } from "react";
import NavigationBar from "./NavigationBar";
import SideBar from "./SideBar";

export default function App(props) {
    return (
        <Fragment>
        <Head>
            <title>MangaMew - A Manga Reader</title>
        </Head>
            <div className="flex">
                <SideBar></SideBar>
                <div className="min-w-0 w-full flex flex-col">
                    <NavigationBar></NavigationBar>
                    <div className="max-w-[1340px] mx-auto w-full pb-20 px-5">
                        {props.children}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
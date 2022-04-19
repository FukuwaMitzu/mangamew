import Link from "next/link";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../components/Avatar";
import NavigationButton from "../components/NavigationButton";
import SearchBar from "../components/SearchBar";
import { onSideBarTrigger } from "../reducers/sideBarReducer";
export default function NavigationBar() {
    const storeDispatch = useDispatch();
    const sideBarState = useSelector((state) => state.SideBar);
    const triggerSideBar = useCallback(() => {
        storeDispatch(onSideBarTrigger())
    }, []);

    return (
        <div className="flex items-center justify-between w-full sticky inset-0 z-40 bg-dominant py-2">
            <div className="flex items-center">
                {
                    !sideBarState.isActive &&
                    <button className="flex items-center mr-5" onClick={triggerSideBar}>
                        <span className="material-icons">menu</span>
                    </button>
                }
                <Link href="/">
                    <a className="transition-all">
                        <h1 className="font-bold text-xl">MANGAMEW</h1>
                    </a>
                </Link>
            </div>
            <div className="hidden text-sm max-w-max lg:block transition-all">
                <SearchBar size={55}></SearchBar>
            </div>
            <div className="flex items-center">
                <div className="hidden text-sm lg:flex gap-8">
                    <NavigationButton href="/" name="Home" />
                    <NavigationButton href="/manga" name="Manga list" />
                    <NavigationButton href="/libary" name="Libary" />
                </div>
                <div className="hidden lg:block w-[48px] h-[48px] ml-10">
                    <Avatar></Avatar>
                </div>
            </div>
        </div>
    );
}
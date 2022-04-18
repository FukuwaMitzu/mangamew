import Link from "next/link";
import Avatar from "../components/Avatar";
import NavigationButton from "../components/NavigationButton";
import SearchBar from "../components/SearchBar";

export default function NavigationBar(){
    return (
        <div className="flex items-center justify-between w-full sticky inset-0 z-50 bg-dominant py-2">
            <div className="flex items-center">
                <button className="flex items-center mr-5">
                    <span className="material-icons">menu</span>
                </button>
                <Link href="/">
                    <a>
                        <h1 className="font-bold text-xl">MANGAMEW</h1>
                    </a>
                </Link>
            </div>
            <div className="hidden text-sm max-w-max lg:block">
                <SearchBar size={55}></SearchBar>
            </div>
            <div className="hidden text-sm lg:flex gap-8">
                <NavigationButton href="/" name="Home"/>
                <NavigationButton href="/manga" name="Manga list"/>
                <NavigationButton href="/libary" name="Libary"/>
            </div>
            <div className="hidden lg:block w-[48px] h-[48px]">
                <Avatar></Avatar>
            </div>
        </div>
    );
}
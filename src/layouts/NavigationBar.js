import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState} from "react";
import { useDispatch} from "react-redux";
import Avatar from "src/components/Avatar";
import NavigationButton from "src/components/NavigationButton";
import SearchBar from "src/components/SearchBar";
import useAuth from "src/hooks/useAuth";
import { onSideBarTrigger } from "src/reducers/sideBarReducer";


export default function NavigationBar() {
    const router = useRouter();
    const auth = useAuth();
    const storeDispatch = useDispatch();
   

    useEffect(()=>{
        
    });


    const triggerSideBar = useCallback(() => {
        storeDispatch(onSideBarTrigger())
    }, [storeDispatch]);


    return (
        <div className="bg-dominant sticky inset-0 z-40 bg-opacity-95">
            <div className="max-w-[1340px] mx-auto grid grid-cols-10 gap-3 items-center w-full py-3 px-5">
                <div className="col-span-2 flex gap-3">
                    <button className="leading-[0]" onClick={triggerSideBar}>
                        <span className="material-icons-outlined">menu</span>
                    </button>
                    <Link href="/">
                        <a>
                            <h1 className="font-bold text-xl">MANGAMEW</h1>
                        </a>
                    </Link>
                </div>
                <div className="hidden text-sm lg:block transition-all col-span-5 w-full">
                    <SearchBar></SearchBar>
                </div>
                <div className="flex items-center col-span-3 gap-5 justify-self-end">
                    <div className="hidden text-sm lg:flex gap-10">
                        <NavigationButton href="/" name="Home" />
                        <NavigationButton href="/manga" name="Manga list" />
                        <NavigationButton href="/library" name="Library" />
                    </div>
                    <div className="hidden lg:block w-[40px] h-[40px]">
                        <Avatar></Avatar>
                    </div>
                </div>
            </div>
        </div>

    );
}
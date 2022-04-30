import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../components/Avatar";
import NavigationButton from "../components/NavigationButton";
import SearchBar from "../components/SearchBar";
import { onSideBarTrigger } from "../reducers/sideBarReducer";


export default function NavigationBar() {
    const router = useRouter();
    const storeDispatch = useDispatch();
    const sideBarState = useSelector((state) => state.SideBar);
    const navbarScrollRef = useRef();


    const triggerSideBar = useCallback(() => {
        storeDispatch(onSideBarTrigger())
    }, [storeDispatch]);


    useEffect(()=>{
        navbarScrollRef.current.style.transform = `scaleX(${0})`;
        const scrollAtRealTime = (e)=>{
            let bodyScrollY = (window.scrollY / (document.documentElement.offsetHeight - window.innerHeight));
            navbarScrollRef.current.style.transform = `scaleX(${bodyScrollY})`;
        }
        window.addEventListener('scroll', scrollAtRealTime);
        return ()=>{
            window.removeEventListener('scroll', scrollAtRealTime);
        }
    }, [router]);


    return (
        <div className="bg-dominant sticky inset-0 z-40 bg-opacity-95">
            <div className="w-full origin-left absolute top-0 border-b-2 border-b-primary" ref={navbarScrollRef}></div>
            <div className="max-w-[1340px] mx-auto grid grid-cols-10 gap-3 items-center w-full pt-3 pb-4 px-5">
                <div className="col-span-2 flex gap-3">
                    {
                        !sideBarState.isActive &&
                        <button className="leading-[0]" onClick={triggerSideBar}>
                            <span className="material-icons-outlined">menu</span>
                        </button>
                    }
                    <Link href="/">
                        <a className="transition-all">
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
                        <NavigationButton href="/libary" name="Libary" />
                    </div>
                    <div className="hidden lg:block w-[40px] h-[40px]">
                        <Avatar></Avatar>
                    </div>
                </div>
            </div>
        </div>

    );
}
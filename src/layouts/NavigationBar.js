import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useRef, useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import Avatar from "src/components/Avatar";
import Button from "src/components/Button";
import NavigationButton from "src/components/NavigationButton";
import SearchBar from "src/components/SearchBar";
import useAuth from "src/hooks/useAuth";
import { onSideBarTrigger } from "src/reducers/sideBarReducer";
import { resetAuth } from "src/reducers/userReducer";


export default function NavigationBar() {
    const router = useRouter();
    const auth = useAuth();
    const storeDispatch = useDispatch();
    const [focus, setFocus] = useState(false);
    const focusRef = useRef();

    const goToSearchSite = (searchTitle) =>{
        router.push({
            pathname:"/search",
            query:{
                title:searchTitle
            }
        });
    }


    useEffect(()=>{
        if(auth.isAuthenticated){
            function onClick(e){
               try{
                if(focusRef.current.contains(e.target)){
                   
                    setFocus(!focus);
                }
                else setFocus(false);
               }catch{}
            }
            window.addEventListener('click', onClick);
            return ()=>{
                window.removeEventListener('click', onClick);
            }
        }
    }, [router, focus]);


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
                <div className="text-sm col-span-5 w-full">
                    <div className="hidden lg:block">
                        <SearchBar onSearch={goToSearchSite}></SearchBar>
                    </div>                  
                </div>
                <div className="flex items-center col-span-3 gap-5 justify-self-end">
                    <div className="hidden text-sm lg:flex gap-10">
                        <NavigationButton href="/" name="Home" />
                        <NavigationButton href="/library" name="Library" />
                    </div>
                    {
                        auth.isAuthenticated ?
                            <div className="hidden lg:block w-[40px] h-[40px] relative" ref={focusRef}>
                                <div className="w-full, h-full cursor-pointer"><Avatar></Avatar></div>
                                <div className={`absolute top-full mt-3 bg-dominant min-h-fit shadowbox p-3 ${focus? "":"hidden"}`}>
                                    <Button onClick={()=>{storeDispatch(resetAuth()); setFocus(false)}}>Logout</Button>
                                </div>
                            </div>
                        :
                        <Link href={"/login"}>
                            <a>
                                <Button>Login</Button>
                            </a>
                        </Link>
                    }
                </div>
            </div>
        </div>
    );
}
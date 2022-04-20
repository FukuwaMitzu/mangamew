import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function NavigationButton({name, href}){
    const [isActive, setIsActive] = useState(false);
    const router = useRouter();
    useEffect(()=>{
        if(router.pathname==href)setIsActive(true);
        else setIsActive(false);
    }, [router.pathname, href]);
    return (
        <Link href={href}>
            <a className="group max-w-max flex flex-col">
                <span className={`font-bold ${isActive?'text-primary':''}`}>{name}</span>
                <span className="group-hover:w-full bg-primary h-[2px] origin-center transition-all scale-0 group-hover:scale-100"></span>
            </a>
        </Link>
    );
}
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { onSideBarTrigger } from "../reducers/sideBarReducer";

const ClassActive = (isActive) => {
    if (isActive) return "bg-primary text-dominant active:bg-primary-dark";
    return "hover:bg-grey active:bg-grey-dark";
}

export default function SideBarButton({ href, children }) {
    const [state, setState] = useState({ isActive: false });
    const router = useRouter();
    const storeDispatch = useDispatch();

    const triggerSideBar = useCallback(() => {
        storeDispatch(onSideBarTrigger());
    },[storeDispatch]);

    useEffect(() => {
        if (href == router.pathname) setState({ isActive: true });
        else setState({ isActive: false });
    }, [router, href]);

    return (
        <Link href={href || "/"}>
            <a onClick={triggerSideBar}>
                <button className={`transition-colors w-full text-left p-2 rounded-md ${ClassActive(state.isActive)}`}>
                    {children}
                </button>
            </a>
        </Link>
    )
}
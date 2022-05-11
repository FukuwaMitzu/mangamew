import { Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import SideBarButton from "src/components/SideBarButton";
import { onSideBarTrigger } from "src/reducers/sideBarReducer";
const sideBarWidth = 250;

function SideBar(props) {
    const storeDispatch = useDispatch();
    const triggerSideBar = ()=>{
        storeDispatch(onSideBarTrigger());
    }
    return (
        <Fragment>
            <div className={`fixed inset-0 shade w-full h-full z-50 ${props.isActive? 'animate-fade-in':'hidden'}`} onClick={triggerSideBar}></div>
            <div className="fixed transition-all bg-dominant z-50 flex-shrink-0" style={{width: sideBarWidth, marginLeft: props.isActive? 0 : -sideBarWidth}}>
                <ul className="sticky inset-0 h-screen overflow-y-auto overscroll-contain content px-3 py-4">
                    <li className="flex mb-3">
                        <div className="flex-1"></div>
                        <div className="flex-grow-0 flex-shrink-0">
                            <button onClick={triggerSideBar}>
                                <span className="material-icons-outlined">close</span>
                            </button>
                        </div>
                    </li>
                    <li>
                        <SideBarButton href="/">
                            <div className="flex items-center gap-2">
                                <span className="material-icons-outlined">home</span>
                                <span className="font-bold">Home</span>
                            </div>
                        </SideBarButton>
                    </li>
                    <hr className="my-3"></hr>
                    <li>
                        <SideBarButton href="/manga">
                            <div className="flex items-center gap-2">
                                <span className="material-icons-outlined">local_library</span>
                                <span className="font-bold">Manga</span>
                            </div>
                        </SideBarButton>
                        <ul className="pl-2 flex flex-col gap-1 text-sm">
                            <li>
                                <SideBarButton href="/search">Advanced Search</SideBarButton>
                            </li>
                            <li>
                                <SideBarButton href="/manga/latest">Latest Update</SideBarButton>
                            </li>
                        </ul>
                    </li>
                    <hr className="my-3"></hr>
                    <li>
                        <SideBarButton href="/libary">
                            <div className="flex items-center gap-2">
                                <span className="material-icons-outlined">class</span>
                                <span className="font-bold">Libary</span>
                            </div>
                        </SideBarButton>
                        <ul className="pl-2 flex flex-col gap-1 text-sm">
                            <li>
                                <SideBarButton href="/libary/updates">Updates</SideBarButton>
                            </li>
                            <li>
                                <SideBarButton href="/libary/history">History</SideBarButton>
                            </li>
                            <li>
                                <SideBarButton href="/libary/bookmarks">Bookmarks</SideBarButton>
                            </li>
                        </ul>
                    </li>
                    <hr className="my-3"></hr>
                    <li>
                        <SideBarButton href="/about">
                            <div className="flex items-center gap-2">
                                <span className="material-icons-outlined">help_outline</span>
                                <span className="font-bold">About us</span>
                            </div>
                        </SideBarButton>
                    </li>
                </ul>
            </div>
        </Fragment>
    );
}

const mapStateWithProps = (state)=>{
    return {
        isActive: state.SideBar.isActive
    }
}
export default connect(mapStateWithProps)(SideBar);
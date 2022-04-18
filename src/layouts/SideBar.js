import SideBarButton from "../components/SideBarButton";

export default function SideBar(props) {
    return (
        <div className="w-[250px] bg-dominant">
            <ul className="sticky inset-0 h-screen overflow-y-scroll overscroll-contain content px-3 py-4">
                <li>
                    <SideBarButton>
                        <div className="flex items-center gap-2">
                            <span className="material-icons-outlined">home</span>
                            <span className="font-bold">Home</span>
                        </div>
                    </SideBarButton>
                </li>
                <hr className="my-3"></hr>
                <li>
                    <SideBarButton>
                        <div className="flex items-center gap-2">
                            <span className="material-icons-outlined">local_library</span>
                            <span className="font-bold">Manga</span>
                        </div>
                    </SideBarButton>
                    <ul className="pl-2 flex flex-col gap-1 text-sm">
                        <li>
                            <SideBarButton>Advanced Search</SideBarButton>
                        </li>
                        <li>
                            <SideBarButton>Latest Update</SideBarButton>
                        </li>
                    </ul>
                </li>
                <hr className="my-3"></hr>
                <li>
                    <SideBarButton>
                        <div className="flex items-center gap-2">
                            <span className="material-icons-outlined">class</span>
                            <span className="font-bold">Libary</span>
                        </div>
                    </SideBarButton>
                    <ul className="pl-2 flex flex-col gap-1 text-sm">
                        <li>
                            <SideBarButton>Updates</SideBarButton>
                        </li>
                        <li>
                            <SideBarButton>History</SideBarButton>
                        </li>
                        <li>
                            <SideBarButton>Bookmarks</SideBarButton>
                        </li>
                    </ul>
                </li>
                <hr className="my-3"></hr>
                <li>
                    <SideBarButton>
                        <div className="flex items-center gap-2">
                            <span className="material-icons-outlined">help_outline</span>
                            <span className="font-bold">About us</span>
                        </div>
                    </SideBarButton>
                </li>
            </ul>
        </div>
    );
}
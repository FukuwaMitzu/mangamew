export default function SideBarButton({href, children}){
    return (
        <button className="hover:bg-grey transition-all w-full text-left p-2 rounded-xl active:bg-grey-dark">
            {children}
        </button>
    )
}
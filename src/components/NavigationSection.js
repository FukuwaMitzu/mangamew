import Link from "next/link";
export default function NavigationSection({title, href, children}){
    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between">
                <div>
                    <div className="bg-primary rounded-xl h-1 w-10"></div>
                    <h1 className="font-bold uppercase text-2xl">{title}</h1>
                </div>
                <div className="flex-grow-0 flex-shrink-0 group">
                    <Link href={href||"/"}>
                        <a>
                            <span className="material-icons-outlined transition-transform text-4xl group-hover:translate-x-1">east</span>
                        </a>
                    </Link>
                </div>
            </div>
            <div className="pt-5">
                {children}
            </div>
        </div>
    );
}
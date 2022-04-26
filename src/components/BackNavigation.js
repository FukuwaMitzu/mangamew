import Link from "next/link";
export default function BackNavigation({ href, title }) {
    return (
        <div className="flex">
            <Link href={href}>
                <a className="flex items-center group">
                    <span className="group-hover:-translate-x-1 transition-all material-icons-outlined mr-5" title="Go back">arrow_back_ios</span>
                </a>
            </Link>
            <h1 className="font-bold uppercase text-xl">{title}</h1>
        </div>
    );
}
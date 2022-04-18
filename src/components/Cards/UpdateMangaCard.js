import Image from "next/image";
import Link from "next/link";

const MakeChapterLink = (chapter) => {
    return "/chapter/" + (chapter || "");
}


export default function UpdateMangaCard({ id, title, chapter, cover, date }) {
    return (
        <Link href={MakeChapterLink(chapter)}>
            <a>
                <div className="group max-w-[300px] w-full h-[217px] overflow-hidden rounded-xl relative shadowbox">
                    <div className="relative h-full w-full bg-grey">
                        <Image layout="fill" src={cover || "/"} className="group-hover:scale-110 transition-all object-cover"></Image>
                    </div>
                    <div className="bg-secondary group-hover:bg-opacity-95 bg-opacity-90 h-[100px] absolute flex flex-col bottom-0 rounded-xl px-3 py-2 text-dominant transition-all w-full">
                        <h3 className="line-clamp-2 font-bold text-ellipsis">{title}</h3>
                        <div className="flex-1"></div>
                        <div className="flex flex-grow-0 flex-shrink-0 justify-between items-center text-sm">
                            <div className="font-bold">Chapter <span className="text-primary">{chapter}</span></div>
                            <div className="flex items-center gap-1 opacity-60">
                                <span className="material-icons text-base">schedule</span>
                                <span>{date}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    );
}
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const MakeChapterLink = (chapter) => {
    return "/chapter/" + (chapter || "");
}


function UpdateChapterCard({ id, title, chapter, readableAt, manga }) {
    const date = dayjs(readableAt);
    return (
        <div className="group h-full min-h-[217px] overflow-hidden rounded-md relative shadowbox" style={{contentVisibility:"auto"}}>
            <Link href={`/manga/${manga.id}`}>
                <a className="relative h-full w-full bg-grey block">
                    {manga && manga.cover &&
                        <Image layout="fill" src={`https://uploads.mangadex.org/covers/${manga.id}/${manga.cover}.256.jpg`} objectFit={"cover"} draggable="false" title={manga.title} alt={manga.title}></Image>
                    }
                </a>
            </Link>
            <div className="bg-secondary group-hover:bg-opacity-95 bg-opacity-90 h-[100px] absolute flex flex-col justify-between bottom-0 rounded-md px-3 py-2 text-dominant transition-all w-full">
                {
                    manga.cover &&
                    <Fragment>
                        <Link href={`/manga/${manga.id}`}>
                            <a className="hover:text-primary transition-colors w-fit font-bold" title={manga.title}>
                                <h2 className="line-clamp-2">{manga.title}</h2>
                            </a>
                        </Link>
                        <div className="flex justify-between items-center text-sm">
                            <Link href={MakeChapterLink(id)}>
                                <a className="flex items-center gap-2" target={"_blank"} title={`Chapter ${chapter} - ${title}`}>
                                    <h3 className="font-bold">
                                        {chapter? "Chapter" : "Oneshot"} {chapter && <span className="text-primary">{chapter}</span>}
                                    </h3>
                                    <span className="transition-all material-icons-outlined opacity-60">open_in_new</span>
                                </a>
                            </Link>
                            <div className="flex items-center gap-1 opacity-60">
                                <span className="material-icons-outlined text-base">schedule</span>
                                <span>{dayjs().to(date)}</span>
                            </div>
                        </div>
                    </Fragment>
                }
            </div>
        </div>
    );
}

export default React.memo(UpdateChapterCard, (pre, props) => {
    return props.manga.cover === pre.manga.cover;
});
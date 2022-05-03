import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import React from "react";
const MakeChapterLink = (chapter) => {
    return "/chapter/" + (chapter || "");
}


function UpdateChapterCard({ id, title, chapter, readableAt, manga }) {
    const date = new Date(readableAt);
    return (
        <div className="group h-full min-h-[217px] overflow-hidden rounded-md relative shadowbox">
            <Link href={MakeChapterLink(id)}>
                <a>
                    <div className="relative h-full w-full bg-grey">
                        {manga && manga.cover &&
                            <Image layout="fill" src={`https://uploads.mangadex.org/covers/${manga.id}/${manga.cover}.256.jpg`} className="object-cover" title={manga.title} alt={manga.title}></Image>
                        }
                    </div>
                </a>
            </Link>
            <div className="bg-secondary group-hover:bg-opacity-95 bg-opacity-90 h-[100px] absolute flex flex-col bottom-0 rounded-md px-3 py-2 text-dominant transition-all w-full">
                {
                    manga.title &&
                    <Fragment>
                        <Link href={`/manga/${manga.id}`}>
                            <a className="hover:text-primary w-fit font-bold">
                                <h3 className="line-clamp-2">{manga.title}</h3>
                            </a>
                        </Link>
                        <div className="flex-1"></div>
                        <div className="flex flex-grow-0 flex-shrink-0 justify-between items-center text-sm">
                            <div>Chapter <span className="text-primary">{chapter}</span></div>
                            <div className="flex items-center gap-1 opacity-60">
                                <span className="material-icons-outlined text-base">schedule</span>
                                <span>{date.toLocaleDateString('en-US')}</span>
                            </div>
                        </div>
                    </Fragment>
                }
            </div>
        </div>
    );
}

export default React.memo(UpdateChapterCard, (pre, props) => {
    return pre.manga.cover && pre.manga.cover === props.manga.cover
});
import Image from "next/image";
import Link from "next/link";
import TagGroup from "../TagGroup";
import { formatScore, formatAverage, uniqueAuthor } from "../../utilities";
import { Fragment } from "react";



export default function MangaCard({ id, title, tags, authors, artists, cover, status, average, follows }) {
    return (
        <div className="flex gap-5 shadowbox rounded-md overflow-hidden">
            <div className="basis-1/3 flex-shrink-0 max-w-[150px] min-h-[237px] h-full">
                <Link href={`/manga/${id}`}>
                    <a>
                        <div className="relative w-full h-full">
                            <div className="bg-grey animate-pulse w-full h-full absolute inset-0"></div>
                            <Image src={`https://uploads.mangadex.org/covers/${id}/${cover}.512.jpg`} layout="fill" className="object-center object-cover" title={title} alt={title}></Image>
                        </div>
                    </a>
                </Link>
            </div>
            <div className="py-3 pr-3 w-full">
                <div className="flex gap-2">
                    <div>
                        <Link href={`/manga/${id}`}>
                            <a className="hover:text-primary transition-colors"> <h3 className="font-bold line-clamp-2">{title}</h3></a>
                        </Link>
                        <p className="text-sm mt-1"><span className="font-bold text-primary mr-2">#</span>
                            {
                                uniqueAuthor(authors, artists).map(item=>item.name).join(', ')
                            }
                        </p>
                    </div>
                    <div className="flex-1"></div>
                    <div className={`capitalize text-sm flex items-center p-1 sm:py-1 sm:px-2 rounded-xl w-fit gap-2 shadow-outline h-fit ${status == "ongoing" ? "shadow-green-400" : status == "hiatus" ? "shadow-yellow-500" : status == "cancelled" ? "shadow-grey-dark" : "shadow-primary"}`}>
                        <div className="relative">
                            <div className={`rounded-xl absolute inset-0  ${status == "ongoing" ? "animate-ping bg-green-400" : ""} w-[10px] h-[10px]`}></div>
                            <div className={`rounded-xl ${status == "ongoing" ? "bg-green-400" : status == "hiatus" ? "bg-yellow-500" : status == "cancelled" ? "bg-grey-dark" : "bg-primary"} w-[10px] h-[10px]`}></div>
                        </div>
                        <span className="hidden sm:block">{status}</span>
                    </div>

                </div>

                <div className={`flex text-sm gap-x-5 mt-1 ${(average!==undefined && follows!==undefined)? "" : "bg-grey animate-pulse h-6 w-28"}`}>
                    <div className="flex items-center">
                        {
                            average!==undefined &&
                            <Fragment>
                                {formatAverage(average)}
                                <span className="material-icons-outlined ml-1 text-star">star_border</span>
                            </Fragment>
                        }
                    </div>
                    <div className={`flex items-center`}>
                        {
                            follows!==undefined &&
                            <Fragment>
                                {formatScore(follows)}
                                <span className="material-icons-outlined text-primary ml-1">bookmark_border</span>
                            </Fragment>
                        }
                    </div>
                </div>
                <div className="mt-3">
                    <TagGroup list={tags}></TagGroup>
                </div>
            </div>
        </div>
    );
};
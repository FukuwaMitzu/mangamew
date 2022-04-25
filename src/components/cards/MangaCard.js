import Image from "next/image";
import Link from "next/link";
import TagGroup from "../TagGroup";
import { formatScore } from "../../utilities";
import { useMemo } from "react";

export default function MangaCard({ id, title, tags, authors, artists, cover, views, bookmarks }) {

    const uniqueAuthor = useMemo(()=> function(au, ar){
        au.concat(ar.filter((item=>{
            return !au.every(author=>author.name==item.name);
        })))
        return au.map(item=>item.name).join(', ');
    }, [authors, artists]);

    return (
        <div className="flex gap-5 shadowbox rounded-xl overflow-hidden">
            <div className="basis-1/3 flex-shrink-0 max-w-[150px] h-[235px]">
                <Link href={`/manga/${id}`}>
                    <a>
                        <div className="relative w-full h-full">
                            <div className="bg-grey animate-pulse w-full h-full absolute inset-0"></div>
                            <Image src={`https://uploads.mangadex.org/covers/${id}/${cover}.256.jpg`} layout="fill" className="object-center object-cover" title={title} alt={title}></Image>
                        </div>     
                    </a>
                </Link>
            </div>
            <div className="py-3 pr-3">
                <Link href={`/manga/${id}`}>
                    <a className="hover:text-primary transition-colors"> <h3 className="font-bold line-clamp-2">{title}</h3></a>
                </Link>
                <p className="text-sm mt-1"><span className="font-bold text-primary mr-2">#</span>
                    {
                        uniqueAuthor(authors, artists)
                    }
                </p>
                <div className="flex text-sm gap-x-5 mt-1">
                    <div className="flex items-center">
                        {formatScore(views)}
                        <span className="material-icons-outlined ml-2">visibility</span>
                    </div>
                    <div className="flex items-center">
                        {formatScore(bookmarks)}
                        <span className="material-icons-outlined text-primary ml-1">bookmark_border</span>
                    </div>
                </div>
                <div className="mt-3">
                    <TagGroup list={tags}></TagGroup>
                </div>
            </div>
        </div>
    );
};
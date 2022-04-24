import Image from "next/image";
import Link from "next/link";
import TagGroup from "../TagGroup";
import { formatScore } from "../../utilities";

export default function MangaCard({id, title, tags, authors, artists, cover , views, bookmarks}) {
    return (
        <div className="flex gap-5 shadowbox rounded-xl overflow-hidden">
            <div className="basis-1/3 flex-shrink-0 max-w-[150px] h-[235px] relative">
                <Link href={`/manga/${id}`}>
                    <a>
                        <Image src={`https://uploads.mangadex.org/covers/${id}/${cover}.256.jpg`} layout="fill" className="object-cover"></Image>
                    </a>
                </Link>
            </div>
            <div className="py-3 pr-3">
                <h3 className="font-bold line-clamp-1 sm:line-clamp-2">{title}</h3>
                <p className="text-sm mt-1"><span className="font-bold text-primary mr-2">#</span>
                    {
                        [authors.map((item)=>item.name).join(', '), artists.map((item)=>item.name).join(', ')].join(', ')
                    }
                </p>
                <div className="flex text-sm gap-x-5 mt-1">
                            <div className="flex items-center">
                                {formatScore(views)}
                                <span className="material-icons-outlined ml-2">visibility</span>
                            </div>
                            <div className="flex items-center">
                                {formatScore(bookmarks)}
                                <span className="material-icons text-primary ml-1">bookmark_border</span>
                            </div>
                        </div>
                <div className="mt-3">
                    <TagGroup list={tags}></TagGroup>
                </div>
            </div> 
        </div>
    );
};
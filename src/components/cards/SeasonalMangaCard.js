import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import {formatScore} from "../../utilities";


const MakeMangaLink = (id)=>{
    return "/manga/" + (id || "");
}

export default function SeasonalMangaCard({id, title, views, bookmarks, cover, authors}){
    return (
        <div className="relative pt-10">
            <div className="flex max-w-[550px] h-[350px] w-full">
                <div className="shadowbox w-[45%] relative flex-grow rounded-xl overflow-hidden bg-grey">
                    <Link href={MakeMangaLink(id)}>
                        <a>
                            <Image layout="fill" src={cover || "/"} className="object-cover" priority></Image>
                        </a>
                    </Link>
                </div>
                <div className="pt-[155px] w-[55%] relative">    
                    <div className="flex text-sm ml-5 flex-wrap gap-y-2 gap-x-5">
                        <div className="flex items-center">
                            {formatScore(views)}
                            <span className="material-icons-outlined ml-2">visibility</span>
                        </div>
                        <div className="flex items-center">
                            {formatScore(bookmarks)}
                            <span className="material-icons text-primary ml-1">bookmark_border</span>
                        </div>
                    </div>
                    <div className="absolute right-0 bottom-10">
                        <Link href={MakeMangaLink(id)}>
                            <a>
                                <Button>Learn more</Button>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex max-w-[550px] absolute top-0 h-max w-full">
                <div className="w-[35%]"></div> 
                <div className="w-[65%] bg-dominant px-4 py-3 rounded-xl shadowbox">
                    <Link href={MakeMangaLink(id)}>
                        <a>
                            <h2 className="font-bold text-2xl line-clamp-3 h-[96px]">{title}</h2>
                        </a>
                    </Link>
                    <hr className="border-primary border-t-2 w-1/2 my-3"></hr>
                    <p className="text-base line-clamp-1 text-ellipsis"><span className="text-primary mr-2 font-bold">#</span>{(authors||[]).join(", ")}</p>
                </div>
            </div>
        </div>
    );
}
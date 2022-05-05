import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import { uniqueAuthor } from "../../utilities";


const MakeMangaLink = (id) => {
    return "/manga/" + (id || "");
}

export default function SeasonalMangaCard({ id, title, description, average, bookmarks, cover, authors, artists }) {
    return (
        <div className="relative pt-7">
            <div className="flex max-w-[550px] h-[350px] w-full">
                <div className="shadowbox w-[45%] flex-grow rounded-md overflow-hidden bg-grey z-10">
                    <Link href={MakeMangaLink(id)}>
                        <a className="relative w-full h-full block">
                            {
                                cover &&
                                <Image layout="fill" objectFit="cover" src={`https://uploads.mangadex.org/covers/${id}/${cover}.512.jpg`} alt={title} draggable="false" title={title}></Image>
                            }
                        </a>
                    </Link>
                </div>
                <div className="pt-32 w-[55%] relative">
                    <div className="pl-5 line-clamp-5">
                        {description}
                    </div>
                    <Link href={MakeMangaLink(id)}>
                        <a className="absolute right-0 bottom-5">
                            <Button>Before you read</Button>
                        </a>
                    </Link>
                </div>
            </div>
            <div className="flex max-w-[550px] absolute top-0 h-max w-full justify-end">
                <div className="w-[57%] bg-dominant px-4 py-3 rounded-md shadowbox-sm z-20">
                    <Link href={MakeMangaLink(id)}>
                        <a>
                            <h2 className="font-bold text-lg sm:text-2xl line-clamp-2 min-h-[3rem] sm:min-h-[4rem]">{title}</h2>
                        </a>
                    </Link>
                    <hr className="border-primary border-t-2 w-1/2 my-3"></hr>
                    <p className="text-base line-clamp-1 text-ellipsis"><span className="text-primary mr-2 font-bold">#</span>{uniqueAuthor(authors, artists).map(item => item.name).join(', ')}</p>
                </div>
            </div>
        </div>
    );
}
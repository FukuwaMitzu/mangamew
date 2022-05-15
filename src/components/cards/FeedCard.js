import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import ShowMore from "../ShowMore";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function FeedCard({manga, chapters}) { 
    return (
        <div className="flex gap-5 shadowbox rounded-md overflow-hidden">
            <div className="basis-1/3 flex-shrink-0 max-w-[150px] min-h-[237px] h-full relative">
                <Link href={`/manga/${manga.id}`}>
                    <a>
                        <div className=" w-full h-full bg-grey">
                            <Image src={`https://uploads.mangadex.org/covers/${manga.id}/${manga.cover}.512.jpg`} layout="fill" objectFit="cover" objectPosition={"center"} title={manga.title} alt={manga.title}></Image>
                        </div>
                    </a>
                </Link>
            </div>
            <div className="py-3 pr-3 w-full">
                <Link href={`/manga/${manga.id}`}>
                    <a className="hover:text-primary">
                        <h2 className="font-bold line-clamp-2">{manga.title}</h2>
                    </a>
                </Link>
                <ShowMore height={75}>
                    {
                        chapters.map((item)=>{
                            
                            return <Link href={`/chapter/${item.id}`}  key={item.id}>
                                <a>
                                    <p className="bg-grey my-2 p-1 hover:bg-grey-dark flex justify-between">
                                    <span className="font-bold">
                                        Ch. {item.chapter}
                                    </span>
                                    <span className="text-sm">{dayjs().to(item.readableAt)}</span></p>
                                </a>
                            </Link>
                        })
                    }
                </ShowMore>
            </div>
        </div>
    )
}
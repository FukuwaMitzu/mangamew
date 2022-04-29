import Image from "next/image"
import Link from "next/link"
import React from "react";

const richFormat = ({ id, title, date, cover}) => {
    return (
        <div className="group flex gap-3 w-full">
            <div className="relative w-1/3 max-w-[180px] h-[120px] bg-grey overflow-hidden rounded-xl">
                <Image layout="fill" src={cover || "/"} className="object-cover" width={180} height={120}></Image>
            </div>
            <div className="flex flex-col flex-1 py-2">
                <h3 className="group-hover:text-primary transition-colors font-bold flex-grow">{title}</h3>
                <p className="flex items-center flex-shrink-0 flex-grow-0 self-end text-sm"><span className="material-icons-outlined !text-base mr-1">schedule</span>{date}</p>
            </div>
        </div>
    );
};
const simpleFormat = ({ id, title, date})=>{
    return (
        <div className="group flex p-1 w-full bg-grey">
                <h3 className="group-hover:text-primary transition-colors font-bold flex-1">{title}</h3>
                <p className="flex items-center flex-shrink-0 flex-grow-0 self-end text-sm"><span className="material-icons-outlined !text-base mr-1">schedule</span>{date}</p>
        </div>
    );
}


function ChapterCard(props) {
    const date = new Date(props.publishAt);
    let chapterFormat = {...props};

    chapterFormat.date = date.toLocaleDateString('en-US');

    let chapterTitle = "Oneshot"; 
    if(chapterFormat.chapter) chapterTitle = `Chapter ${chapterFormat.chapter}${chapterFormat.title? ": " + chapterFormat.title : ""}`;
    chapterFormat.title = chapterTitle;

    return (
        <Link href={`/chapter/${chapterFormat.id}`}>
            <a>
                {chapterFormat.type=="simple"?simpleFormat(chapterFormat) : richFormat(chapterFormat)}
            </a>
        </Link>
    )
}

export default React.memo(ChapterCard);
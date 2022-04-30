import Link from "next/link"
import React from "react";


const simpleFormat = ({ id, title, date})=>{
    return (
        <div className="group flex p-1 w-full bg-grey">
                <h3 className="group-hover:text-primary transition-colors font-bold flex-1">{title}</h3>
                <p className="flex items-center flex-shrink-0 flex-grow-0 self-end text-sm"><span className="material-icons-outlined !text-base mr-1">schedule</span>{date}</p>
        </div>
    );
}

/**
 * 
 * @param props 
 * @link https://api.mangadex.org/swagger.html#/Chapter/get-chapter-id
 * @returns 
 */
function ChapterCard(props) {
    const date = new Date(props.publishAt);
    let chapterFormat = {...props};

    chapterFormat.date = date.toLocaleDateString('en-US');

    let chapterTitle = "Oneshot"; 
    if(chapterFormat.chapter) chapterTitle = `Ch. ${chapterFormat.chapter}${chapterFormat.title? ": " + chapterFormat.title : ""}`;
    chapterFormat.title = chapterTitle;
    return (
        <Link href={`/chapter/${chapterFormat.id}`}>
            <a>
                {simpleFormat(chapterFormat)}
            </a>
        </Link>
    )
}

export default React.memo(ChapterCard);
import {useEffect, useState } from "react";
import ChapterCard from "./ChapterCard";

export default function ChapterList({ list }) {
    const [mode, setMode] = useState("simple");
    
    const changeSimpleMode = ()=>{
        setMode("simple");
        window.localStorage.setItem("chapterListMode", "simple");
    };
    const changeComplexMode = ()=>{
        setMode("complex");
        window.localStorage.setItem("chapterListMode", "complex");
    }
    useEffect(()=>{
        if(typeof window !== undefined){
            let chapterListMode = window.localStorage.getItem("chapterListMode");
            if(chapterListMode==null){
                window.localStorage.setItem("chapterListMode", "simple");
            }
            else setMode(chapterListMode);
        }
    }, []);
    return (
        <div className="flex flex-col gap-3">
            <div className="bg-grey rounded-xl flex w-fit leading-[0] self-end">
                <button className={`${mode!="simple"? "bg-primary text-dominant" : ""} rounded-xl  p-2`} onClick={changeComplexMode}>
                    <span className="material-icons-outlined">chrome_reader_mode</span>
                </button>
                <button className={`${mode=="simple"? "bg-primary text-dominant " : ""} rounded-xl p-2`} onClick={changeSimpleMode}>
                    <span className="material-icons-outlined">wysiwyg</span>
                </button>
            </div>
            <div className={`flex flex-col ${mode=="simple"? "gap-2" : "gap-5"}`}>
                {
                    list.map((item) => {
                        return <div key={item.id}><ChapterCard {...item} type={mode} /></div>
                    })
                }
            </div>
        </div>
    );
}
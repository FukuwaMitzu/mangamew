export default function formatChapter(chapter, title){
    let out = "Ch. ";
    if(chapter!==undefined && chapter!==null && chapter!="none") out += chapter;
    else out = "Oneshot";


    if(title) out+=": "+title;
    return out;
}
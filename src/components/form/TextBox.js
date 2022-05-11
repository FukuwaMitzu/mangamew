import {useContext, useEffect, useState } from "react";
import { FormContext } from "./Form";


export default function TextBox({ label, id, type }) {
    const [focus, setFocus] = useState(false);
    const [text, setText] = useState("");

    const context = useContext(FormContext);
    
    useEffect(()=>{
       if(context){
           context[id] = {
               id:id,
               label: label,
               type: type,
               value: text
           }
       } 
    }, [text]);

    return (
        <div className={`my-2 py-3 px-3 bg-grey transition-shadow ${focus ? "shadow-primary shadow-outline" : ""}`} onFocus={() => { setFocus(true) }} onBlur={() => {setFocus(false)}}>
        <div className="relative h-[40px]">
            <label htmlFor={id} className={`absolute capitalize transition-all ${focus? "text-sm -translate-y-1 text-primary" : text? "text-sm -translate-y-1 text-secondary" : "translate-y-1/2"}`}>{label}</label>
            <input type={type||"text"} id={id} className={"outline-none bg-transparent w-full absolute bottom-0"} onChange={(e)=>{setText(e.target.value)}}></input>
        </div>
    </div>
    )
}
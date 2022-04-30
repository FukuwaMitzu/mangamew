import { Fragment, useRef, useState } from "react";

export default function ReadMore({ children, height}) {
    const [state, setState] = useState(true);
    const containerRef = useRef({});
    const childrenRef = useRef({});

    
    let initHeight = height || 70;

    const clickSpan = ()=>{
        setState(!state);
       
        let duration = 150;
        let start;  
        let length = childrenRef.current.offsetHeight - initHeight;

        window.requestAnimationFrame(function counter(timestamp){
            if(!start) start = timestamp;
            let amount = timestamp - start;

            let ratio = Math.min((amount / duration), 1);
            
            containerRef.current.style.height = initHeight + length*(state? ratio : 1 - ratio)  + "px";
            if(amount < duration){
                window.requestAnimationFrame(counter);
            }
            else {
                if(state)containerRef.current.style.height = "auto";
            }
        });
    }

    return (
        <Fragment>
            <div className={`relative overflow-hidden`} ref={containerRef} style={{height: initHeight < childrenRef.current.offsetHeight ? initHeight : "auto"}}>
                <div ref={childrenRef}>
                    {children}
                </div>
                {
                    childrenRef.current.offsetHeight > initHeight &&
                    <div className={`bg-gradient-to-t from-dominant to-transparent ${state? "h-1/2" : ""} w-full absolute bottom-0`}></div>
                }
            </div>
            {
                childrenRef.current.offsetHeight > initHeight &&
                <button className={`${state? "bg-primary active:bg-primary-dark text-dominant px-3 py-2": "bg-dominant active:bg-grey text-primary"} rounded-md mt-5 transition-all`} onClick={clickSpan}>{state? "Read more" : "Read less"}</button>
            }
        </Fragment>
    );
}
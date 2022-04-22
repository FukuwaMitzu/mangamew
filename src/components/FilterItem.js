import { useEffect, useState } from "react"
export default function FilterItem({id, name, mode, onFilterChange}){
    /**
     * Mode of filter
     * 0: not active
     * 1: include
     * 2: exclude
     */

    const [filterMode, setFilterMode] = useState(mode||0);

    useEffect(()=>{
        setFilterMode(mode);
    },[mode]);

    const triggerFilterMode = ()=>{
        let newMode = filterMode+1;
        setFilterMode(newMode);
        if(newMode>2){setFilterMode(0); newMode=0}
        if(onFilterChange)onFilterChange({id:id,name:name,mode:newMode});    
    };

    return (
        <button className={`${filterMode==1? "bg-primary text-dominant": "bg-grey"} py-1 px-2 transition-colors rounded-xl ${filterMode==2?"shadow-outline shadow-primary":""}`} onClick={triggerFilterMode}>
            <div className="flex items-center">
                {
                    filterMode>0 &&
                    <span className="mr-1 leading-[0]">{filterMode==1? <span className="material-icons-outlined text-sm">add</span>: <span className="material-icons-outlined  text-sm">remove</span>}</span>
                }
                {name}
            </div>
        </button>
    )
}
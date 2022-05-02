import {memo} from "react";
function FilterItem({id, name, mode, max, onFilterChange, disable}){
    /**
     * Mode of filter
     * 0: not active
     * 1: include
     * 2: exclude
     */
    const triggerFilterMode = ()=>{
        let newMode = mode+1;
        if(newMode>max){newMode=0}
        if(onFilterChange)onFilterChange({id:id,name:name,mode:newMode});    
    };
    
    return (
        <button className={`${mode==1? "bg-primary text-dominant": "bg-grey"} py-1 px-2 transition-colors rounded-xl ${mode==2?"shadow-outline shadow-primary":""}  ${disable?"opacity-80 cursor-default": ""}`} onClick={(e)=>{disable? e.preventDefault() :triggerFilterMode()}}>
            <div className="flex items-center capitalize">
                {
                    mode>0 &&
                    <span className="mr-1 leading-[0]">{mode==1? <span className="material-icons-outlined !text-sm">add</span>: <span className="material-icons-outlined !text-sm">remove</span>}</span>
                }
                {name}
            </div>
        </button>
    )
}
export default memo(FilterItem, (pre, props)=>{
    return pre.mode === props.mode && pre.id === props.id && pre.max === props.max && pre.disable === props.disable && pre.name === props.name && pre.onFilterChange === props.onFilterChange;
});
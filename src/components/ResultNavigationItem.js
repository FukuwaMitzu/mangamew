export default function ResultNavigationItem({id, value, active, onTrigger}) {
    const triggerItem = ()=>{
        if(!active && onTrigger)onTrigger(id);
    }
    return (
        <button className={`${active? "bg-primary text-dominant active:bg-primary-dark": "bg-grey active:bg-grey-dark"} transition-colors rounded-md px-2 py-1 sm:px-4 sm:py-2 font-bold`} onClick={triggerItem}>
            {value}
        </button>
    )
}
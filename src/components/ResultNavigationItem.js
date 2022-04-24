export default function ResultNavigationItem({value, active, onTrigger}) {

    return (
        <button className={`${active? "bg-primary text-dominant active:bg-primary-dark": "bg-grey active:bg-grey-dark"} transition-colors rounded-md px-4 py-2 font-bold`}>
            {value}
        </button>
    )
}
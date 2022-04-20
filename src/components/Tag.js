export default function Tag({title}){
    return (
        <button className="bg-grey active:bg-grey-dark rounded-xl px-2 text-xs font-bold">{title}</button>
    );
}
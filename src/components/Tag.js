export default function Tag({name}){
    return (
        <button className="bg-grey active:bg-grey-dark rounded-xl px-2 text-xs font-bold">{name}</button>
    );
}
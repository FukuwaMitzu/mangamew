export default function Button(props){
    return (
        <button className="bg-primary text-dominant rounded-xl px-3 py-2">{props.children}</button>
    );
}
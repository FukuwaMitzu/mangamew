export default function Avatar({imageSrc}){
    return (
        <div className="bg-grey rounded-full w-full h-full flex justify-center items-center overflow-hidden relative">
            <div className="absolute inset-0 bg-cover" style={{backgroundImage:`url(${imageSrc||''})`}}></div>
            <span className="material-icons-outlined">person_outline</span>
        </div>
    );
}
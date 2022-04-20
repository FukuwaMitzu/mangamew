export default function Section({title, children}){
    return (
        <div className="flex flex-col">
            <div>
                <div className="bg-primary rounded-xl h-1 w-10"></div>
                <h1 className="font-bold uppercase text-2xl">{title}</h1>
            </div>
            <div className="pt-5">
                {children}
            </div>
        </div>
    );
}
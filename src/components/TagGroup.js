import Tag from "./Tag";
export default function TagGroup({list}){
    return (
        <div className="flex flex-wrap gap-x-2 gap-y-1">
            { list.map((item)=>{
                return <Tag key={item.id} {...item}></Tag>
            }) }
        </div>
    );
}
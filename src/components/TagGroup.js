import Tag from "./Tag";
import Link from "next/link";

export default function TagGroup({list}){
    return (
        <div className="flex flex-wrap gap-1">
            { list.map((item)=>{
                return (
                    <Link href={`/tag/${item.id}`} key={item.id}>
                        <a>
                            <Tag {...item}></Tag>
                        </a>
                    </Link>
                )
            }) }
        </div>
    );
}
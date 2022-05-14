import Tag from "./Tag";
import Link from "next/link";

export default function TagGroup({list}){
    return (
        <div className="flex flex-wrap gap-1">
            { list.map((item)=>{
                return (
                    <Link href={`/search?include=${item.id.substring(0, 5)}`} key={item.id}>
                        <a>
                            <Tag {...item}></Tag>
                        </a>
                    </Link>
                )
            }) }
        </div>
    );
}
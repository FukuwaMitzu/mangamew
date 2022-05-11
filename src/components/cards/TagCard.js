import Link from "next/link";
import Image from "next/image";

const MakeTagLink = (id) => {
    return "/tag/" + (id || "");
}

export default function TagCard({ id, name, cover }) {
    return (
        <Link href={MakeTagLink(id)}>
            <a>
                <div className="group max-w-xs w-full h-48 overflow-hidden rounded-md relative shadowbox">
                    <div className="relative h-full w-full bg-grey">
                        <Image layout="fill" src={cover || "/"} objectFit={"cover"} alt={name} draggable="false" priority></Image>
                    </div>
                    <div className="w-full h-full bg-secondary absolute inset-0 group-hover:bg-opacity-100 transition-colors bg-opacity-90 flex justify-center items-center">
                        <div className="font-bold text-lg relative">
                            <h2 className="text-dominant transition-all group-hover:scale-125 opacity-80 group-hover:opacity-100">
                                {name}
                            </h2>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    );
}
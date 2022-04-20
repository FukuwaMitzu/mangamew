import Link from "next/link";
import Image from "next/image";

const MakeTagLink = (id) => {
    return "/tag/" + (id || "");
}

export default function TagCard({ id, name, cover }) {
    return (
        <Link href={MakeTagLink(id)}>
            <a>
                <div className="group max-w-[300px] w-full h-[217px] overflow-hidden rounded-xl relative shadowbox">
                    <div className="relative h-full w-full bg-grey">
                        <Image layout="fill" src={cover || "/"} className="object-cover"></Image>
                    </div>
                    <div className="w-full h-full bg-secondary absolute inset-0 group-hover:bg-opacity-100 transition-colors bg-opacity-90 flex justify-center items-center">
                        <div className="font-bold text-xl relative">
                            <div className="text-primary scale-x-0 group-hover:scale-x-100 origin-right transition-transform absolute left-0">#</div>
                            <h3 className="text-dominant transition-all group-hover:translate-x-5">
                                {name}
                            </h3>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    );
}
import Image from "next/image";
import TagGroup from "../../src/components/TagGroup";
import Button from "../../src/components/Button";
import { Fragment } from "react";

const tagList = [
    { id: 1, title: "School life" },
    { id: 2, title: "Shounen" },
    { id: 3, title: "Shoujo" },
    { id: 4, title: "Award winning" },
    { id: 5, title: "Sci fi" },
    { id: 6, title: "Romance" },
    { id: 7, title: "Slice of life" },
    { id: 8, title: "Siscom" },
    { id: 9, title: "Comedy" },
]


export default function MangaPage(props) {
    return (
        <div className="relative w-full lg:pt-16">
            <div className="hidden text-grey font-bold text-8xl absolute top-0 lg:block">
                <p>Oda Tomohito</p>
                <p>Yuki</p>
            </div>
            <div className="flex flex-col gap-x-12 gap-y-3 sm:flex-row max-w-[936px] m-auto relative">
                <div className="hidden bg-primary w-[138px] h-[550px] absolute -left-10 -top-10 lg:block"></div>
                <div className="relative w-full sm:w-[255px] h-[200px] sm:h-[350px] flex-shrink-0 rounded-xl overflow-hidden shadowbox">
                    <Image layout="fill" src="/images/exam2.jpg" className="object-cover object-top"></Image>
                </div>
                <div className="flex flex-col gap-y-2 sm:gap-0">
                    <h1 className="text-xl font-bold sm:text-3xl lg:text-5xl">Kaguya-sama wa Kokurasetai: Tensai-tachi no Renai Zunousen</h1>
                    <div className="flex items-center md:w-3/4 sm:mt-5">
                        <div className="flex-[0.2] border-primary border-b-2 hidden sm:block"></div>
                        <p className="sm:px-2 sm:text-lg lg:text-xl">Entangled with the Duke</p>
                        <div className="flex-1 border-primary border-b-2 hidden sm:block"></div>
                    </div>
                    <p className="sm:mt-4 italic"><span className="text-primary mr-2 font-bold">#</span>Oda Tomohito, Yuki</p>
                    <div className="flex text-sm flex-wrap gap-y-2 gap-x-5 sm:mt-3">
                        <div className="flex items-center">
                            100k
                            <span className="material-icons-outlined ml-2">visibility</span>
                        </div>
                        <div className="flex items-center">
                            200k
                            <span className="material-icons text-primary ml-1">bookmark_border</span>
                        </div>
                    </div>
                    <div className="lg:w-2/3 sm:mt-6">
                        <TagGroup list={tagList}></TagGroup>
                    </div>
                    <div className="flex gap-3 justify-end mt-10">
                        <Button>Start reading</Button>
                        <Button type="outlined" endIcon={<span className="material-icons-outlined text-primary">bookmark_add</span>}>Add to libary</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    return {
        props: { ...context.params }
    }
}
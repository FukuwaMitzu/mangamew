import Image from "next/image";
import TagGroup from "../../src/components/TagGroup";
import Button from "../../src/components/Button";
import { Fragment } from "react";
import Section from "../../src/components/Section";
import Head from "next/head";
import { ChapterList } from "../../src/components/cards";

const tagList = [
    { id: 1, title: "School life" },
    { id: 2, title: "Shounen" },
    { id: 3, title: "Shoujo" },
    { id: 4, title: "Award winning" },
    { id: 5, title: "Sci fi" },
    { id: 6, title: "Romance" },
    { id: 7, title: "Slice of life" },
    { id: 8, title: "Siscon" },
    { id: 9, title: "Comedy" },
]

const chapterList = [
    {
        id: 1,
        title: "Chapter 1: When...",
        cover: "/images/exam1.jpg",
        date: "26/03/1995"
    },
    {
        id: 2,
        title: "Chapter 1: When...",
        cover: "/images/exam1.jpg",
        date: "26/03/1995"
    },
    {
        id: 3,
        title: "Chapter 1: When...",
        cover: "/images/exam1.jpg",
        date: "26/03/1995"
    },
    {
        id: 4,
        title: "Chapter 1: When...",
        cover: "/images/exam1.jpg",
        date: "26/03/1995"
    },
    {
        id: 5,
        title: "Chapter 1: When...",
        cover: "/images/exam1.jpg",
        date: "26/03/1995"
    },
    {
        id: 6,
        title: "Chapter 1: When...",
        cover: "/images/exam1.jpg",
        date: "26/03/1995"
    },
    {
        id: 7,
        title: "Chapter 1: When...",
        cover: "/images/exam1.jpg",
        date: "26/03/1995"
    },
    {
        id: 8,
        title: "Chapter 1: When...",
        cover: "/images/exam1.jpg",
        date: "26/03/1995"
    },
    {
        id: 9,
        title: "Chapter 1: When...",
        cover: "/images/exam1.jpg",
        date: "26/03/1995"
    },
    {
        id: 10,
        title: "Chapter 1: When...",
        cover: "/images/exam1.jpg",
        date: "26/03/1995"
    },
    {
        id: 11,
        title: "Chapter 1: When...",
        cover: "/images/exam1.jpg",
        date: "26/03/1995"
    },
    {
        id: 12,
        title: "Chapter 1: When...",
        cover: "/images/exam1.jpg",
        date: "26/03/1995"
    },
]

export default function MangaPage(props) {
    return (
        <Fragment>
            <Head>
                <title>{props.title}</title>
            </Head>
            <div className="relative min-w-0 w-full lg:pt-16 overflow-hidden">
                <div className="hidden text-grey font-bold text-8xl absolute top-0 lg:block">
                    <p>Oda Tomohito</p>
                    <p>Yuki</p>
                </div>
                <div className="flex flex-col gap-x-12 gap-y-3 sm:flex-row max-w-[936px] m-auto relative">
                    <div className="hidden bg-primary w-[138px] h-[calc(100%_+_40px)] absolute -left-10 -top-10 lg:block"></div>
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
                        <div className="flex gap-3 justify-start sm:justify-end mt-3 sm:mt-10 sm:pb-5">
                            <Button>Start reading</Button>
                            <Button type="outlined" endIcon={<span className="material-icons-outlined text-primary">bookmark_add</span>}>Add to libary</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex mt-10 gap-10 justify-between flex-col lg:flex-row">
                <div className="w-full lg:max-w-[470px] lg:sticky lg:top-20 lg:h-fit">
                    <Section title="Story">
                        {"Komi-san is a beautiful and admirable girl that no one can take their eyes off of. Almost the whole school sees her as the cold beauty that's out of their league, but Tadano Hitohito knows the truth: she's just really bad at communicating with others. Komi-san, who wishes to fix this bad habit of hers, tries to improve it with the help of Tadano-kun by achieving her goal of having 100 friends."}
                    </Section>
                    <div className="mt-10">
                        <Section title="Creators">
                            <div className="flex gap-5">
                                <p>Author: <a className="text-primary">Oda Tomohito</a></p> 
                                <p>Artis: <a className="text-primary">Oda Tomohito</a></p>
                            </div>
                        </Section>
                    </div>
                </div>
                <div className="flex-1">
                    <ChapterList list={chapterList}/>
                </div>
            </div>
        </Fragment>
    );
}

export async function getServerSideProps(context) {
    return {
        props: { 
            params:{...context.params},
            title: "Kaguya-sama wa Kokurasetai: Tensai-tachi no Renai Zunousen"
        }
    }
}
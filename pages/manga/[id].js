import Image from "next/image";
import TagGroup from "../../src/components/TagGroup";
import Button from "../../src/components/Button";
import { Fragment, useEffect, useState } from "react";
import Section from "../../src/components/Section";
import Head from "next/head";
import { ChapterList } from "../../src/components/cards";
import axios from "axios";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { formatAltTitles, formatAverage, formatDesciption, formatScore, formatTitle } from "../../src/utilities";
import Link from "next/link";

import { MangaMewAPIURL, MangaMewURL } from "../../src/config";




const customComponents = {
    a: ({ children, href }) => <a className="text-primary" href={href}>{children}</a>,
    li: ({ ordered, children }) => <li className={`${ordered ? "list-decimal" : "list-disc"} ml-10 my-2`}>{children}</li>,
    ol: ({ children }) => <ol className="pt-2">{children}</ol>,
    ul: ({ children }) => <ul className="pt-2">{children}</ul>,
    p: ({children})=> <div className="mb-3">{children}</div>,
    img: ({src})=> <img className="inline-block" src={src}></img>,
    br: ({})=> <div className="my-1"></div>,
    hr: ({})=> <hr className="my-2 border-t-grey"></hr>
}

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

export default function MangaPage({ id, title, altTitle, tags, authors, artists, cover, description }) {
    const [average, setAverage] = useState();
    const [follows, setFollows] = useState();

    useEffect(() => {
        axios.get(MangaMewAPIURL(`/statistics/manga/${id}`)).then(
            ({ data }) => {
                setAverage(data.statistics[id].rating.average);
                setFollows(data.statistics[id].follows);
            }
        ).catch(() => { });
    }, []);


    const uniqueAuthor = (au, ar) => {
        au = au.concat(ar.filter((item => {
            return au.every(e => e.name != item.name);
        })))
        return au;
    };


    return (
        <Fragment>
            <Head>
                <title>{title}</title>
                <meta name="title" content={title} />
                <meta name="description" content={description} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={MangaMewURL} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={`https://uploads.mangadex.org/covers/${id}/${cover}`} />
            </Head>
            <div className="relative min-w-0 w-full sm:p-5">
                <div className="hidden sm:block bg-fixed bg-cover inset-0 absolute opacity-10 h-full w-full" style={{ backgroundImage: `url(https://uploads.mangadex.org/covers/${id}/${cover})` }}>
                </div>
                <div className="flex flex-col gap-x-12 gap-y-3 md:flex-row max-w-[1080px] m-auto relative">
                    <div className="relative w-full md:w-[225px] h-[200px] md:h-[350px] flex-shrink-0 rounded-xl overflow-hidden shadowbox">
                        <div className="w-full h-full bg-grey animate-pulse"></div>
                        <Image layout="fill" src={`https://uploads.mangadex.org/covers/${id}/${cover}.512.jpg`} alt={title} className="object-cover" quality={100} priority></Image>
                    </div>
                    <div className="flex flex-col flex-1 gap-y-2 sm:gap-0 p-3 sm:p-5 rounded-xl glassbox">
                        <h1 className="text-lg font-bold md:text-3xl ">{title}</h1>
                        <div className="flex items-center lg:w-3/4 md:mt-5">
                            <div className="flex-[0.2] border-primary border-b-2 hidden sm:block"></div>
                            {altTitle && <p className="text-sm md:text-lg lg:text-xl sm:px-2">{altTitle}</p>}
                            <div className="flex-1 border-primary border-b-2 hidden sm:block"></div>
                        </div>
                        <p className="sm:mt-2 md:mt-4">
                            <span className="text-primary mr-2 font-bold">#</span>
                            {uniqueAuthor(authors, artists).map(item => item.name).join(', ')}
                        </p>
                        <div className="flex flex-wrap gap-y-2 gap-x-5 sm:mt-3">
                            <div className="flex items-center">
                                {formatAverage(average)}
                                <span className="material-icons-outlined ml-2 text-star">star_border</span>
                            </div>
                            <div className="flex items-center">
                                {formatScore(follows)}
                                <span className="material-icons-outlined text-primary ml-1">bookmark_border</span>
                            </div>
                        </div>
                        <div className="lg:w-2/3 sm:mt-6">
                            <TagGroup list={tags}></TagGroup>
                        </div>
                        <div className="flex gap-3 justify-start sm:justify-end mt-3 sm:mt-10 sm:pb-5">
                            <Button>Start reading</Button>
                            <Button type="outlined" endIcon={<span className="material-icons-outlined text-primary">bookmark_add</span>}>Follow</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex lg:mt-10 py-10 gap-5 justify-between flex-col lg:flex-row bg-dominant">
                <div className="w-full lg:max-w-[450px] lg:sticky lg:top-20 lg:h-fit lg:border-r-grey">
                    <Section title="Description">
                        <div className="text-sm"><ReactMarkdown components={customComponents}>{description}</ReactMarkdown></div>
                    </Section>
                    <div className="mt-10">
                        <Section title="Creators">
                            <div className="flex flex-wrap gap-y-5 gap-x-10">
                                <div>
                                    <span className="font-bold">Author</span>
                                    <ul>
                                        {
                                            authors.map((author) => {
                                                return <li key={author.id}>
                                                    <Link href={`/author/${author.id}`}>
                                                        <a className="text-primary">{author.name}</a>
                                                    </Link>
                                                </li>
                                            })
                                        }
                                    </ul>
                                </div>

                                <div>
                                    <span className="font-bold">Artist</span>
                                    <ul>

                                        {
                                            artists.map((artist) => {
                                                return <li key={artist.id}>
                                                    <Link href={`/artist/${artist.id}`}>
                                                        <a className="text-primary">{artist.name}</a>
                                                    </Link>
                                                </li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </Section>
                    </div>
                </div>
                <div className="flex-1">
                    <ChapterList list={chapterList} />
                </div>
            </div>
        </Fragment>
    );
}

export async function getServerSideProps(context) {
    try {
        const result = await axios.get(MangaMewAPIURL(`/manga/${context.query.id}?includes[]=cover_art&includes[]=author&includes[]=artist`));
        const data = result.data.data;

        let title = "";
        let altTitle = "";
        let description = "";
        let authors = [];
        let artists = [];
        let cover = "";
        let tags = data.attributes.tags.map((item) => {
            return {
                id: item.id,
                name: item.attributes.name.en
            }
        });

        if (data.attributes.title) title = formatTitle(data.attributes.title);
        if (data.attributes.altTitles.length > 0) altTitle = formatAltTitles(data.attributes.altTitles);
        if (data.attributes.description) description = formatDesciption(data.attributes.description);

        data.relationships.forEach((rel) => {
            if (rel.type == "author") try { authors.push({ id: rel.id, name: rel.attributes.name }); } catch { }
            else if (rel.type == "artist") try { artists.push({ id: rel.id, name: rel.attributes.name }); } catch { }
            else if (rel.type == "cover_art") try { cover = rel.attributes.fileName; } catch { }
        });

        return {
            props: {
                id: data.id,
                title: title,
                altTitle: altTitle,
                description: description,
                authors: authors,
                artists: artists,
                cover: cover,
                tags: tags
            }
        }
    }
    catch {
        return {
            notFound: true,
        }
    };
};
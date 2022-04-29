import Image from "next/image";
import TagGroup from "../../src/components/TagGroup";
import Button from "../../src/components/Button";
import { Fragment, useEffect, useState, useRef } from "react";
import Section from "../../src/components/Section";
import Head from "next/head";
import { ChapterList, MangaList } from "../../src/components/cards";
import axios from "axios";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { formatAltTitles, formatAverage, formatDesciption, formatScore, formatTitle } from "../../src/utilities";
import Link from "next/link";
import useApiStatisticList from "../../src/hooks/useApiStatisticList";
import useApiMangaFeed from "../../src/hooks/useApiMangaFeed";
import { MangaMewAPIURL, MangaMewURL } from "../../src/config";
import Loading from "../../src/components/Loading";


const customComponents = {
    a: ({ children, href }) => <a className="text-primary" target="__blank__" href={href}>{children}</a>,
    li: ({ ordered, children }) => <li className={`${ordered ? "list-decimal" : "list-disc"} ml-10 my-2`}>{children}</li>,
    ol: ({ children }) => <ol className="pt-2">{children}</ol>,
    ul: ({ children }) => <ul className="pt-2">{children}</ul>,
    p: ({ children }) => <div className="mb-3">{children}</div>,
    img: ({ src }) => <img className="inline-block" src={src}></img>,
    br: ({ }) => <div className="my-1"></div>,
    hr: ({ }) => <hr className="my-2 border-t-grey"></hr>
}

export default function MangaPage({ id, title, altTitle, tags, authors, artists, cover, description }) {
    const [average, setAverage] = useState();
    const [follows, setFollows] = useState();
    const [chapterList, setChapterList] = useState([]);

    const [statisticApi, setStatisticApiParams] = useApiStatisticList();

    const [feedIndex, setFeedIndex] = useState({ offset: 0, limit: 100, total: 0 });
    const [feedApi, setFeedApiParams] = useApiMangaFeed();

    const chapterContainerRef = useRef();
    const fetchLockRef = useRef(true);

    useEffect(() => {
        setStatisticApiParams({
            manga: [id]
        });
        setFeedApiParams({ id: id });
    }, []);

    useEffect(() => {
        if (!feedApi.loading && feedApi.result) {
            setChapterList(
                chapterList.concat(
                    feedApi.result.data.filter(
                        item => !chapterList.some(a => a.id == item.id)
                    )
                )
            );

            let nextLimit = Math.min(feedApi.result.limit, Math.abs(feedApi.result.total - feedApi.result.offset - feedApi.result.limit));
            let nextOffset = feedIndex.offset + feedApi.result.limit;
            setFeedIndex({offset: nextOffset, limit: nextLimit, total: feedApi.result.total });
            fetchLockRef.current = false;
        }
    }, [feedApi]);


    useEffect(() => {
        const fetchOnScroll = () => {
            if (chapterContainerRef.current && feedApi.result && !feedApi.loading) {
                if (chapterContainerRef.current.getBoundingClientRect().y + chapterContainerRef.current.scrollHeight < window.innerHeight) {
                    let checkLimit = feedIndex.limit > 0;
                    let checkLock = fetchLockRef.current;
                    let checkOffset = feedIndex.offset + feedIndex.limit <= feedIndex.total;
                    
                    if (!checkOffset || checkLock || !checkLimit)return;
                    setFeedApiParams({ id: id, offset: feedIndex.offset, limit: feedIndex.limit});
                    fetchLockRef.current = true;
                };     
            } 
        }
        window.addEventListener('scroll', fetchOnScroll);
        return () => {
            window.removeEventListener('scroll', fetchOnScroll);
        }
    }, [chapterList]);


    useEffect(() => {
        if (statisticApi.result && !statisticApi.loading) {
            try {
                setAverage(statisticApi.result.data[id].average);
            } catch {
                setAverage(null);
            }
            try { setFollows(statisticApi.result.data[id].follows); } catch {
                setFollows(null);
            }
        }
    }, [statisticApi]);


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
                        <div className="text-sm">
                            {
                                description.trim() != "" ?
                                    <ReactMarkdown components={customComponents}>{description}</ReactMarkdown>
                                    :
                                    "This manga has no description yet"
                            }
                        </div>
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
                    {
                        chapterList.length > 0 &&
                        <div ref={chapterContainerRef}><ChapterList list={chapterList} /></div>
                    }
                    {
                        feedApi.loading &&
                        <Loading></Loading>
                    }
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
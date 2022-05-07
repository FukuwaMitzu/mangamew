import Image from "next/image";
import dynamic from "next/dynamic";
import TagGroup from "../../src/components/TagGroup";
import Button from "../../src/components/Button";
import { Fragment, useEffect, useState } from "react";
import Section from "../../src/components/Section";
import Head from "next/head";
import { uniqueAuthor } from "../../src/utilities";


import axios from "axios";
import qs from "qs";
import { formatAltTitles, formatAverage, formatDesciption, formatScore, formatTitle } from "../../src/utilities";
import Link from "next/link";
import useApiStatisticList from "../../src/hooks/useApiStatisticList";
import useApiMangaFeed from "../../src/hooks/useApiMangaFeed";
import { MangaMewAPIURL, MangaMewURL } from "../../src/config";
import Loading from "../../src/components/Loading";


const ChapterList = dynamic(() => import("../../src/components/cards/ChapterList"));
import ReactMarkdown from "react-markdown";
import useLazyFetching from "../../src/hooks/useLazyFetching";
import ShowMore from "../../src/components/ShowMore";
import SelectBox from "../../src/components/SelectBox";


//Custom markdown elements for description
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
const orderList = [
    {
        value: "asc",
        toString: () => 'Oldest Chapter'
    }
    ,
    {
        value: "desc",
        toString: () => 'Newest Chapter'
    }
];

export default function MangaPage({ id, title, altTitle, tags, authors, artists, cover, description, status, year, firstChapterId }) {
    const [average, setAverage] = useState();
    const [follows, setFollows] = useState();
    const [chapterList, setChapterList] = useState(new Map());



    const [order, setOrder] = useState(orderList[1].value); //Descending

    const [statisticApi, setStatisticApiParams] = useApiStatisticList();

    const [feedApi, setFeedApiParams] = useApiMangaFeed();


    //Lazyloading api
    const [chapterContainerRef, setRefreshFeedApi] = useLazyFetching(feedApi, (fetchData) => {
        setFeedApiParams({ id: id, offset: fetchData.offset, limit: fetchData.limit, order: { chapter: order } });
    });



    useEffect(() => {
        setStatisticApiParams({
            manga: [id]
        });
        setFeedApiParams({ id: id });
    }, []);
    useEffect(() => {
        if (!feedApi.loading && feedApi.result) {
            const chapterMap = new Map(chapterList);
            feedApi.result.data.forEach(item=>{
                chapterMap.set(item.id, item);
            })
            setChapterList(chapterMap);
        }
    }, [feedApi]);
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
   
    const sortChapter = (e) => {
        setChapterList([]);
        setOrder(e.value);
        setRefreshFeedApi(() => { setFeedApiParams({ id: id, order: { chapter: e.value } }) });
    }
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
                <div className="flex flex-col gap-x-12 gap-y-3 md:flex-row max-w-5xl m-auto relative">
                    <div className="relative w-full md:w-[225px] h-[200px] md:h-[350px] flex-shrink-0 rounded-md overflow-hidden shadowbox">
                        <div className="w-full h-full bg-grey animate-pulse"></div>
                        <Image layout="fill" src={`https://uploads.mangadex.org/covers/${id}/${cover}.512.jpg`} alt={title} className="object-cover" quality={100} priority></Image>
                    </div>
                    <div className="flex flex-col flex-1 gap-y-2 sm:gap-0 p-3 sm:p-5 rounded-md glassbox">
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
                            <div className="flex items-center text-sm uppercase font-bold gap-2">
                                <span className={`rounded-full p-1 ${status == "ongoing" ? "bg-green-400" : status == "hiatus" ? "bg-yellow-500" : status == "cancelled" ? "bg-grey-dark" : "bg-primary"}`}></span>
                                {`Publication: ${year ? year + ", " + status : status}`}
                            </div>
                        </div>
                        <div className="lg:w-2/3 sm:mt-6">
                            <TagGroup list={tags}></TagGroup>
                        </div>
                        <div className="flex gap-3 justify-start sm:justify-end mt-3 sm:mt-10 sm:pb-5">
                            {
                                firstChapterId !== ""?
                                <Link href={`/chapter/${firstChapterId}`}>
                                    <a>
                                        <Button>Start reading</Button>
                                    </a>
                                </Link>
                                :
                                <Button>Start reading</Button>
                            }
                            <Button type="outlined" endIcon={<span className="material-icons-outlined text-primary">bookmark_add</span>}>Follow</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:mt-10 py-10 gap-5 grid lg:grid-cols-12 bg-dominant">
                <div className="w-full lg:sticky lg:top-20 lg:max-h-[80vh] lg:h-max lg:border-r-grey lg:col-span-5 lg:overflow-y-auto">
                    <Section title="Description">
                        <div className="flex flex-col items-center lg:block lg:items-start">
                            <ShowMore height={100}>
                                <div className="text-sm h-fit overflow-hidden">
                                    {
                                        description.trim() != "" ?
                                            <ReactMarkdown components={customComponents}>{description}</ReactMarkdown>
                                            :
                                            "This manga has no description yet"
                                    }
                                </div>
                            </ShowMore>
                        </div>
                    </Section>
                    <div className="mt-14">
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
                <div className="lg:col-span-7">
                    <div className="mb-5">
                        <div className="min-w-0 max-w-fit">
                            <SelectBox list={orderList} select={orderList[1]} onSelectedChange={sortChapter} label={"Sort by"}></SelectBox>
                        </div>
                    </div>
                    {
                        chapterList.size > 0 &&
                        <div ref={chapterContainerRef}><ChapterList list={Array.from(chapterList.values())} /></div>
                    }
                    {
                        feedApi.loading &&
                        <Loading></Loading>
                    }
                    {
                        !feedApi.loading &&
                        <button className="bg-primary p-5 rounded-md text-dominant w-full active:bg-primary-dark transition-all mt-3" onClick={() => {
                            let elementY = 0;
                            let duration = 150;

                            let startingY = window.scrollY;
                            let diff = elementY - startingY;
                            let start;

                            // Bootstrap our animation - it will get called right before next frame shall be rendered.
                            window.requestAnimationFrame(function step(timestamp) {
                                if (!start) start = timestamp;
                                // Elapsed milliseconds since start of scrolling.
                                var time = timestamp - start;
                                // Get percent of completion in range [0, 1].
                                var percent = Math.min(time / duration, 1);

                                window.scrollTo(0, startingY + diff * percent);

                                // Proceed with animation as long as we wanted it to.
                                if (time < duration) {
                                    window.requestAnimationFrame(step);
                                }
                            });
                        }
                        }>Go to top page</button>}
                </div>
            </div>
        </Fragment>
    );
}

export async function getServerSideProps(context) {
    try {
        let result = await axios.get(MangaMewAPIURL(`/manga/${context.query.id}?includes[]=cover_art&includes[]=author&includes[]=artist`));
        const data = result.data.data;

        let title = "";
        let altTitle = "";
        let description = "";
        let authors = [];
        let artists = [];
        let cover = "";
        let year = 0;
        let status = "";

        let tags = data.attributes.tags.map((item) => {
            return {
                id: item.id,
                name: item.attributes.name.en
            }
        });

        if (data.attributes.year) year = data.attributes.year;
        if (data.attributes.title) title = formatTitle(data.attributes.title);
        if (data.attributes.altTitles.length > 0) altTitle = formatAltTitles(data.attributes.altTitles);
        if (data.attributes.description) description = formatDesciption(data.attributes.description);
        if (data.attributes.status) status = data.attributes.status;


        data.relationships.forEach((rel) => {
            if (rel.type == "author") try { authors.push({ id: rel.id, name: rel.attributes.name }); } catch { }
            else if (rel.type == "artist") try { artists.push({ id: rel.id, name: rel.attributes.name }); } catch { }
            else if (rel.type == "cover_art") try { cover = rel.attributes.fileName; } catch { }
        });



        result = await axios.get(MangaMewAPIURL(`/manga/${context.query.id}/feed`), {
            params: {
                limit: 1,
                offset: 0,
                translatedLanguage: ['en'],
                contentRating: ['safe', 'suggestive', 'erotica', 'pornographic'],
                order: { chapter: 'asc' }
            },
            paramsSerializer: params=>qs.stringify(params,{indices:false, arrayFormat:"brackets"})
        });

        let firstChapterId = "";
        try{firstChapterId = result.data.data[0].id}catch{}




        return {
            props: {         
                id: data.id,
                title: title,
                altTitle: altTitle,
                description: description,
                authors: authors,
                artists: artists,
                cover: cover,
                tags: tags,
                status: status,
                year: year,

                firstChapterId: firstChapterId,
            }
        }
    }
    catch {
        return {
            notFound: true,
        }
    };
};
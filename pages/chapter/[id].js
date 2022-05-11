import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { formatAltTitles, formatTitle, formatDesciption, formatChapter } from "src/utilities";
import useApiAtHome from "src/hooks/useApiAtHome";
import { MangaMewAPIURL } from "src/config";
import uniqid from "uniqid";
import useApiAggregate from "src/hooks/useApiAggregate";
import SelectBox from "src/components/SelectBox";
import { useRouter } from "next/router";
import Loading from "src/components/Loading";
import Link from "next/link";
import BackNavigation from "src/components/BackNavigation";
import ImageLoader from "src/components/ImageLoader";
import Button from "src/components/Button";


export default function Chapter({ id, chapter, title, externalUrl, manga }) {
    const router = useRouter();
    const [aggregateApi, setApiAggregateParams] = useApiAggregate();
    const [atHomeApi, setApiAtHomeParams] = useApiAtHome();
    const [imageList, setImageList] = useState([]);
    const [chapterList, setChapterList] = useState([]);

    const [nextChapter, setNextChapter] = useState();
    const [preChapter, setPreChapter] = useState();
    const [curentChapter, setCurentChapter] = useState();


    useEffect(() => {
        setApiAggregateParams({ id: manga.id });
    }, []);

    useEffect(() => {
        setApiAtHomeParams({ chapterId: id });
    }, [id]);

    const changeChapter = (e) => {
        router.push(`/chapter/${e.id}`);
    }

    const skipNextChapter = (e) => {
        if (nextChapter) router.push(`/chapter/${nextChapter.id}`);
        else e.preventDefault();
    }
    const backPreChapter = (e) => {
        if (preChapter) router.push(`/chapter/${preChapter.id}`);
        else e.preventDefault();
    }

    useEffect(() => {
        if (aggregateApi.result && !aggregateApi.loading) {
            let list = aggregateApi.result.data.map(item => {
                return {
                    ...item,
                    toString: () => formatChapter(item.chapter)
                }
            });
            setChapterList(list);
        }
    }, [aggregateApi]);


    useEffect(() => {
        if (atHomeApi.result && !atHomeApi.loading && !externalUrl) {
            let list = [];
            atHomeApi.result.data.forEach(element => {
                list.push({
                    id: uniqid(),
                    src: [atHomeApi.result.baseUrl, "data", atHomeApi.result.hash, element].join('/')
                });
            });
            setImageList(list);
        }
    }, [atHomeApi]);

    useEffect(() => {
        let curentIndex = chapterList.findIndex(item => item.id == id || item.others.find(a=>a==id));
        if (curentIndex + 1 < chapterList.length) setNextChapter(chapterList[curentIndex + 1]);
        else setNextChapter(null);
        if (curentIndex - 1 >= 0) setPreChapter(chapterList[curentIndex - 1]);
        else setPreChapter(null);
        setCurentChapter(chapterList[curentIndex]);

    }, [chapterList, id]);

    return (
        <Fragment>
            <Head>
                <title>{[(chapter ? `Ch. ${chapter}` : "Oneshot"), title ? title : manga.title].join(' - ')}</title>
            </Head>
            <div className="mt-5">
                <BackNavigation href={`/manga/${manga.id}`} title={manga.title} />
            </div>
            <h2 className="mt-5 mb-3">{formatChapter(chapter, title)}</h2>
            {
                curentChapter !== undefined && preChapter !== undefined && nextChapter !== undefined &&
                <div className="grid grid-cols-12 gap-2 z-10 my-3">
                    <button className={`group transition-colors bg-grey col-span-2 px-2 flex items-center justify-center ${preChapter ? "active:bg-grey-dark" : "opacity-50 cursor-default"}`} onClick={backPreChapter}>
                        <span className={`material-icons-outlined transition-transform ${preChapter ? "group-hover:-translate-x-1" : ""}`}>chevron_left</span>
                        <span className="hidden sm:block sm:ml-3 text-left">Previous Chapter</span>
                    </button>
                    <div className="col-span-8">
                        <SelectBox list={chapterList} select={curentChapter} label={"Chapter"} onSelectedChange={changeChapter} maxDisplayItem={10}></SelectBox>
                    </div>
                    <button className={`group transition-colors bg-primary text-dominant col-span-2 px-2 flex items-center justify-center  ${nextChapter ? "active:bg-primary-dark" : "opacity-50 cursor-default"}`} onClick={skipNextChapter}>
                        <span className="hidden sm:block sm:mr-3 text-left">Next Chapter</span>
                        <span className={`material-icons-outlined transition-transform ${nextChapter ? "group-hover:translate-x-1" : ""}`}>navigate_next</span>
                    </button>
                </div>
            }
            {
                atHomeApi.result && !atHomeApi.loading && !externalUrl &&
                <Fragment>
                    <div className="flex flex-col items-center">
                        {
                            imageList.map(item => {
                                return <div key={item.id} className="relative max-w-2xl">
                                    <ImageLoader src={item.src}></ImageLoader>
                                </div>
                            })
                        }
                    </div>
                    {
                        atHomeApi.loading &&
                        <Loading></Loading>
                    }
                    {
                        nextChapter !== undefined && !atHomeApi.loading &&
                        <Link href={nextChapter ? `/chapter/${nextChapter.id}` : `/manga/${manga.id}`}>
                            <a>
                                <button className="bg-primary text-dominant w-full text-lg py-5 rounded-md active:bg-primary-dark transition-colors mt-3">{nextChapter ? "Read the next chapter" : "Go to manga page"}</button>
                            </a>
                        </Link>
                    }
                </Fragment>
            }
            {
                externalUrl &&
                <div className="flex flex-col text-center mt-20 justify-center items-center">
                    <p className="mb-5">{"This chapter can be read for free on the official publisher's website"}</p>
                    <Link href={externalUrl}>
                        <a target={"_blank"}>
                            <Button startIcon={<span className="material-icons-outlined">open_in_new</span>}>Read the chapter</Button>
                        </a>
                    </Link>
                </div>
            }
        </Fragment>
    )

}
export async function getServerSideProps({ query }) {
    try {
        let result = await axios.get(MangaMewAPIURL(`/chapter/${query.id}?includes[]=manga`));
        const data = result.data.data;

        if (data) {
            let chapter = {};
            let item = data;

            let manga = item.relationships.find(manga => manga.type == "manga");

            let newManga = {};
            newManga.id = manga.id;
            newManga.status = manga.attributes.status;
            newManga.year = manga.attributes.year;
            newManga.altTitle = formatAltTitles(manga.attributes.altTitles);
            newManga.title = formatTitle(manga.attributes.title);
            newManga.description = formatDesciption(manga.attributes.description);
            newManga.tags = manga.attributes.tags.map((tag) => {
                return {
                    id: tag.id,
                    name: tag.attributes.name.en,
                    group: tag.attributes.group,
                }
            });

            chapter.id = item.id;
            Object.assign(chapter, item.attributes);
            chapter.manga = newManga;

            return ({
                props: {
                    ...chapter
                }
            });
        }
    }
    catch (e) {
        return {
            notFound: true,
        }
    };
}

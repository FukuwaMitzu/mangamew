import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { formatAltTitles, formatTitle, formatDesciption } from "../../src/utilities";
import useApiAtHome from "../../src/hooks/useApiAtHome";
import { MangaMewAPIURL } from "../../src/config";
import uniqid from "uniqid";


export default function Chapter({ id, chapter, title, externalUrl, manga }) {
    const [atHomeApi, setApiAtHome] = useApiAtHome();
    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        setApiAtHome({ chapterId: id });
    }, []);

    useEffect(() => {
        if (atHomeApi.result && !atHomeApi.loading) {
            let list = [];
            atHomeApi.result.data.forEach(element => {
                list.push([atHomeApi.result.baseUrl, "data", atHomeApi.result.hash, element].join('/'));
            });
            setImageList(list);
        }
    }, [atHomeApi]);


    return (
        <Fragment>
            <Head>
                <title>{[(chapter ? `Ch. ${chapter}` : "Oneshot"), title ? title : manga.title].join(' - ')}</title>
            </Head>
            {
                externalUrl &&
                <p>This Chapter has externalUrl - {externalUrl}</p>
            }
            <div className="flex flex-col items-center">
                {
                    imageList.length > 0 && !atHomeApi.loading &&
                    imageList.map(item => {
                        return <div key={uniqid()} className="relative max-w-full">
                            <img src={item} loading="lazy" placeholder={"empty"}></img>
                        </div>
                    })
                }
            </div>
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

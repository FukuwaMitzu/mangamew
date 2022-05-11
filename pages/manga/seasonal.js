import useApiMangaList from "src/hooks/useApiMangaList";
import usePageIndex from "src/hooks/usePageIndex";
import Pagination from "src/components/Pagination";
import MangaList from "src/components/cards/MangaList";
import BackNavigation from "src/components/BackNavigation";
import { Fragment, useEffect, useState } from "react";
import Loading from "src/components/Loading";
import { useRouter } from "next/router";
import axios from "axios";
import { MangaMewAPIURL } from "../../src/config";
import useApiStatisticList from "src/hooks/useApiStatisticList";

export default function SeasonalManga({ seasonal, page }) {
    const router = useRouter();

    const [mangaList, setMangaList] = useState([]);

    const [statisticApi, setStatisticApiParams] = useApiStatisticList();
    const [pageHook, setPageHook] = usePageIndex(page);
    const [mangaListApi, setMangaListApiParams] = useApiMangaList();

    
    const updatePageChange = (e) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page: e + 1 },
        }, undefined, { shallow: true, scroll: true });
    };




    useEffect(() => {
        setMangaList([]);
        setMangaListApiParams({
            ids: seasonal.mangaIds,
            limit: 32,
            offset: pageHook.offset,
            order: { followedCount: "desc" }
        });
    }, [pageHook]);


    useEffect(() => {
        if (mangaListApi.result && !mangaListApi.loading) {
            setMangaList(mangaListApi.result.data);
            setStatisticApiParams({
                manga: mangaListApi.result.data.map(item => item.id)
            });
        }
    }, [mangaListApi]);

    useEffect(() => {
        if (statisticApi.result && !statisticApi.loading && mangaListApi.result){
            setMangaList(mangaListApi.result.data.map(item => {
                try {
                    item.follows = statisticApi.result.data[item.id].follows || null;
                } catch {
                    item.follows = null;
                }
                try {
                    item.average = statisticApi.result.data[item.id].average || null;
                } catch {
                    item.average = null;
                }
                return item;
            }));
        }
    }, [statisticApi]);

    return (
        <Fragment>
            <BackNavigation href={"/"} title={seasonal.name} />
            {
                mangaList.length>0 && !mangaListApi.loading ?
                    <div className="mt-5">
                        <MangaList list={mangaList}></MangaList>
                        <div className="flex justify-center mt-10">
                            <Pagination limit={pageHook.limit} offset={pageHook.offset} total={mangaListApi.result.total} onPageChange={updatePageChange}></Pagination>
                        </div>
                    </div>
                    :
                    <Loading></Loading>
            }
        </Fragment>
    );
}



export async function getServerSideProps({ query }) {
    try {
        const result = await axios.get(MangaMewAPIURL("/user/d2ae45e0-b5e2-4e7f-a688-17925c2d7d6b/list"),
            {
                params: {
                    limit: 1
                },
            });

        let seasonal = {};
        seasonal.id = result.data.data[0].id;
        seasonal.name = result.data.data[0].attributes.name;
        seasonal.mangaIds = result.data.data[0].relationships.filter(item => item.type == "manga").map(item => item.id);

        let page = query.page || 1;
        return {
            props: { seasonal: seasonal, page: page }
        }
    }
    catch (e) {

        return {
            notFound: true
        }
    }
}
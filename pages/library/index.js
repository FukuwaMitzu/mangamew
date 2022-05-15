import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import useAuth from "src/hooks/useAuth";
import Head from "next/head";
import BackNavigation from "src/components/BackNavigation";
import useApiUserFollowsManga from "src/hooks/useApiUserFollowsManga";
import Pagination from "src/components/Pagination";
import { MangaList } from "src/components/cards";
import usePageIndex from "src/hooks/usePageIndex";
import Loading from "src/components/Loading";
import useApiStatisticList from "src/hooks/useApiStatisticList";

export default function LibaryPage() {
    const router = useRouter();
    const auth = useAuth();

    const [mangaList, setMangaList] = useState([]);
    const [pageHook, setPageHook] = usePageIndex();
    const [userFollowMangaApi, setApiUserFollowMangaParams] = useApiUserFollowsManga();
    const [statisticApi, setStatisticApiParams] = useApiStatisticList();


    useEffect(() => {
        if (!auth.isAuthenticated) router.push("/login");
    }, [router.isReady, auth]);

    useEffect(() => {
        if (auth.isAuthenticated) {
            setApiUserFollowMangaParams({ limit: pageHook.limit, offset: pageHook.offset });
        }
    }, []);

    useEffect(() => {
        if (!userFollowMangaApi.loading && userFollowMangaApi.result) {
            setPageHook({ limit: userFollowMangaApi.result.limit, offset: userFollowMangaApi.result.offset, total: userFollowMangaApi.result.total });
            setMangaList(userFollowMangaApi.result.data);
            setStatisticApiParams({
                manga: userFollowMangaApi.result.data.map(item => item.id)
            });
        }
    }, [userFollowMangaApi]);

    useEffect(() => {
        if (statisticApi.result && !statisticApi.loading && userFollowMangaApi.result) {
            setMangaList(userFollowMangaApi.result.data.map(item => {
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



    const handelPageChange = (e) => {
        router.push({
            pathname: router.pathname,
            query: {
                page: e.value
            }
        }, undefined, { shallow: true });
    }


    return (
        <Fragment>
            <Head>
                <title>Libary</title>
            </Head>
            <div className="mt-5">
                <BackNavigation href={"/"} title={"Libary"}></BackNavigation>
                {
                    mangaList.length > 0 || !userFollowMangaApi.loading ?

                        mangaList.length > 0 ?
                            <div className="mt-5">
                                <MangaList list={mangaList}></MangaList>
                                <div className="flex justify-center mt-10">
                                    <Pagination limit={pageHook.limit} offset={pageHook.offset} total={pageHook.total} onPageChange={handelPageChange}></Pagination>
                                </div>
                            </div>
                        :
                        <div className="bg-grey p-5 mt-10 text-center">List is empty</div>

                        :
                        <Loading></Loading>
                }
            </div>
        </Fragment>
    );
};
import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import SearchFilterBar from "src/components/SearchFilterBar"


import { useRouter } from "next/router";
const MangaList = dynamic(() => import("src/components/cards/MangaList"), {ssr:false});
const Pagination = dynamic(() => import("src/components/Pagination"),  {ssr:false, loading: ()=><Loading></Loading>});

import SelectBox from "src/components/SelectBox";
import BackNavigation from "src/components/BackNavigation";
import Loading from "src/components/Loading";

import useApiMangaList from "src/hooks/useApiMangaList";
import useApiTagList from "src/hooks/useApiTagList";
import useApiStatisticList from "src/hooks/useApiStatisticList";
import usePageIndex from "src/hooks/usePageIndex";


const orderList = [
    {
        value: {
            relevance: "desc",
        },
        toString: () => "Best Match"
    },
    {
        value: {
            latestUploadedChapter: "desc",
        },
        toString: () => "Latest Upload"
    },
    {
        value: {
            latestUploadedChapter: "asc",
        },
        toString: () => "Oldest Upload"
    },
    {
        value: {
            followedCount: "desc",
        },
        toString: () => "Most Follows"
    },
    {
        value: {
            followedCount: "asc",
        },
        toString: () => "Fewest Follows"
    },
    {
        value: {
            year: "asc",
        },
        toString: () => "Year Ascending"
    },
    {
        value: {
            year: "desc",
        },
        toString: () => "Year Descending"
    },
    
]

/**
 * 
 * include
 * exclude
 * page
 * title
 * content = contentRaiting
 * statuses = publicationStatus
 * demos = demogaphic
 */
export default function TitlePage({ query }) {
    const router = useRouter();
    const [mangaApi, setMangaApiParams] = useApiMangaList();
    const [tagApi, setTagApiParams] = useApiTagList();
    const [statisticApi, setStasisticParams] = useApiStatisticList();
    const [page, setPage] = usePageIndex(query.page);
    const [order, setOrder] = useState(orderList[0]);



    const [demographic, setDemoGraphic] = useState([
        {
            id: "demographic-shounen",
            mode: 0,
            name: "shounen"
        },
        {
            id: "demographic-shoujo",
            mode: 0,
            name: "shoujo"
        },
        {
            id: "demographic-seinen",
            mode: 0,
            name: "seinen"
        },
        {
            id: "demographic-josei",
            mode: 0,
            name: "josei"
        },
        {
            id: "demographic-none",
            mode: 0,
            name: "none"
        },
    ]);
    const [contentRating, setContentRaiting] = useState([
        {
            id: "contentRating-safe",
            name: "safe",
            mode: 0,
        },
        {
            id: "contentRating-suggestive",
            name: "suggestive",
            mode: 0,
        },
        {
            id: "contentRating-erotica",
            name: "erotica",
            mode: 0,
        },
        {
            id: "contentRating-pornographic",
            name: "pornographic",
            mode: 0,
        },
    ]);
    const [publicStatus, setPublickStatus] = useState([
        {
            id: "publicstatus-ongoing",
            name: "ongoing",
            mode: 0,
        },
        {
            id: "publicstatus-completed",
            name: "completed",
            mode: 0,
        },
        {
            id: "publicstatus-hiatus",
            name: "hiatus",
            mode: 0,
        },
        {
            id: "publicstatus-cancelled",
            name: "cancelled",
            mode: 0,
        },
    ]);

    const [tagList, setTagList] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [mangaList, setMangaList] = useState([]);

    //Init tags
    useEffect(() => {
        let include = [];
        let exclude = [];
        try {
            include = query.include.split(',');
        }
        catch { }
        try {
            exclude = query.exclude.split(',');
        }
        catch { }
        setTagApiParams({ include: include, exclude: exclude });
    }, []);

    //Update state when router query changed
    useEffect(() => {
        const rQuery = router.query;
        let include = [];
        let exclude = [];
        let demos = [];
        let statuses = [];
        let content = [];
        try {
            include = rQuery.include.split(',');
        } catch { }
        try {
            exclude = rQuery.exclude.split(',');
        } catch { }
        try {
            demos = rQuery.demos.split(',');
        } catch { }
        try {
            statuses = rQuery.statuses.split(',');
        } catch { }
        try {
            content = rQuery.content.split(',');
        } catch { }

        let list = tagList.map((item) => {
            let mode = 0;
            include.forEach(element => {
                if (item.id.startsWith(element) && element != "") mode = 1;
            });
            exclude.forEach(element => {
                if (item.id.startsWith(element) && element != "") mode = 2;
            });

            return {
                id: item.id,
                name: item.name,
                group: item.group,
                mode: mode
            };
        });
        setDemoGraphic(demographic.map(item => {
            if (demos.some((demo) => demo == item.name)) item.mode = 1;
            else item.mode = 0;
            return item;
        }));
        setContentRaiting(contentRating.map(item => {
            if (content.some((a) => a == item.name)) item.mode = 1;
            else item.mode = 0;
            return item;
        }));
        setPublickStatus(publicStatus.map(item => {
            if (statuses.some((status) => status == item.name)) item.mode = 1;
            else item.mode = 0;
            return item;
        }));

        setTagList(list.sort((a, b) => a.name.localeCompare(b.name)));
    }, [router]);

    useEffect(() => {
        try{
            
            let title = router.query.title;
            if(title!==undefined)setSearchTitle(title);
        }catch{}
    }, [router]);

    useEffect(() => {
        try {
            if(router.query.order){
                let qOrder = router.query.order;
                qOrder = qOrder.split('.');
                if (qOrder.length == 2) {
                    orderList.forEach(item => {
                        try {
                            if (item.value[qOrder[0]] == qOrder[1])
                                setOrder(item);
                        } catch { }
                    });
                }
            }
        } catch { }
    }, [router]);



    useEffect(() => {
        if (!tagApi.loading && tagApi.result)
            setTagList([...tagApi.result.data]);
    }, [tagApi]);


    useEffect(() => {
        if (tagList.length > 0) {
            setMangaList([]);
            setMangaApiParams({
                includedTags: tagList.filter((item) => item.mode == 1).map(item => item.id),
                excludedTags: tagList.filter((item) => item.mode == 2).map(item => item.id),
                publicationDemographic: demographic.filter((item) => item.mode == 1).map(item => item.name),
                contentRating: contentRating.filter((item) => item.mode == 1).map((item) => item.name),
                status: publicStatus.filter((item) => item.mode == 1).map((item) => item.name),
                title: searchTitle,
                limit: Math.min(page.limit, 10000 - page.offset),
                offset: page.offset,
                order: order.value
            });
        }
    }, [tagList, searchTitle, demographic, publicStatus, contentRating]);

    useEffect(() => {
        if (!mangaApi.loading && mangaApi.result) {

            setMangaList(mangaApi.result.data);
            setStasisticParams({ manga: mangaApi.result.data.map(item => item.id) });
            setPage({ ...page, total: mangaApi.result.total });
        }
    }, [mangaApi]);

    useEffect(() => {
        if (!statisticApi.loading && statisticApi.result)
            setMangaList(mangaList.map(item => {
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
    }, [statisticApi]);

    //Trigger function detects whether user closed filter menu
    const updateFilter = (tags, demos, statuses, content) => {
        tags.sort((a, b) => a.name.localeCompare(b.name));

        let includeList = tags.filter((item) => item.mode == 1).map(item => item.id.substring(0, 5)).join(',');
        let excludeList = tags.filter((item) => item.mode == 2).map(item => item.id.substring(0, 5)).join(',');
        let searchQuery = {};

        if (includeList) searchQuery['include'] = includeList;
        if (excludeList) searchQuery['exclude'] = excludeList;


        let confirmFilterChanged = false;
        //Check tags are changed
        for (let i = 0; i < tagList.length; i++) {
            if (tagList[i].mode != tags[i].mode) {
                confirmFilterChanged = true;
                break;
            }
        }
        //Check demos are changed
        for (let i = 0; i < demographic.length; i++) {
            if (demographic[i].mode != demos[i].mode) {
                confirmFilterChanged = true;
                break;
            }
        }
        //Check statuses are changed
        for (let i = 0; i < publicStatus.length; i++) {
            if (publicStatus[i].mode != statuses[i].mode) {
                confirmFilterChanged = true;
                break;
            }
        }
        //Check content are changed
        for (let i = 0; i < contentRating.length; i++) {
            if (contentRating[i].mode != content[i].mode) {
                confirmFilterChanged = true;
                break;
            }
        }

        if (confirmFilterChanged)
            router.push({
                pathname: router.pathname,
                query: {                   
                    ...searchQuery,
                    title: searchTitle,
                    page: 1,
                    demos: demos.filter((a) => a.mode == 1).map((a) => a.name).join(','),
                    content: content.filter((a) => a.mode == 1).map((a) => a.name).join(','),
                    statuses: statuses.filter((a) => a.mode == 1).map((a) => a.name).join(','),
                    order:router.query.order,
                },
            }, undefined, { shallow: true });
    };
    //Trigger function detects whether searchTitle is updated
    const updateSearch = (e) => {
        if (searchTitle != e) {
            router.push({
                pathname: router.pathname,
                query: { ...router.query, title: e, page: 1 },
            }, undefined, { shallow: true });
        }
    };
    const updatePageChange = (e) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page: e + 1 },
        }, undefined, { shallow: true, scroll: true });
    };
    const updateOrder = (e) => {
        let iOrder = Object.keys(e.value)[0];
        router.push({
            pathname: router.pathname,
            query: { ...router.query, order: iOrder + "." + e.value[iOrder], page: 1 },
        }, undefined, { shallow: true});
    }
    return (
        <Fragment>
            <Head>
                <title>Advanced Search</title>
            </Head>
            <div className="my-10">
                <BackNavigation href={"/"} title={"Advanced Search"}></BackNavigation>
            </div>
            {
                tagList.length > 0 &&
                <Fragment>
                    <div className="mb-8">
                        <SearchFilterBar filterList={tagList} publicStatusList={publicStatus} contentRatingList={contentRating} demographicList={demographic} onUpdateFilter={updateFilter} onSearch={updateSearch} title={searchTitle}></SearchFilterBar>
                    </div>
                    <div className="flex justify-between flex-wrap gap-3 mb-5">
                        <div className="min-w-0 w-full max-w-xs">
                            <SelectBox list={orderList} select={order} label={"Sort By"} onSelectedChange={updateOrder}></SelectBox>
                        </div>
                    </div>
                </Fragment>
            }            
            {
                mangaList.length>0 && !mangaApi.loading &&
                <Fragment>
                    <MangaList list={mangaList}></MangaList>                   
                    <div className="mx-auto w-fit mt-10">
                        <Pagination limit={page.limit} offset={page.offset} total={Math.min(page.total, 10000)} onPageChange={updatePageChange}></Pagination>
                    </div>
                </Fragment>
            }
            {
                mangaApi.loading &&
                <Loading></Loading>
            }
        </Fragment>
    )

}


export async function getServerSideProps({ query }) {
    return {
        props: { query: query }
    }
}
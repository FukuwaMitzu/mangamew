import { Fragment, useCallback, useEffect, useState } from "react";
import Head from "next/head";
import SearchFilterBar from "../../src/components/SearchFilterBar"


import { useRouter } from "next/router";
import { MangaList } from "../../src/components/cards";
import Image from "next/image";
import Pagination from "../../src/components/Pagination";
import BackNavigation from "../../src/components/BackNavigation";


import useApiMangaList from "../../src/hooks/useApiMangaList";
import useApiTagList from "../../src/hooks/useApiTagList";
import useApiStatisticList from "../../src/hooks/useApiStatisticList";
import usePageIndex from "../../src/hooks/usePageIndex";
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
        setTagApiParams({include: include, exclude: exclude});
    }, []);

    //Init demograp, raiting,...
    useEffect(() => {
        if (query.demos) {
            let qDemo = query.demos.split(',');
            setDemoGraphic(
                demographic.map((data) => {
                    if (qDemo.some((item) => item == data.name)) data.mode = 1;
                    return data;
                }
                )
            );

        }

        if (query.content) {
            let qContent = query.content.split(',');
            setContentRaiting(
                contentRating.map((data) => {
                    if (qContent.some((item) => item == data.name)) data.mode = 1;
                    return data;
                }
                )
            );
        }
        if (query.statuses) {
            let qStatus = query.statuses.split(',');
            setPublickStatus(
                publicStatus.map((data) => {
                    if (qStatus.some((item) => item == data.name)) data.mode = 1;
                    return data;
                }
                )
            );
        }
    }, []);



    //Update state when router query changed
    useEffect(() => {
        if (tagList.length == 0) return;
        const query = router.query;
        let include = [];
        let exclude = [];
        let demos = [];
        let statuses = [];
        let content = [];
        try {
            include = query.include.split(',');
        } catch { }
        try {
            exclude = query.exclude.split(',');
        } catch { }
        try {
            demos = query.demos.split(',');
        } catch { }
        try {
            statuses = query.statuses.split(',');
        } catch { }
        try {
            content = query.content.split(',');
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
        if (router.isReady && router.query.title != undefined)
            setSearchTitle(router.query.title);
    }, [router]);




    useEffect(()=>{
        if(!tagApi.loading && tagApi.result)
        setTagList([...tagApi.result.data]);
    }, [tagApi]);


    useEffect(()=>{
        if(tagList.length>0){
            setMangaApiParams({
                includedTags: tagList.filter((item) => item.mode == 1).map(item => item.id),
                excludedTags: tagList.filter((item) => item.mode == 2).map(item => item.id),
                publicationDemographic: demographic.filter((item) => item.mode == 1).map(item => item.name),
                contentRating: contentRating.filter((item) => item.mode == 1).map((item) => item.name),
                status: publicStatus.filter((item) => item.mode == 1).map((item) => item.name),
                title: searchTitle,
                limit: Math.min(page.limit, 10000 - page.offset),
                offset: page.offset
            });
        }
    }, [tagList, searchTitle, demographic, publicStatus, contentRating]);

    useEffect(()=>{
        if(!mangaApi.loading && mangaApi.result)
        {
            
            setMangaList(mangaApi.result.data);
            if(mangaApi.result.data.length>0)setStasisticParams({manga: mangaApi.result.data.map(item=>item.id)});
            setPage({...page, total:mangaApi.result.total, offset: mangaApi.result.offset, limit: mangaApi.result.limit});
        }
    }, [mangaApi]);

    useEffect(()=>{
        if(!statisticApi.loading && statisticApi.result)
        setMangaList(mangaList.map(item=>{
            try{
            item.follows = statisticApi.result.data[item.id].follows;
            }catch{}
            try{
            item.average = statisticApi.result.data[item.id].average;
            }catch{}
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
                    statuses: statuses.filter((a) => a.mode == 1).map((a) => a.name).join(',')
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
        }, undefined, { shallow: true, scroll:true });
    };

    
    return (
        <Fragment>
            <Head>
                <title>Advanced Search</title>
            </Head>
            <div className="mb-16">
                <BackNavigation href={"/"} title={"Advanced Search"}></BackNavigation>
            </div>
            {
                tagList.length > 0 &&
                <div className="mb-8">
                    <SearchFilterBar filterList={tagList} publicStatusList={publicStatus} contentRatingList={contentRating} demographicList={demographic} onUpdateFilter={updateFilter} onSearch={updateSearch} title={searchTitle}></SearchFilterBar>
                </div>
            }
            {
                mangaApi.loading &&
                <div className="text-center">
                    <Image src="/images/loading.svg" alt="loading" width={35} height={35}></Image>
                </div>
            }
            {
                mangaApi.result && !mangaApi.loading &&
                <Fragment>
                    <p className="font-bold mb-5">
                        Found <span className="text-primary italic">{page.total}</span> results
                    </p>
                    <MangaList list={mangaApi.result.data}></MangaList>
                    <div className="mx-auto w-fit mt-10">
                        <Pagination limit={Math.min(page.limit, 32)} offset={page.offset} total={Math.min(page.total, 10000)} onPageChange={updatePageChange}></Pagination>
                    </div>
                </Fragment>
            }
        </Fragment>
    )

}


export async function getServerSideProps({ query }) {
    return {
        props: { query: query }
    }
}
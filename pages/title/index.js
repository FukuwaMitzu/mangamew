import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import SearchFilterBar from "../../src/components/SearchFilterBar"
import axios from "axios";
import { useRouter } from "next/router";
import { MangaList } from "../../src/components/cards";
import Image from "next/image";
import Pagination from "../../src/components/Pagination";
import BackNavigation from "../../src/components/BackNavigation";
import { MangaMewAPIURL } from "../../src/config";


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


    const [resultNav, setResultNav] = useState({ offset: 0, limit: 32, total: 0 });

    const [searchTitle, setSearchTitle] = useState("");
    const [tagList, setTagList] = useState([]);

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState([]);

    useEffect(() => {
        if (router.isReady && router.query.title != undefined)
            setSearchTitle(router.query.title);
    }, [router.query, router.isReady]);


    //Init tags
    useEffect(() => {
        let tagResult = [];
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
        axios.get(MangaMewAPIURL("/manga/tag")).then(
            (res) => {
                tagResult = res.data.data;
                let list = tagResult.map((item) => {
                    let mode = 0;
                    include.forEach(element => {
                        if (item.id.startsWith(element) && element != "") mode = 1;
                    });
                    exclude.forEach(element => {
                        if (item.id.startsWith(element) && element != "") mode = 2;
                    });
                    return {
                        id: item.id,
                        name: item.attributes.name.en,
                        group: item.attributes.group,
                        mode: mode
                    };
                });
                setTagList(list.sort((a, b) => a.name.localeCompare(b.name)));
            }
        );
    }, []);

    //Init page
    useEffect(() => {
        if (query.page) {
            setResultNav({ ...resultNav, offset: query.page <= 0 ? 0 : (query.page - 1) * 32 });
        }
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

    //Update tags
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
    }, [router.query]);

    //Page update
    useEffect(() => {   
        let a = Math.max(0,((router.query.page || 1) - 1)) * 32;
        setResultNav({ ...resultNav, offset: a});
    }, [router.query]);

    //Call api when states changed
    useEffect(() => {
        setLoading(true);
        if (tagList.length != 0) axios.get(
            MangaMewAPIURL("/manga?&includes[]=cover_art&includes[]=author&includes[]=artist&order[relevance]=desc&availableTranslatedLanguage[]=en"),
            {
                params: {
                    includedTags: tagList.filter((item) => item.mode == 1).map(item => item.id),
                    excludedTags: tagList.filter((item) => item.mode == 2).map(item => item.id),
                    publicationDemographic: demographic.filter((item) => item.mode == 1).map(item => item.name),
                    contentRating: contentRating.filter((item) => item.mode == 1).map((item) => item.name),
                    status: publicStatus.filter((item) => item.mode == 1).map((item) => item.name),
                    title: searchTitle,
                    limit: Math.min(resultNav.limit, 10000 - resultNav.offset),
                    offset: resultNav.offset
                },
            }
        ).then(
            ({ data, status }) => {
                let temp = []
                if (status == 200) {
                    temp = data.data.map((item) => {
                        let manga = {};
                        manga.authors = [];
                        manga.artists = [];
                        manga.cover = "/";
                        manga.id = item.id;
                        manga.status = item.attributes.status;
                        manga.title = item.attributes.title.en || item.attributes.title[Object.keys( item.attributes.title)[0]];
                        manga.tags = item.attributes.tags.map((tag) => {
                            return {
                                id: tag.id,
                                name: tag.attributes.name.en,
                                group: tag.attributes.group,
                            }
                        });
                        item.relationships.forEach((rel) => {
                            if (rel.type == "author") try { manga.authors.push({ id: rel.id, name: rel.attributes.name }); } catch { }
                            else if (rel.type == "artist") try { manga.artists.push({ id: rel.id, name: rel.attributes.name }); } catch { }
                            else if (rel.type == "cover_art") try { manga.cover = rel.attributes.fileName; } catch { }
                        });
                        return manga;
                    })
                }
                setLoading(false);
                setResult(temp);
                setResultNav({ ...resultNav, offset: data.offset, total: data.total });


                axios.get("https://api.mangadex.org/statistics/manga",
                    {
                        params: {
                            manga: temp.map((item) => item.id)
                        }
                    }
                ).then(
                    ({ data, status }) => {
                        if(status==200)
                        setResult(temp.map(item=>{
                            item.average = null;
                            item.follows = null;
                            try
                            {
                                item.average = data.statistics[item.id].rating.average
                            } catch{}
                            try{
                                item.follows = data.statistics[item.id].follows
                            }catch{}
                            return item;
                        }))
                    }
                ).catch(()=>{});
            }
        ).catch(()=>{});
    }, [tagList, searchTitle, demographic, contentRating, publicStatus]);

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
    }

    const updatePageChange = (e) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page: e + 1 },
        }, undefined, { shallow: true });
    }

    return (
        <Fragment>
            <Head>
                <title>Advanced Search</title>
            </Head>
            <div className="mb-16">
                <BackNavigation href={"/"} title={"Advanced Search"}></BackNavigation>
            </div>
            <div className="mb-8">
                <SearchFilterBar filterList={tagList} publicStatusList={publicStatus} contentRatingList={contentRating} demographicList={demographic} onUpdateFilter={updateFilter} onSearch={updateSearch} title={searchTitle}></SearchFilterBar>
            </div>
            {
                !loading &&
                <p className="font-bold mb-5">
                    Found <span className="text-primary italic">{resultNav.total}</span> results
                </p>
            }
            {
                loading &&
                <div className="text-center">
                    <Image src="/images/loading.svg" alt="loading" width={35} height={35}></Image>
                </div>
            }
            {
                !loading &&
                <Fragment>
                    <MangaList list={result}></MangaList>
                    <div className="mx-auto w-fit mt-10">
                        <Pagination limit={32} offset={resultNav.offset} total={Math.min(resultNav.total, 10000)} onPageChange={updatePageChange}></Pagination>
                    </div>
                </Fragment>
            }
        </Fragment>
    );
}


export async function getServerSideProps({ query }) {
    return {
        props: { query: query }
    }
}
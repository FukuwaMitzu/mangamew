import { Fragment, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import SearchFilterBar from "../../src/components/SearchFilterBar"
import axios from "axios";
import { useRouter } from "next/router";
import { MangaList } from "../../src/components/cards";
import Image from "next/image";
import ResultNavigation from "../../src/components/ResultNavigation";

export default function TitlePage({ query }) {
    const router = useRouter();

    const [resultNav, setResultNav] = useState({ offset: 0, limit: 32, total: 0});

    const [searchTitle, setSearchTitle] = useState("");
    const [tagList, setTagList] = useState([]);

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState({});

    useEffect(() => {
        if (router.isReady && router.query.title != undefined)
            setSearchTitle(router.query.title);
    }, [router.query]);

    
    //Init tags
    useEffect(() => {
        let tagResult = tagList;
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
        axios.get("https://api.mangadex.org/manga/tag").then(
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
                setTagList(list);
            }
        );
    }, []);

    //Init page
    useEffect(()=>{
        if(query.page){
            
            setResultNav({...resultNav, offset:query.page<=0? 0 :(query.page-1)*32});
        }
    },[]);

    const updateTagList = useMemo(() => () => {
        if (tagList.length == 0) return;
        const query = router.query;
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
        setTagList(list);
    });

    //Group tags
    useEffect(() => {
        updateTagList();
    }, [router.query]);

    //Page update
    useEffect(()=>{
        if(router.query.page){
            let a = (router.query.page-1)*32;
            setResultNav({...resultNav, offset:router.query.page<=0? 0 : a});
        }
    }, [router.query]);

    //Call api whether tagList or searchTitle states changed
    useEffect(() => {
        setLoading(true);
        if (tagList.length != 0) axios.get(
            "https://api.mangadex.org/manga?&includes[]=cover_art&includes[]=author&includes[]=artist&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[relevance]=desc",
            {
                params: {
                    includedTags: tagList.filter((item) => item.mode == 1).map(item => item.id),
                    excludedTags: tagList.filter((item) => item.mode == 2).map(item => item.id),
                    title: searchTitle,
                    limit: Math.min(resultNav.limit, 10000-resultNav.offset),
                    offset: resultNav.offset
                },
            }
        ).then(
            ({ data, status }) => {
                let temp = {}
                temp.data = [];

                if (status == 200) {
                    temp.data = data.data.map((item) => {
                        let manga = {};
                        manga.authors = [];
                        manga.artists = [];
                        manga.cover = "/";
                        manga.id = item.id;
                        manga.title = item.attributes.title.en;
                        manga.tags = item.attributes.tags.map((tag) => {
                            return {
                                id: tag.id,
                                name: tag.attributes.name.en,
                                group: tag.attributes.group,
                            }
                        });
                        item.relationships.forEach((rel) => {
                            if (rel.type == "author") manga.authors.push({ id: rel.id, name: rel.attributes.name });
                            else if (rel.type == "artist") manga.artists.push({ id: rel.id, name: rel.attributes.name });
                            else if (rel.type == "cover_art") manga.cover = rel.attributes.fileName;
                        });
                        manga.views = Math.floor(Math.random() * 1000000) + 1;
                        manga.bookmarks = Math.floor(Math.random() * 1000000) + 1;

                        return manga;
                    })

                    
                }
                setLoading(false);
                setResult(temp);
                setResultNav({...resultNav, offset: data.offset, total: Math.min(data.total, 10000)});
            }
        );
    }, [tagList, searchTitle]);

    //Trigger function detects whether tagList is updated
    const updateFilter = (e) => {
        
        let includeList = e.filter((item) => item.mode == 1).map(item => item.id.substring(0, 5)).join(',');
        let excludeList = e.filter((item) => item.mode == 2).map(item => item.id.substring(0, 5)).join(',');
        let searchQuery = {};

        if (includeList) searchQuery['include'] = includeList;
        if (excludeList) searchQuery['exclude'] = excludeList;


        for (let i = 0; i < tagList.length; i++) {
            if (tagList[i].mode != e[i].mode) {
                router.push({
                    pathname: router.pathname,
                    query: { ...searchQuery, title: searchTitle, page: 1 },
                }, undefined, { shallow: true });
                break;
            }
        }
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
            query: { ...router.query, page: e+1 },
        }, undefined, { shallow: true });
    }

    return (
        <Fragment>
            <Head>
                <title>Advanced Search</title>
            </Head>
            <div className="mb-8">
                <SearchFilterBar list={tagList} onUpdateFilter={updateFilter} onSearch={updateSearch} title={searchTitle}></SearchFilterBar>
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
                    <Image src="/images/loading.svg" width={35} height={35}></Image>
                </div>
            }
            {
                !loading &&
                <Fragment>
                    <MangaList list={result.data}></MangaList>
                    <div className="mx-auto w-fit mt-10">
                        <ResultNavigation limit={32} offset={resultNav.offset} total={resultNav.total} onPageChange={updatePageChange}></ResultNavigation>
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
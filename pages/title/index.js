import { Fragment, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import SearchFilterBar from "../../src/components/SearchFilterBar"
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";

export default function TitlePage({query}) {
    const [searchTitle, setSearchTitle] = useState(query.title||"");
    const [tagList, setTagList] = useState([]);
    const [result, setResult] = useState({});
    const router = useRouter();

    //Init Tags
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

    const updateTagList = useMemo(()=>()=>{
        if(tagList.length==0)return;
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

    useEffect(() => {
        updateTagList();
    }, [router.query]);

    useEffect(()=>{
        setSearchTitle(router.query.title);
    }, [router.query]);

    useEffect(() => {
        if(tagList.length!=0)axios.get(
            "https://api.mangadex.org/manga?&limit=32&offset=0&includes[]=cover_art&includes[]=author&includes[]=artist&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[relevance]=desc",
            {
                params: {
                    includedTags: tagList.filter((item) => item.mode == 1).map(item => item.id),
                    excludedTags: tagList.filter((item) => item.mode == 2).map(item => item.id),
                    title: searchTitle
                },
            }
        ).then(
            ({ data }) => {
                setResult(data);
            }
        );
    }, [tagList, searchTitle]);


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
                    query: {...searchQuery, title:searchTitle},
                }, undefined, {shallow:true});
                break;
            }
        }   
    };

    const updateSearch = (e)=>{
        if(searchTitle!=e){
            router.push({
                pathname: router.pathname,
                query: {...router.query, title:e},
            }, undefined, {shallow:true});
        }
    }

    return (
        <Fragment>
            <Head>
                <title>Advanced Search</title>
            </Head>
            <div>
                <SearchFilterBar list={tagList} onUpdateFilter={updateFilter} onSearch={updateSearch} title={searchTitle}></SearchFilterBar>
            </div>
            {
                result=={} && <div className="text-center mt-5">
                    <Image src="/images/loading.svg" width={40} height={40}></Image>
                </div>
            }
        </Fragment>
    );
}


export async function getServerSideProps({query}){
    return {
        props:{query:query}
    }
}
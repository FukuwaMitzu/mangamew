import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import SearchFilterBar from "../../src/components/SearchFilterBar"
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";

export default function TitlePage() {

    const [tagList, setTagList] = useState([]);
    const [result, setResult] = useState({});
    const router = useRouter();


    useEffect(() => {
        const query = router.query;
        let result = tagList;
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


        if (result.length == 0) {
            axios.get("https://api.mangadex.org/manga/tag").then(
                (res) => {
                    result = res.data.data;
                    let list = result.map((item) => {
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
        }
        else {
            let list = result.map((item) => {
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
        }
    }, [router.query]);


    useEffect(() => {
        // if(tagList!=[])axios.get(
        //     "https://api.mangadex.org/manga?limit=32&offset=0&includes[]=cover_art&includes[]=author&includes[]=artist&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[relevance]=desc",
        //     {
        //         params: {
        //             includedTags: tagList.filter((item) => item.mode == 1).map(item => item.id),
        //             excludedTags: tagList.filter((item) => item.mode == 2).map(item => item.id)
        //         },
        //     }
        // ).then(
        //     ({ data }) => {
        //         setResult(data)
        //     }
        // );
        if(tagList!=[])axios.get(
        "https://mangamew-api.herokuapp.com/manga?ids=a96676e5-8ae2-425e-b549-7f15dd34a6d8",
            {
                // params: {
                //     includedTags: tagList.filter((item) => item.mode == 1).map(item => item.id),
                //     excludedTags: tagList.filter((item) => item.mode == 2).map(item => item.id)
                // },
            }
        ).then(
            ({ data }) => {
                setResult(data)
            }
        );
        
    }, [router.query]);


    const updateFilter = (e) => {

        let includeList = e.filter((item) => item.mode == 1).map(item => item.id.substring(0, 5)).join(',');
        let excludeList = e.filter((item) => item.mode == 2).map(item => item.id.substring(0, 5)).join(',');
        let searchQuery = {};

        if (includeList) searchQuery['include'] = includeList;
        if (excludeList) searchQuery['exclude'] = excludeList;

        for (let i = 0; i < tagList.length; i++) {
            if (tagList[i].mode != e[i].mode) {
                setTagList(e);      
                router.push({
                    pathname: router.pathname,
                    query: searchQuery,
                }, undefined, { shallow: true });   
                break;
            }
        }
    };


    return (
        <Fragment>
            <Head>
                <title>Advanced Search</title>
            </Head>
            <div>
                <SearchFilterBar list={[...tagList]} onUpdateFilter={updateFilter}></SearchFilterBar>
            </div>

            {
                result=={} && <div className="text-center mt-5">
                    <Image src="/images/loading.svg" width={40} height={40}></Image>
                </div>
            }

        </Fragment>
    );
}

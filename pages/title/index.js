import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import SearchFilterBar from "../../src/components/SearchFilterBar"
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";

export default function TitlePage({ serverTagList }) {

    const [tagList, setTagList] = useState(serverTagList);
    const [result, setResult] = useState({});
    const router = useRouter();

    useEffect(() => {
        axios.get(
            "https://api.mangadex.org/manga?limit=32&offset=0&includes[]=cover_art&includes[]=author&includes[]=artist&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[relevance]=desc",
            {
                params: {
                    includedTags: tagList.filter((item) => item.mode == 1).map(item => item.id),
                    excludedTags: tagList.filter((item) => item.mode == 2).map(item => item.id)
                },
                headers:{
                    "Access-Control-Allow-Origin":"https://mangadex.org"
                }
            }
        ).then(
            ({ data }) => {
                setResult(data)
            }
        );

    }, [tagList]);

    const updateFilter = (e) => {

        let includeList = e.filter((item) => item.mode == 1).map(item => item.id.substring(0, 5)).join(',');
        let excludeList = e.filter((item) => item.mode == 2).map(item => item.id.substring(0, 5)).join(',');
        let searchQuery = {};

        if (includeList) searchQuery['include'] = includeList;
        if (excludeList) searchQuery['exclude'] = excludeList;

        router.push({
            pathname: router.pathname,
            query: searchQuery,
        }, undefined, { shallow: true });

        for (let i = 0; i < tagList.length; i++) {
            if (tagList[i].mode != e[i].mode) {
                setTagList(e);
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
                <SearchFilterBar list={tagList} onUpdateFilter={updateFilter}></SearchFilterBar>
            </div>
            <div className="text-center mt-5">
                <Image src="/images/loading.svg" width={40} height={40}></Image>
            </div>
        </Fragment>
    );
}


export async function getServerSideProps({ query }) {

    const result = await axios.get("https://api.mangadex.org/manga/tag");

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


    let list = result.data.data.map((item) => {
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

    return {
        props: { serverTagList: list }
    }
}
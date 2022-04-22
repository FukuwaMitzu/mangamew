import { Fragment } from "react";
import Head from "next/head";
import SearchFilterBar from "../../src/components/SearchFilterBar"
import axios from "axios";
import { useRouter } from "next/router";

export default function TitlePage({ tagList }) {
    const router = useRouter();
   
    const updateFilter = (e) => {
        let includeList = e.filter((item)=>item.mode==1).map(item=>item.id.substring(0, 5)).join(',');
        let excludeList = e.filter((item)=>item.mode==2).map(item=>item.id.substring(0, 5)).join(',');
        let searchQuery = {};

        if(includeList)searchQuery['include']=includeList;
        if(excludeList)searchQuery['exclude']=excludeList;

        router.push({
            pathname: router.pathname,
            query: searchQuery,
        });    
    }

    return (
        <Fragment>
            <Head>
                <title>Advanced Search</title>
            </Head>
            <div>
                <SearchFilterBar list={tagList} onUpdateFilter={updateFilter}></SearchFilterBar>
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
            if (item.id.startsWith(element) && element!="") mode = 1;
        });
        exclude.forEach(element => {
            if (item.id.startsWith(element)&& element!="") mode = 2;
        });
        return {
            id: item.id,
            name: item.attributes.name.en,
            group: item.attributes.group,
            mode: mode
        };
    });

    return {
        props: { tagList: list }
    }
}
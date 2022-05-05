import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MangaMewAPIURL } from "../config";
import qs from "qs";
import { formatDesciption, formatTitle, formatAltTitles } from "../utilities";


const initParams ={
    ids: [],
    includedTags: [],
    excludedTags: [],
    publicationDemographic: [],
    contentRating: [],
    status: [],
    title: "",
    limit: 32,
    offset: 0,
    order: {relevance:"desc"},
    availableTranslatedLanguage: ['en'],
    includes: ['cover_art', 'author', "artist"],    
}

export default function useApiMangaList() {
    const mountRef = useRef(false);


    const [params, setParams] = useState(initParams);
    const [state, setState] = useState({
        loading: true,
        result: null,
        err: null,
    });

    useEffect(() => {
        if (mountRef.current) {
            if (!state.loading) setState({ ...state, loading: true }); 
            axios.get(MangaMewAPIURL("/manga"),
                {
                    params: {
                        ...initParams,
                        ...params
                    },
                    paramsSerializer: e=>{
                        return qs.stringify(e, {indices:false, arrayFormat:"brackets", encode:false});
                    }
                }).then(({ data, status }) => {
                    let temp = [];
                    if (status == 200) {
                        temp = data.data.map((item) => {
                            let manga = {};
                            
                            manga.authors = [];
                            manga.artists = [];
                            manga.cover = "/";
                            manga.id = item.id;
                            manga.status = item.attributes.status;
                            manga.year = item.attributes.year;
                            manga.altTitle = formatAltTitles(item.attributes.altTitles);
                            manga.title = formatTitle(item.attributes.title);
                            manga.description = formatDesciption(item.attributes.description);
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
                        });
                        setState({
                            ...state,
                            result: {
                                data: temp,
                                limit: data.limit,
                                offset: data.offset,
                                total: data.total,
                            },
                            loading: false,
                        });
                    }
                }).catch(() => {
                    setState({ ...state, err: "Something went wrong", loading: false });
                });
        }
        else mountRef.current = true;
    }, [params]);

    return [state, setParams];
}
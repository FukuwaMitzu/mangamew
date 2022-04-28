import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MangaMewAPIURL } from "../config";

export default function useApiMangaList() {
    const mountRef = useRef(false);

    const [params, setParams] = useState({
        includedTags: [],
        excludedTags: [],
        publicationDemographic: [],
        contentRating: [],
        status: [],
        title: "",
        limit: 32,
        offset: 0
    });
    const [state, setState] = useState({
        loading: true,
        result: null,
        err: null,
    });

    useEffect(() => {
        if (mountRef.current) {
            if (!state.loading) setState({...state, loading:true});

            let q = params || {};
            let includedTags = q.includedTags || [];
            let excludedTags = q.excludedTags || [];
            let publicationDemographic = q.publicationDemographic || [];
            let contentRating = q.contentRating || [];
            let status = q.status || [];
            let title = q.title || "";
            let limit = q.limit || 0;
            let offset = q.offset || 0;

            axios.get(MangaMewAPIURL("/manga?&includes[]=cover_art&includes[]=author&includes[]=artist&order[relevance]=desc&availableTranslatedLanguage[]=en"),
                {
                    params: {
                        includedTags: includedTags,
                        excludedTags: excludedTags,
                        publicationDemographic: publicationDemographic,
                        contentRating: contentRating,
                        status: status,
                        title: title,
                        limit: limit,
                        offset: offset
                    },
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
                            manga.title = item.attributes.title.en || item.attributes.title[Object.keys(item.attributes.title)[0]];
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
                            loading:false,
                        });
                    }
                }).catch(() => {
                    setState({...state, err: "Something went wrong", loading:false });
                });
        }
        mountRef.current = true;
    }, [params]);

    return [state, setParams];
}
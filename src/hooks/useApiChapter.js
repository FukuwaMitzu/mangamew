import {useState, useRef, useEffect} from "react";
import { formatDesciption, formatTitle, formatAltTitles } from "../utilities";
import axios from "axios";
import { MangaMewAPIURL } from "../config";
import qs from "qs";
const initParams ={
    limit: 32,
    offset: 0,
    translatedLanguage: ['en'],
    includes: ['manga'],
    contentRating: ['safe', 'suggestive', 'erotica', 'pornographic'],
    order: { readableAt: 'desc' }
}



export default function useApiChapter(){
    const mountRef = useRef(false);
    const [params, setParams] = useState(initParams);
    const [state, setState] = useState({
        loading: true,
        result: null,
        err: null,
    });
    useEffect(() => {
        if (mountRef.current) {
            if(!state.loading)setState({...state, loading:true});

            axios.get(MangaMewAPIURL(`/chapter`),
                {
                    params: {
                        ...initParams,
                        ...params
                    },
                    paramsSerializer: items=>qs.stringify(items,{indices:false, arrayFormat:"brackets", encode:false}) 
                }
            ).then(
                ({ data, status }) => {
                    let result = [];
                    if(data.data.length > 0){
                        result = data.data.map((item)=>{
                            let chapter = {};

                            
                            let manga = item.relationships.find(manga=>manga.type=="manga");

                            let newManga = {};
                            newManga.id = manga.id;
                            newManga.status = manga.attributes.status;
                            newManga.year = manga.attributes.year;
                            newManga.altTitle = formatAltTitles(manga.attributes.altTitles);
                            newManga.title = formatTitle(manga.attributes.title);
                            newManga.description = formatDesciption(manga.attributes.description);
                            newManga.tags = manga.attributes.tags.map((tag) => {
                                    return {
                                        id: tag.id,
                                        name: tag.attributes.name.en,
                                        group: tag.attributes.group,
                                    }
                                });

                            chapter.id = item.id;
                            Object.assign(chapter, item.attributes);
                            chapter.manga = manga;
                            
                            return chapter;
                        });

                        setState({
                            ...state,
                            result:{
                                data: result,
                                limit: data.limit,
                                offset: data.offset,
                                total: data.total,
                            },
                            loading:false
                        })
                    }
                }
            ).catch(
                (props) => {
                    setState({...state, err:props, loading:false});
                }
            );
        }
        else mountRef.current = true;
    }, [params]);
    return [state, setParams];
}
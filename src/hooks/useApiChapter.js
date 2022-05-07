import {useState, useRef, useEffect} from "react";
import { formatDesciption, formatTitle, formatAltTitles } from "../utilities";
import axios from "axios";
import { MangaMewAPIURL } from "../config";
import qs from "qs";
const initParams ={
    includes: ['manga'],
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
            let id = params.id;
            delete params.id;
            axios.get(MangaMewAPIURL(`/chapter/${id}`),
                {
                    params: {
                        ...initParams,
                        ...params
                    },
                    paramsSerializer: items=>qs.stringify(items,{indices:false, arrayFormat:"brackets", encode:false}) 
                }
            ).then(
                ({ data, status }) => {
                    if(data.data){
                        let chapter = {};
                        let item = data.data;
                        
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
                            
                        setState({
                            ...state,
                            result:{
                                data: chapter,
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
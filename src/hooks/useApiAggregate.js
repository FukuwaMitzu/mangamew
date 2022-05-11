import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { MangaMewAPIURL } from "src/config";
import qs from "qs";


const initParams = {
    translatedLanguage: ['en'],
}
/**
 * 
 * @link https://api.mangadex.org/swagger.html#/Manga/get_manga__id__aggregate
 */
export default function useApiAggregate() {
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
            let id = params.id;
            delete params.id;

            axios.get(MangaMewAPIURL(`/manga/${id}/aggregate`), {
                params: {
                    ...initParams,
                    ...params
                },
                paramsSerializer: params=>qs.stringify(params,{indices:false, arrayFormat:"brackets"})
            }).then(({ data, status }) => {
                let chapterList = [];
                let volumes = Object.keys(data.volumes);
                volumes.forEach(volume => {
                    let chapters = Object.keys(data.volumes[volume].chapters);
                    chapters.forEach(chapter => {                       
                        chapterList.push(data.volumes[volume].chapters[chapter]);
                    });
                });
                chapterList.sort((a, b) => {
                    return a.chapter - b.chapter;
                });
                setState({
                    ...state,
                    result: {
                        data: chapterList
                    },
                    loading: false,
                })
            }).catch((e) => {
                setState({
                    ...state,
                    err: e, loading: false,
                });
            });
        }
        else mountRef.current = true;
    }, [params]);
    return [state, setParams];
}
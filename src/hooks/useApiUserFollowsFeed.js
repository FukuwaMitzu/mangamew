import axios from "axios";
import qs from "qs";
import { useEffect, useRef, useState } from "react";
import { MangaMewAPIURL } from "../config";
import { useSelector } from "react-redux";

const initParams ={
    limit: 100,
    offset: 0,
    translatedLanguage: ['en'],
    contentRating: ['safe', 'suggestive', 'erotica', 'pornographic'],
    order: { chapter: 'desc' }
}



export default function useApiUserFollowsFeed() {
    const userSelector = useSelector((state)=>state.User);
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
            axios.get(MangaMewAPIURL(`/user/follows/manga/feed`),
                {
                    params: {
                        ...initParams,
                        ...params
                    },
                    headers:{
                        "Authorization": `Bearer ${userSelector.token}`
                    },
                    paramsSerializer: items=>qs.stringify(items,{indices:false, arrayFormat:"brackets", encode:false}) 
                }
            ).then(
                ({ data, status }) => {
                    let result = [];
                    if(data.data.length > 0){
                        result = data.data.map((item)=>{
                            return {
                                id:item.id,
                                ...item.attributes,
                                manga: item.relationships.find((item)=>item.type=="manga")
                            }
                        });
                    }
                    setState({
                        ...state,
                        result:{
                            data:result, 
                            total: data.total, 
                            limit: data.limit, 
                            offset:data.offset
                    }, loading:false });
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
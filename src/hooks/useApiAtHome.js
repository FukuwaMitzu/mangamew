import axios from "axios";
import { useEffect, useState, useRef } from "react";
import {MangaMewAPIURL} from "../config"; 

const initParams ={
    chapterId: "",
}



export default function useApiAtHome(){
    const mountRef = useRef(false);
    const [params, setParams] = useState(initParams);
    const [state, setState] = useState({
        loading: true,
        result: null,
        err: null,
    });

    useEffect(()=>{
        if(mountRef.current){
            if(!state.loading)setState({...state, loading:true});
            axios.get(MangaMewAPIURL(`/at-home/server/${params.chapterId}`)).then(
                ({data, status})=>{
                    let baseUrl = data.baseUrl;
                    let hash = data.chapter.hash;
                    let result = data.chapter.data;

                    setState({...state, 
                        result: {
                            baseUrl:baseUrl, 
                            hash:hash, 
                            data:result
                        },
                        loading: false
                    })
                }
            ).catch(props=>{
                setState({...state, err:props, loading:false});
            });
        }
        else mountRef.current = true;
    }, [params]);


    return [state, setParams];
}
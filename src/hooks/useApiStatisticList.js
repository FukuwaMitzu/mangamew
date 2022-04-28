import { MangaMewAPIURL } from "../config";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
export default function useApiStatisticList() {
    const mountRef = useRef(false);

    
    const [params, setParams] = useState({
        manga: []
    });
    const [state, setState] = useState({
        loading: true,
        result: null,
        err: null,
    });

    useEffect(() => {
        if (mountRef.current) {
            if (!state.loading) setState({...state, loading:true});
            let manga = params.manga || [];
            axios.get(MangaMewAPIURL("/statistics/manga"),
                {
                    params: {
                        manga: manga
                    }
                }
            ).then(
                ({ data, status }) => {
                    if (status == 200) {
                        let temp = {};

                        Object.keys(data.statistics).forEach((key) => {
                            temp[key] = {};
                            temp[key].average = data.statistics[key].rating.average;
                            temp[key].follows = data.statistics[key].follows;
                        });
                        setState({
                            ...state,
                            result:{
                                data: temp
                            },
                            loading:false
                        });

                    }
                }
            ).catch((props) => {
                setState({...state, err: props, loading:false });
            })
        } 
        mountRef.current = true;
    }, [params]);


    return [state, setParams];
}
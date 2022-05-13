import {useState, useRef, useEffect} from "react";
import axios from "axios";
import { MangaMewAPIURL } from "../config";
import { useSelector } from "react-redux";

export default function useApiMangaUnfollow(){
    const mountRef = useRef(false);
    const userSelector = useSelector((state)=>state.User);

    const [params, setParams] = useState({});
    const [state, setState] = useState({
        loading: true,
        result: null,
        err: null,
    });
    useEffect(() => {
        if (mountRef.current) {
            if(!state.loading)setState({...state, loading:true});
            let id = params.id;

            axios.delete(MangaMewAPIURL(`/manga/${id}/follow`),{
                headers:{
                    "Authorization": `Bearer ${userSelector.token}`
                },
            }
            ).then(
                ({ data, status }) => {
                    if(status === 200){                    
                        setState({
                            ...state,
                            result:{
                                data: "ok",
                            },
                            loading:false
                        })
                    }
                }
            ).catch(
                (props) => {
                    setState({result:{data:"ko"}, err:props, loading:false});
                }
            );
        }
        else mountRef.current = true;
    }, [params]);
    return [state, setParams];
}
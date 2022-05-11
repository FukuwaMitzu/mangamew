import { useRouter } from "next/router";
import { useEffect, useState} from "react"

export default function usePageIndex(index){
    const router = useRouter();

    const [state, setState] = useState({
        limit: 32,
        total: 0,
        offset: 0,
    });

    useEffect(()=>{
        if(index){
            let a = ((index || 1) - 1) * 32;
            setState({...state,offset:a});
        } 
    }, [index]);

    useEffect(()=>{
        let a = ((router.query.page || 1) - 1) * state.limit;
        setState({limit: state.limit,total:state.total, offset:a});
    }, [router.query, state.total, state.limit, state.offset]);

    return [state, setState];
}
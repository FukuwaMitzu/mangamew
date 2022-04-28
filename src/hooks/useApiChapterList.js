import { useEffect } from "react";

export default function useApiChapterList(){
    const mountRef = useRef(false);

    const [params, setParams] = useState({
        manga: "",
        limit: 32,
        offset: 0
    });
    const [state, setState] = useState({
        loading: true,
        result: null,
        err: null,
    });

    useEffect(()=>{

    }, [params]);
}
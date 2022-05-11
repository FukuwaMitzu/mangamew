import { useEffect } from "react";
import axios from "axios";
import { useRef, useState } from "react";
import { MangaMewAPIURL } from "src/config";

export default function useApiTagList() {
    const mountRef = useRef(false);

    const [params, setParams] = useState({
        include: [],
        exclude: []
    });
    const [state, setState] = useState({
        loading: true,
        result: null,
        err: null,
    });

    useEffect(() => {

        if (mountRef.current) {
            if (!state.loading) setState({...state, loading:true});
            axios.get(MangaMewAPIURL("/manga/tag")).then(
                ({ data }) => {
                    let include = params.include || [];
                    let exclude = params.exclude || []
                    let tagResult = data.data;
                    let list = tagResult.map((item) => {
                        let mode = 0;
                        include.forEach(element => {
                            if (item.id.startsWith(element) && element != "") mode = 1;
                        });
                        exclude.forEach(element => {
                            if (item.id.startsWith(element) && element != "") mode = 2;
                        });
                        return {
                            id: item.id,
                            name: item.attributes.name.en,
                            group: item.attributes.group,
                            mode: mode
                        };
                    });
                    setState(
                        {...state,
                            result: {
                                data: list.sort((a, b) => a.name.localeCompare(b.name))
                            },
                            loading:false
                        });
                }
            ).catch((props) => {
                setState({...state,loading:false, err: props });
            });
        }
        else mountRef.current = true;
    }, [params]);

    return [state, setParams]
}
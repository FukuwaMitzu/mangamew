import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MangaMewAPIURL } from "../config";
import qs from "qs";
import { useSelector } from "react-redux";



export default function useApiUserFollowsMangaId() {
    const userSelector = useSelector((state) => state.User);
    const mountRef = useRef(false);


    const [params, setParams] = useState({});
    const [state, setState] = useState({
        loading: true,
        result: null,
        err: null,
    });

    useEffect(() => {
        if (mountRef.current && userSelector.isAuthenticated) {
            if (!state.loading) setState({ ...state, loading: true });
            axios.get(MangaMewAPIURL(`/user/follows/manga/${params.id}`),
            // axios.get(`https://api.mangadex.org/user/follows/manga/${params.id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${userSelector.token}`
                    },
                    paramsSerializer: e => {
                        return qs.stringify(e, { indices: false, arrayFormat: "brackets", encode: false });
                    }
                }).then(({ data, status }) => {
                    if (status === 200)
                        setState({
                            ...state,
                            result: {
                                data: "ok"
                            },
                            loading: false,
                        });
                }).catch(() => {
                    setState({result: {
                        data: "ko"
                    }, err: "Something went wrong", loading: false });
                });
        }
        else mountRef.current = true;
    }, [params]);

    return [state, setParams];
}
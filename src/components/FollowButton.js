import { Fragment, useEffect, useState } from "react"
import useApiMangaFollow from "src/hooks/useApiMangaFollow";
import useApiMangaUnfollow from "src/hooks/useApiMangaUnfollow";
import useApiUserFollowsMangaId from "src/hooks/useApiUserFollowsMangaId";
import Button from "./Button";
import Loading from "./Loading";

export default function FollowButton({ mangaId }) {

    const [userFollowMangaIdApi, setApiUserFollowMangaIdParams] = useApiUserFollowsMangaId();
    const [mangaFollowApi, setApiMangaFollowParams] = useApiMangaFollow();
    const [mangaUnFollowApi, setApiMangaUnfollowParams] = useApiMangaUnfollow();
    const [isLoading, setLoading] = useState(true);

    useEffect(()=>{
        if(!mangaFollowApi.loading || !mangaUnFollowApi.loading)
        setApiUserFollowMangaIdParams({id:mangaId});
    }, [mangaId, mangaFollowApi, mangaUnFollowApi]);

    const handleClick = ()=>{
        console.log(userFollowMangaIdApi)
        if(userFollowMangaIdApi.result && userFollowMangaIdApi.result.data == "ok"){
            setApiMangaUnfollowParams({id:mangaId});
        }
        else setApiMangaFollowParams({id:mangaId});
    }

    useEffect(() => {
        setLoading(mangaFollowApi.loading || mangaUnFollowApi.loading);
    }, [mangaUnFollowApi, mangaFollowApi]);


    return (
        <Fragment>
            {
                !userFollowMangaIdApi.loading?
                <Button type="outlined" endIcon={
                    userFollowMangaIdApi.result && userFollowMangaIdApi.result.data=="ok"?
                    <></>
                    :
                    <span className="material-icons-outlined text-primary">bookmark_add</span>

                } onClick={handleClick}>
                    {
                        userFollowMangaIdApi.result && userFollowMangaIdApi.result.data=="ok"?
                        "Unfollow"
                        :
                        "Follow"
                    }
                </Button>
                :
                <Button type={"outlined"} endIcon={<Loading width={15} height={15}/>}></Button>
            }
        </Fragment>
    )
}
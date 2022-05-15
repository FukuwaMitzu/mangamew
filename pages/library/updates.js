import { Fragment, useEffect, useState } from "react";
import useApiMangaList from "src/hooks/useApiMangaList";
import useApiUserFollowsFeed from "src/hooks/useApiUserFollowsFeed";
import BackNavigation from "src/components/BackNavigation";
import FeedCard from "src/components/cards/FeedCard";
import Loading from "src/components/Loading";
export default function Updates(){
    const [userFeedApi, setApiUserFeedParams] = useApiUserFollowsFeed();
    const [mangaApi, setApiMangaParams] = useApiMangaList();

    const [mangaList, setMangaList] = useState([]);
    const [chapterMap, setChapterMap] = useState(new Map());

    useEffect(()=>{
        setApiUserFeedParams({limit:24, order:{readableAt:"desc"}});
    }, []);

    useEffect(()=>{
        if(userFeedApi.result && !userFeedApi.loading){
            if(userFeedApi.result.data)
            {
                userFeedApi.result.data.forEach((item)=>{
                    const mapFound = chapterMap.get(item.manga.id);
                    if(mapFound)mapFound.push(item);
                    else chapterMap.set(item.manga.id, [item]);
                });
                
                setChapterMap(new Map(chapterMap));
                setApiMangaParams({ids: Array.from(chapterMap.keys())});
            }
            
        }
        
    }, [userFeedApi]);

    useEffect(()=>{
        if(mangaApi.result && !mangaApi.loading){
            setMangaList(mangaApi.result.data)
        }
    }, [mangaApi]);

    return (
        <Fragment>
            <BackNavigation href={"/"} title={"Updates"} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            {
                mangaList.length>0 && !mangaApi.loading &&
                mangaList.map(item=>{
                    return <FeedCard key={item.id} manga={item} chapters={chapterMap.get(item.id)}></FeedCard>
                })
            }
            {
                mangaApi.loading &&
                <Loading></Loading>
            }
            </div>
        </Fragment>
    );
}
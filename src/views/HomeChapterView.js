import useApiMangaList from "../hooks/useApiMangaList";
import useApiChapterList from "../hooks/useApiChapterList";
import useLazyFetching from "../hooks/useLazyFetching";
import Loading from "../../src/components/Loading";
import { useEffect, useState } from "react";
import { UpdateChapterList } from "../components/cards";

export default function HomeChapterView() {
    const [chapterListApi, setApiChapterListParams] = useApiChapterList();
    const [mangaApi, setApiMangaParams] = useApiMangaList();

    const [mangaList, setMangaList] = useState(new Map());
    const [chapterList, setChapterList] = useState(new Map());

    const [chapterContainerRef, setRefreshFeedApi] = useLazyFetching(chapterListApi, (fetchData) => {
        setApiChapterListParams({
            offset: fetchData.offset,
            limit: fetchData.limit,
        });
    });


    useEffect(() => {
        setApiChapterListParams({ limit: 40});
    }, []);

    useEffect(() => {
        if (chapterListApi.result && !chapterListApi.loading) {
            const ChapterMap = new Map(chapterList);
            chapterListApi.result.data.forEach(item=>{
                ChapterMap.set(item.id, item);
            });

            setChapterList(ChapterMap);
            setApiMangaParams({
                ids: chapterListApi.result.data.map((item) => item.manga.id),
                limit: chapterListApi.result.data.length,
                availableTranslatedLanguage:[]
            });
        }
    }, [chapterListApi]);

    
    useEffect(() => {
        if (mangaApi.result && !mangaApi.loading) {
            const output = new Map(mangaList);
            mangaApi.result.data.forEach(item=>{
                output.set(item.id, item);
            });
            setMangaList(output);
        }
    }, [mangaApi]);

    useEffect(() => {
        let output = new Map(chapterList);
        for( const [key, item] of output){
            if (!item.manga.cover) {
                let manga = mangaList.get(item.manga.id);
                if (manga) {
                    item.manga = manga;     
                }
                else output.delete(key);
            }
        }
        setChapterList(output);
    }, [mangaList]);

    return (
        <div ref={chapterContainerRef}>
            {   chapterList.size> 0 &&
                <UpdateChapterList iterator={chapterList}></UpdateChapterList>
            }
            {
                chapterListApi.loading &&
                <Loading></Loading>
            }
        </div>
    )
}
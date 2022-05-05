import useApiMangaList from "../hooks/useApiMangaList";
import useApiChapter from "../hooks/useApiChapter";
import useLazyFetching from "../hooks/useLazyFetching";
import Loading from "../../src/components/Loading";
import { useEffect, useState } from "react";
import { UpdateChapterList } from "../components/cards";

export default function HomeChapterView() {
    const [chapterApi, setApiChapterParams] = useApiChapter();
    const [mangaApi, setApiMangaParams] = useApiMangaList();

    const [mangaList, setMangaList] = useState(new Map());
    const [chapterList, setChapterList] = useState(new Map());

    const [chapterContainerRef, setRefreshFeedApi] = useLazyFetching(chapterApi, (fetchData) => {
        setApiChapterParams({
            offset: fetchData.offset,
            limit: fetchData.limit,
        });
    });


    useEffect(() => {
        setApiChapterParams({ limit: 40});
    }, []);

    useEffect(() => {
        if (chapterApi.result && !chapterApi.loading) {
            const ChapterMap = new Map(chapterList);
            chapterApi.result.data.forEach(item=>{
                ChapterMap.set(item.id, item);
            });

            setChapterList(ChapterMap);
            setApiMangaParams({
                ids: chapterApi.result.data.map((item) => item.manga.id),
                limit: chapterApi.result.data.length,
                availableTranslatedLanguage:[]
            });
        }
    }, [chapterApi]);

    
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
                chapterApi.loading &&
                <Loading></Loading>
            }
        </div>
    )
}
import useApiMangaList from "../hooks/useApiMangaList";
import useApiChapter from "../hooks/useApiChapter";
import useLazyFetching from "../hooks/useLazyFetching";
import Loading from "../../src/components/Loading";
import { useEffect, useState } from "react";
import { UpdateChapterList } from "../components/cards";

export default function HomeChapterView() {
    const [chapterApi, setApiChapterParams] = useApiChapter();
    const [mangaApi, setApiMangaParams] = useApiMangaList();

    const [mangaList, setMangaList] = useState([]);
    const [chapterList, setChapterList] = useState([]);

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
            setChapterList(chapterList.concat(chapterApi.result.data.filter(item =>
                !chapterList.some(a => a.id == item.id)
            )))
            setApiMangaParams({
                ids: chapterApi.result.data.map((item) => item.manga.id),
                limit: chapterApi.result.data.length,
                
            });
        }
    }, [chapterApi]);

    useEffect(() => {
        if (mangaApi.result && !mangaApi.loading) {
            setMangaList(mangaList.concat(mangaApi.result.data.filter(item =>
                !mangaList.some(a => a.id == item.id)
            )));
        }
    }, [mangaApi]);

    useEffect(() => {
        let output = [];
        chapterList.forEach(item => {
            if (!item.manga.cover) {
                let manga = mangaList.find(a => a.id == item.manga.id)
                if (manga) {
                    item.manga = manga;
                    output.push(item);
                }
            }else output.push(item);
        });
        setChapterList(output);
    }, [mangaList]);

    return (
        <div ref={chapterContainerRef}>
            {   chapterList.length>0 &&
                <UpdateChapterList list={chapterList}></UpdateChapterList>
            }
            {
                chapterApi.loading &&
                <Loading></Loading>
            }
        </div>
    )
}
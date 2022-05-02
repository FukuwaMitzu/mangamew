import { Fragment, useEffect, useState } from "react";
import NavigationSection from "../src/components/NavigationSection";
import { SeasonalSwiperList, UpdateSwiperList, TagSwiperList } from "../src/components/cards";
import axios from "axios";
import { MangaMewAPIURL } from "../src/config";
import useApiMangaList from "../src/hooks/useApiMangaList";

import Loading from "../src/components/Loading";



const tagList = [
  {
    id: 1,
    name: "Shool Life",
    cover: "https://uploads.mangadex.org/covers/37f5cce0-8070-4ada-96e5-fa24b1bd4ff9/e7662c97-8a30-4a35-93d8-0c8866f5a621.png.512.jpg"
  },
  {
    id: 2,
    name: "Sci-Fi",
    cover: "https://uploads.mangadex.org/covers/0aea9f43-d4a9-4bf7-bebc-550a512f9b95/ddb13225-fbf7-47a4-a241-12bca5971745.jpg.512.jpg",
  },
  {
    id: 3,
    name: "Shounen",
    cover: "https://uploads.mangadex.org/covers/0f237a5f-07ad-4e43-bbd9-2a320694434d/db984f48-cf2a-4359-85ca-cc256c66d659.jpg.512.jpg",
  },
  {
    id: 4,
    name: "Shoujo",
    cover: "https://uploads.mangadex.org/covers/a96676e5-8ae2-425e-b549-7f15dd34a6d8/bbca03f8-7635-4c35-a802-eb880bed53b3.jpg.512.jpg",
  },
  {
    id: 5,
    name: "Romcom",
    cover: "https://uploads.mangadex.org/covers/6b958848-c885-4735-9201-12ee77abcb3c/253cf5e5-41b7-4585-90cf-161fe329c6cb.jpg.512.jpg",
  },
]

export default function Home({query, seasonal}) {
  const [mangaApi, setMangaApiParams] = useApiMangaList();
  const [mangaList, setMangaList] = useState([]);


  useEffect(()=>{
      setMangaApiParams({
        ids: seasonal.mangaIds, 
        limit:25, 
        offset:0,
        order: {followedCount:"desc"}
      });
  }, []);

  useEffect(()=>{
    if(mangaApi.result && !mangaApi.loading){
        setMangaList(mangaApi.result.data);
    }
  },[mangaApi]);


  return (
    <Fragment>
      <div className="flex flex-col gap-20 mt-5">
        <NavigationSection title={seasonal.name} href="/manga/seasonal">
          {
            mangaApi.loading &&
            <Loading></Loading>
          }
          {
            mangaApi.result && !mangaApi.loading &&
            <SeasonalSwiperList list={mangaApi.result.data} />
          }
        </NavigationSection>
        <NavigationSection title="TAGS YOU MAY LIKE" href="/tag/recommended">
          <TagSwiperList list={tagList} />
        </NavigationSection>
        <NavigationSection title="LATEST UPDATE" href="/manga/latest">
          
        </NavigationSection>
      </div>
    </Fragment>
  )
}


export async function getServerSideProps({ query }) {
  try {
      const result = await axios.get(MangaMewAPIURL("/user/d2ae45e0-b5e2-4e7f-a688-17925c2d7d6b/list"),
      {
        params: {
          limit: 1
        },
      });

      let seasonal = {};
      seasonal.id = result.data.data[0].id;
      seasonal.name = result.data.data[0].attributes.name;
      seasonal.mangaIds = result.data.data[0].relationships.filter(item=>item.type=="manga").map(item=>item.id);
    
    return {
      props: {query:query, seasonal:seasonal}
    }
  }
  catch (e){
    return {
      notFound: true
    }
  }
}
import { Fragment } from "react";
import NavigationSection from "../src/components/NavigationSection";
import SeasonalSwiperList from "../src/components/Cards/SeasonalSwiperList";
import UpdateSwiperList from "../src/components/Cards/UpdateSwiperList";
import TagSwiperList from "../src/components/Cards/TagSwiperList";

const tagList = [
  {
    id: 1,
    name: "Shool Life",
    cover: "https://uploads.mangadex.org/covers/37f5cce0-8070-4ada-96e5-fa24b1bd4ff9/e7662c97-8a30-4a35-93d8-0c8866f5a621.png.512.jpg"
  },
  {
    id: 2,
    name: "Sci-Fi",
    cover:"https://uploads.mangadex.org/covers/0aea9f43-d4a9-4bf7-bebc-550a512f9b95/ddb13225-fbf7-47a4-a241-12bca5971745.jpg.512.jpg",
  },
  {
    id: 3,
    name: "Shounen",
    cover: "https://uploads.mangadex.org/covers/0f237a5f-07ad-4e43-bbd9-2a320694434d/db984f48-cf2a-4359-85ca-cc256c66d659.jpg.512.jpg",
  },
  {
    id: 4,
    name: "Shoujo",
    cover:"https://uploads.mangadex.org/covers/a96676e5-8ae2-425e-b549-7f15dd34a6d8/bbca03f8-7635-4c35-a802-eb880bed53b3.jpg.512.jpg",
  },
  {
    id: 5,
    name: "Romcom",
    cover: "https://uploads.mangadex.org/covers/6b958848-c885-4735-9201-12ee77abcb3c/253cf5e5-41b7-4585-90cf-161fe329c6cb.jpg.512.jpg",
  },
]

const mangaList = [
  {
    id: 1,
    title: "Kaguya-sama wa Kokurasetai: Tensai-tachi no Renai Zunousen",
    cover: "https://uploads.mangadex.org/covers/37f5cce0-8070-4ada-96e5-fa24b1bd4ff9/e7662c97-8a30-4a35-93d8-0c8866f5a621.png.512.jpg",
    authors: ["Akasaka Aka"],
    views: 100,
    bookmarks: 200,
    date: "5 hours ago",
    chapter: 100,
  },
  {
    id: 2,
    title: "Komi-san wa Komyushou Desu",
    cover: "https://uploads.mangadex.org/covers/a96676e5-8ae2-425e-b549-7f15dd34a6d8/bbca03f8-7635-4c35-a802-eb880bed53b3.jpg.512.jpg",
    authors: ["Oda Tomohito"],
    views: 2000,
    bookmarks: 125,
    date: "5 hours ago",
    chapter: 20,
  },
  {
    id: 3,
    title: "Shikimori's Not Just a Cutie",
    cover: "https://uploads.mangadex.org/covers/0aea9f43-d4a9-4bf7-bebc-550a512f9b95/ddb13225-fbf7-47a4-a241-12bca5971745.jpg.512.jpg",
    authors: ["Maki Keigo"],
    views: 2200,
    bookmarks: 150,
    date: "5 hours ago",
    chapter: 90,
  },
  {
    id: 4,
    title: "SPY×FAMILY",
    cover: "https://uploads.mangadex.org/covers/6b958848-c885-4735-9201-12ee77abcb3c/253cf5e5-41b7-4585-90cf-161fe329c6cb.jpg.512.jpg",
    authors: ["Endou Tatsuya"],
    views: 2200,
    bookmarks: 150,
    date: "5 hours ago",
    chapter: 50,
  },
  {
    id: 5,
    title: "Tate no Yuusha no Nariagari",
    cover: "https://uploads.mangadex.org/covers/0f237a5f-07ad-4e43-bbd9-2a320694434d/db984f48-cf2a-4359-85ca-cc256c66d659.jpg.512.jpg",
    authors: ["Aneko Yusagi", "Aiya Kyu"],
    views: 2500,
    bookmarks: 120,
    date: "10 years ago",
    chapter: 150
  }
]



export default function Home() {
  return (
    <Fragment>
      <div className="flex flex-col gap-20">
        <NavigationSection title="SEASONAL" href="/manga/seasonal">
          <SeasonalSwiperList list={mangaList} />
        </NavigationSection>
        <NavigationSection title="LATEST UPDATE" href="/manga/latest">
          <UpdateSwiperList list={mangaList} />
        </NavigationSection>
        <NavigationSection title="TAGS YOU MAY LIKE" href="/tag/recommended">
          <TagSwiperList list={tagList} />
        </NavigationSection>
      </div>
    </Fragment>
  )
}

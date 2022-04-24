import MangaCard from "./MangaCard";
export default function MangaList({ list }) {
    return (
        <div className="grid gap-5 lg:grid-cols-2">
            {
                list.map((item) => {
                    return <MangaCard key={item.id} {...item}></MangaCard>
                })
            }
        </div>
    );
}
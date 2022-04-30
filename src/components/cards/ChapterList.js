import ChapterCard from "./ChapterCard";

export default function ChapterList({ list }) {
    return (
        <div className={`flex flex-col gap-2`}>
            {
                list.map((item) => {
                    return <div key={item.id}><ChapterCard {...item}/></div>
                })
            }
        </div>
    );
}
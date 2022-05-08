import UpdateMangaCard from "./UpdateChapterCard"



export default function UpdateChapterList({iterator}){
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {
                Array.from(iterator, ([key, item])=> {
                        return <UpdateMangaCard key={item.id} {...item}/>
                    }
                )
            }
        </div>
    );
}
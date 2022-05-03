import UpdateMangaCard from "./UpdateChapterCard"



export default function UpdateChapterList({list}){
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ">
            {
                list.map((item)=>{
                    return (
                        <UpdateMangaCard key={item.id} {...item}/>
                    )
                })
            }
        </div>
    );
}
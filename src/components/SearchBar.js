export default function SearchBar({size}){
    return (
        <div className="bg-grey flex rounded-xl px-2 py-1 items-center">
            <span className="material-icons-outlined mr-3">search</span>
            <form className="flex-1">
                <input className="bg-transparent outline-none w-full" type="text" placeholder="What's on your mind?"></input>
            </form>
        </div>
    )
}
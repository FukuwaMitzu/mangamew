import { useState } from "react";

export default function SearchBar(){
    const [searchTitle, setSearchTitle] = useState("");

    return (
        <div className="bg-grey flex rounded-xl px-2 py-1 items-center">
            <span className="material-icons-outlined mr-3">search</span>
            <form className="flex-1" onSubmit={(e)=>{
                e.preventDefault();
                console.log(searchTitle);
            }}>
                <input className="bg-transparent outline-none w-full" type="text" placeholder="What's on your mind?" onChange={(e)=>{setSearchTitle(e.target.value)}}></input>
            </form>
        </div>
    )
}
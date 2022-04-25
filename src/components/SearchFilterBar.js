import { Fragment, useCallback, useEffect } from "react";
import { useState } from "react";
import FilterItem from "./FilterItem";

export default function SearchFilterBar({ title, list, onUpdateFilter, onSearch }) {
    const [searchTitle, setSearchTitle] = useState("");
    const [tagList, setTagList] = useState([]);
    const [groupList, setGroupList] = useState({});
    const [filterWindowMode, setfilterWindowMode] = useState(false);

    //Update title realtime
    useEffect(() => {
        setSearchTitle(title);
    }, [title]);

    //Update list realtime
    useEffect(() => {
        let newList = list.map((item) => {
            return { ...item };
        })
        setTagList(newList);
    }, [list]);

    //Update group list 
    useEffect(() => {
        let newList = {};
        tagList.forEach((item) => {
            try {
                newList[item.group].push(item);
            }
            catch {
                newList[item.group] = [item];
            }
        });
        for (var key in newList) {
            newList[key] = newList[key].sort((a, b) => a.name.localeCompare(b.name));
        }
        setGroupList(newList);
    }, [tagList]);

    const triggerFilterWindow = () => {
        setfilterWindowMode(!filterWindowMode);
        if (filterWindowMode) updateFilterList();
    };
    const updateFilterList = () => {
        if (onUpdateFilter) onUpdateFilter(tagList);
    }
    const onFilter = useCallback((e) => {
        let newList = tagList.map((item) => {
            if (item.id == e.id) item.mode = e.mode;
            return item;
        });
        setTagList(newList);
    }, [tagList]);

    const resetFilter = () => {
        setTagList(tagList.map((item) => {
            item.mode = 0;
            return item;
        }));
    };

    const resetSearch = () => {
        setSearchTitle("");
    }

    //Call search action
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (onSearch) onSearch(searchTitle);
        }, 500);
        return () => {
            clearTimeout(delayDebounceFn);
        }
    }, [searchTitle]);

    return (
        <Fragment>
            <div className={`fixed w-full h-full inset-0 z-50 ${filterWindowMode ? "" : "hidden"} flex justify-center items-center`}>
                <div className={`shade absolute inset-0 w-full h-full ${filterWindowMode ? "animate-fade-in" : ""}`} onClick={triggerFilterWindow}></div>
                <div className={`${filterWindowMode ? "animate-jump-in" : ""} bg-dominant w-full max-w-[1280px] max-h-[calc(100%_-_2rem)] p-5 m-5 overflow-auto overscroll-contain flex flex-col`}>
                    <div className="flex justify-between">
                        <h1 className="font-bold text-3xl">Filters</h1>
                        <button onClick={triggerFilterWindow}><span className="material-icons-outlined">close</span></button>
                    </div>
                    <div className="flex mt-3">
                        <button onClick={triggerFilterWindow} className="flex-1 bg-primary rounded-xl text-dominant font-bold p-3 active:bg-primary-dark transition-colors">Search</button>
                        <button onClick={resetFilter} className="font-bold p-3 w-2/5 active:bg-grey rounded-xl transition-colors">Reset filters</button>
                    </div>
                    {
                        Object.keys(groupList).map((key) => {
                            return (
                                <div key={key} className="my-3">
                                    <h3 className="font-bold text-xl capitalize mb-2">{key}</h3>
                                    <div className="flex gap-2 flex-wrap">
                                        {
                                            groupList[key].map((filterItem) => {
                                                return <FilterItem key={filterItem.id} {...filterItem} onFilterChange={onFilter}></FilterItem>
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="bg-grey flex rounded-xl pl-2 items-center">
                <span className="material-icons-outlined mr-3">search</span>
                <form className="flex-1" onSubmit={(e) => { e.preventDefault(); }}>
                    <input className="bg-transparent outline-none w-full" type="text" placeholder="Search" onChange={(e) => { setSearchTitle(e.target.value) }} value={searchTitle}></input>
                </form>
                {
                    searchTitle != "" &&
                    <button onClick={resetSearch} className="leading-[0] px-2"><span className="material-icons-outlined">close</span></button>
                }
                <button onClick={triggerFilterWindow} className="bg-primary text-dominant rounded-xl flex items-center py-2 px-3 active:bg-primary-dark transition-all">
                    <span className="material-icons-outlined">filter_alt</span>
                    <span className="ml-1 hidden sm:block">Add filter</span>
                </button>
            </div>
            <div className="flex gap-2 mt-2 flex-wrap text-sm">
                {
                    tagList.filter((item) => item.mode > 0).sort((a, b) => a.name.localeCompare(b.name)).map((item) => {
                        return <FilterItem key={item.id} {...item} onFilterChange={(e) => { onFilter(e); updateFilterList() }}></FilterItem>
                    })
                }
            </div>
        </Fragment>
    )
}
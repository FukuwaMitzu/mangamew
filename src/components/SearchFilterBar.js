import { Fragment, useCallback, useEffect } from "react";
import Button from "./Button"
import { useState } from "react";
import FilterItem from "./FilterItem";

export default function SearchFilterBar({ list, onUpdateFilter }) {
    const [tagList, setTagList] = useState(list);
    const [groupList, setGroupList] = useState({});
    const [filterWindowMode, setfilterWindowMode] = useState(false);
    
    //Update list realtime
    useEffect(() => {
        setTagList(list);
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
        setTagList(list.map((item) => {
            item.mode = 0;
            return item;
        }));
    };

    return (
        <Fragment>
            <div className={`fixed w-screen h-screen inset-0 z-50 ${filterWindowMode ? "" : "hidden"}`}>
                <div className="shade w-full h-full" onClick={triggerFilterWindow}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dominant w-full max-w-[1280px] max-h-full min-w-0 min-h-0 p-5 overflow-y-scroll flex flex-col">
                    <div className="flex justify-between">
                        <h1 className="font-bold text-3xl">Filters</h1>
                        <button onClick={triggerFilterWindow}><span className="material-icons-outlined">close</span></button>
                    </div>
                    <div className="flex mt-3">
                        <button onClick={triggerFilterWindow} className="flex-1 bg-primary rounded-xl text-dominant font-bold p-3 active:bg-primary-dark">Search</button>
                        <button onClick={resetFilter} className="font-bold p-3 w-2/5 active:bg-grey rounded-xl">Reset filters</button>
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
                <span className="material-icons mr-3">search</span>
                <form className="flex-1 pr-2">
                    <input className="bg-transparent outline-none w-full" type="text" placeholder="Search"></input>
                </form>
                <Button onClick={triggerFilterWindow} startIcon={<span className="material-icons-outlined text-sm">add</span>}>Add filter</Button>
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
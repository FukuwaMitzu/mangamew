import { Fragment, useCallback, useEffect } from "react";
import { useState } from "react";
import FilterItem from "./FilterItem";

export default function SearchFilterBar({ title, filterList, demographicList, contentRatingList, publicStatusList, onUpdateFilter, onSearch }) {
    const [searchTitle, setSearchTitle] = useState("");

    const [demographic, setDemoGraphic] = useState([]);
    const [contentRating, setContentRating] = useState([]);
    const [publicStatus, setPublicStatus] = useState([]);

    const [groupList, setGroupList] = useState([]);
    const [filterWindowMode, setfilterWindowMode] = useState(false);



    useEffect(() => {
        let newList = demographicList.map((item) => {
            return { ...item };
        })
        setDemoGraphic(newList);
    }, [demographicList]);

    useEffect(() => {
        let newList = contentRatingList.map((item) => {
            return { ...item };
        })
        setContentRating(newList);
    }, [contentRatingList]);

    useEffect(() => {
        let newList = publicStatusList.map((item) => {
            return { ...item };
        })
        setPublicStatus(newList);
    }, [publicStatusList]);


    //Update title realtime
    useEffect(() => {
        setSearchTitle(title);
    }, [title]);

    //Update filterList realtime
    useEffect(() => {
        let newList = {};
        filterList.forEach((item) => {
            try {
                newList[item.group].push({ ...item });
            }
            catch {
                newList[item.group] = [{ ...item }];
            }
        });
        for (var key in newList) {
            newList[key] = newList[key].sort((a, b) => a.name.localeCompare(b.name));
        }

        newList = Object.keys(newList).map((key) => {
            return [key, newList[key]];
        });
        newList.sort((a, b) => a[1].length - b[1].length);
        setGroupList(newList);
    }, [filterList]);

    const triggerFilterWindow = () => {
        setfilterWindowMode(!filterWindowMode);
        if (filterWindowMode) updateFilterList();
    };
    const updateFilterList = () => {

        if (onUpdateFilter) onUpdateFilter([].concat(...groupList.map((item) => item[1])), demographic, publicStatus, contentRating);
    }

    const onFilter = useCallback((e) => {
        let newList = groupList.map((item) => {
            for (var a in item[1]) if (item[1][a].id == e.id) item[1][a].mode = e.mode;
            return item;
        });
        setGroupList(newList);
    }, [groupList]);

    const onDemo = useCallback((e) => {
        let newList = demographic.map((item) => {
            if (item.id == e.id) item.mode = e.mode;
            return item;
        });
        setDemoGraphic(newList);
    }, [demographic]);
    const onContent = useCallback((e) => {
        let newList = contentRating.map((item) => {
            if (item.id == e.id) item.mode = e.mode;
            return item;
        });
        setContentRating(newList);
    }, [contentRating]);
    const onPublic = useCallback((e) => {
        let newList = publicStatus.map((item) => {
            if (item.id == e.id) item.mode = e.mode;
            return item;
        });
        setPublicStatus(newList);
    }, [contentRating]);

    const resetFilter = () => {
        setGroupList(groupList.map((item) => {
            for (let a in item[1]) { item[1][a].mode = 0; }
            return item;
        }));
        setContentRating(contentRating.map(item => {
            item.mode = 0;
            return item;
        }));
        setDemoGraphic(demographic.map(item => {
            item.mode = 0;
            return item;
        }));
        setPublicStatus(publicStatus.map(item => {
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
                <div className={`${filterWindowMode ? "animate-jump-in" : ""} bg-dominant w-full max-w-[1280px] max-h-full sm:max-h-[calc(100%_-_2rem)] p-10 sm:m-5 overflow-auto overscroll-contain flex flex-col rounded-xl`}>
                    <div className="flex justify-between">
                        <h1 className="font-bold text-3xl">Filters</h1>
                        <button onClick={triggerFilterWindow}><span className="material-icons-outlined">close</span></button>
                    </div>
                    <div className="flex mt-3">
                        <button onClick={triggerFilterWindow} className="flex-1 bg-primary rounded-xl text-dominant font-bold p-3 active:bg-primary-dark transition-colors">Search</button>
                        <button onClick={resetFilter} className="font-bold p-3 w-2/5 active:bg-grey rounded-xl transition-colors">Reset filters</button>
                    </div>
                    <div className="flex flex-wrap gap-5 mt-10 mb-5">
                        <div>
                            <h3 className="font-bold text-xl capitalize mb-2">Demographic</h3>
                            <div className="flex flex-wrap gap-2">
                                {
                                    demographic.map((item) => {
                                        return <FilterItem key={item.id} {...item} min={0} max={1} onFilterChange={onDemo}></FilterItem>
                                    })
                                }
                                <FilterItem mode={demographic.every(item => item.mode == 0)} max={1} name={"Any"} disable></FilterItem>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-xl capitalize mb-2">Content Rating</h3>
                            <div className="flex flex-wrap gap-2">
                                {
                                    contentRating.map((item) => {
                                        return <FilterItem key={item.id} {...item} min={0} max={1} onFilterChange={onContent}></FilterItem>
                                    })
                                }
                                <FilterItem mode={contentRating.every(item => item.mode == 0)} max={1} name={"Any"} disable></FilterItem>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-xl capitalize mb-2">Publication Status</h3>
                            <div className="flex flex-wrap gap-2">
                                {
                                    publicStatus.map((item) => {
                                        return <FilterItem key={item.id} {...item} min={0} max={1} onFilterChange={onPublic}></FilterItem>
                                    })
                                }
                                <FilterItem mode={publicStatus.every(item => item.mode == 0)} max={1} name={"Any"} disable></FilterItem>
                            </div>
                        </div>

                    </div>
                    <hr></hr>
                    {
                        groupList.map((group) => {
                            return (
                                <div key={group[0]} className="my-3">
                                    <h3 className="font-bold text-xl capitalize mb-2">{group[0]}</h3>
                                    <div className="flex gap-2 flex-wrap">
                                        {
                                            group[1].map((filterItem) => {
                                                return <FilterItem key={filterItem.id} {...filterItem} onFilterChange={onFilter} max={2}></FilterItem>
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
                <div className="border-r-2 border-r-grey pr-2 flex flex-wrap gap-2">
                    {
                        demographic.filter(item => item.mode > 0).map(item => {
                            return <FilterItem key={item.id} {...item} onFilterChange={(e) => { onDemo(e); updateFilterList() }} max={1}></FilterItem>
                        })
                    }
                    {
                        demographic.every(item => item.mode == 0) &&
                        <FilterItem mode={1} disable name={"Any Demographic"}></FilterItem>
                    }
                    {
                        contentRating.filter(item => item.mode > 0).map(item => {
                            return <FilterItem key={item.id} {...item} onFilterChange={(e) => { onContent(e); updateFilterList() }} max={1}></FilterItem>
                        })
                    }
                    {
                        contentRating.every(item => item.mode == 0) &&
                        <FilterItem mode={1} disable name={"Any Content Rating"}></FilterItem>
                    }
                    {
                        publicStatus.filter(item => item.mode > 0).map(item => {
                            return <FilterItem key={item.id} {...item} onFilterChange={(e) => { onPublic(e); updateFilterList() }} max={1}></FilterItem>
                        })
                    }
                    {
                        publicStatus.every(item => item.mode == 0) &&
                        <FilterItem mode={1} disable name={"Any Publication Status"}></FilterItem>
                    }
                </div>
                {
                    [].concat(...groupList.map(item => item[1])).filter((item) => item.mode > 0).sort((a, b) => a.name.localeCompare(b.name)).map((item) => {
                        return <FilterItem key={item.id} {...item} onFilterChange={(e) => { onFilter(e); updateFilterList() }} max={2}></FilterItem>
                    })
                }
            </div>
        </Fragment>
    )
}
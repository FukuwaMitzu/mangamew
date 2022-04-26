import { useEffect, useState } from "react";
import PaginationItem from "./PaginationItem";
export default function Pagination({offset, limit, total, onPageChange }) {
    const [list, setList] = useState([]);

    useEffect(() => {
        let newList = [];

        if(offset>=total)return;
        else if(limit==0)return;

        let pages = Math.ceil(total / limit);
        let pageOffset = offset/limit;

        for (let i = pageOffset - 2; i <= pageOffset + 2; i++) {
            if (i < 0)continue;
            if (i == pages) break;
            newList.push({ id: i, value: i + 1, active: pageOffset == i });
        }

        
        if (newList.length > 0) {
            let mid = Math.round(newList.length / 2);

            if (newList[0].value > 1) {
                if (newList[mid-1].value - 1 > mid) newList.unshift({ id: -1});
                newList.unshift({id: 0, value: 1, active:false});
            }
            if(newList[newList.length-1].value < pages){
                if (pages - newList[mid-1].value > mid) newList.push({ id: -2});
                newList.push({id: pages-1, value: pages, active:false});
            }
        }

        setList(newList);

    }, [offset, limit, total])

    const updatePageIndex = (e)=>{
        if(onPageChange)onPageChange(e);
    }
    return (
        <div className="flex gap-2 items-center">
            {
                list.map((item)=>{
                    if(item.id<0) return <span className="font-bold" key={item.id}>...</span>
                    else return (
                        <PaginationItem key={item.id} {...item} onTrigger={updatePageIndex}></PaginationItem>
                    )
                })
            }
        </div>
    );
};
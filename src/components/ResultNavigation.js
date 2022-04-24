import { useEffect, useState } from "react";
import ResultNavigationItem from "./ResultNavigationItem";
export default function ResultNavigation({ offset, limit, total, onPageChange }) {
    const [list, setList] = useState([]);

    useEffect(() => {
        let newList = [];

        let pages = Math.ceil(total / limit);

        if (offset > pages) return;

        for (let i = offset - 2; i <= offset + 2; i++) {
            if (i < 0) continue;
            if (i == pages) break;
            newList.push({ id: i, value: i + 1, active: offset == i });
        }

        
        if (newList.length > 0) {
            
            let mid = newList[Math.round(newList.length / 2)];
            let n = newList.length;
            if (newList[0].value > 1) {
                if (mid.value - 1 > n) newList.unshift({ id: -1});
                newList.unshift({id: 0, value: 1, active:false});
            }
            if(newList[newList.length-1].value < pages){
                if (pages - mid.value > n) newList.push({ id: -1});
                newList.push({id: pages-1, value: pages, active:false});
            }
        }

        setList(newList);

    }, [offset, limit, total])

    return (
        <div className="flex gap-2">
            {
                list.map((item)=>{
                    if(item.id<0)return <span>...</span>
                    else return (
                        <ResultNavigationItem key={item.id} {...item}></ResultNavigationItem>
                    )
                })
            }
        </div>
    );
};
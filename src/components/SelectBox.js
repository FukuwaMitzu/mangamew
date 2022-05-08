import uniqid from "uniqid";
import { useEffect, useState, useRef} from "react";
export default function SelectBox({ list, select, label, onSelectedChange, maxDisplayItem}) {
    const [selectedItem, setSelectedItem] = useState(select);
    const [openBox, setOpenBox] = useState(false);
    const boxRef = useRef({});
    const listRef = useRef({});
    const selectedRef = useRef({});
    
    useEffect(() => {
        
        if(listRef.current && selectedRef.current){
            let tempMaxDisplayItems = maxDisplayItem||10;
            //Change the display, max is 10 items by default
            if(openBox){
                listRef.current.style.maxHeight = selectedRef.current.offsetHeight * tempMaxDisplayItems + "px";
            }
            //Scroll to the selected item
            let selectedIndex = list.indexOf(selectedItem);
            let scrollToIndex = Math.max(selectedIndex - Math.floor(tempMaxDisplayItems / 2) + 1, 0);
            listRef.current.scrollTo(0, scrollToIndex * selectedRef.current.offsetHeight);
        }

        const onMouseClick = (e) => {
            if (!boxRef.current.contains(e.target) && openBox) {
                setOpenBox(false);
            }
        }
        window.addEventListener('click', onMouseClick);
        return () => {
            window.removeEventListener('click', onMouseClick);
        }
    }, [openBox]);


    useEffect(() => {
        setSelectedItem(select);
    }, [select]);
    const triggerBox = () => {
        setOpenBox(!openBox);
    }
    const updateSelect = (e) => {
        triggerBox();
        if (e !== selectedItem) {
            setSelectedItem(e);
            if (onSelectedChange) onSelectedChange(e);
        }
    }
    return (
        <div className="relative capitalize w-full flex flex-col z-30 border-y">
            <div className={`bg-grey px-3 pb-2 relative transition-all cursor-pointer w-full flex justify-between z-30 ${label ? "pt-6" : "pt-2"} ${openBox ? "shadow-outline shadow-primary" : ""}`} onClick={triggerBox} ref={boxRef}>
                <span className={`absolute capitalize text-xs top-1 transition-colors ${openBox ? "text-primary" : "text-secondary"}`}>{label}</span>
                {selectedItem.toString()}
                <span className={`material-icons-outlined transition-transform ml-5 ${openBox ? "rotate-180" : ""}`}>expand_more</span>
            </div>
            <ul className={`absolute top-full overflow-auto bg-grey shadowbox w-full ${openBox ? "" : "hidden"}`} ref={listRef}>
                {
                    list.map(item => {
                        return (
                            selectedItem === item ? 
                            <li className={`px-3 py-2 transition-colors cursor-pointer bg-primary text-dominant`} key={uniqid()} onClick={() => { updateSelect(item) }} ref={selectedRef}>{item.toString()}</li>
                            :
                            <li className={`px-3 py-2 transition-colors cursor-pointer bg-grey hover:bg-grey-dark text-secondary`} key={uniqid()} onClick={() => { updateSelect(item) }}>{item.toString()}</li>
                        )
                    })
                }
            </ul>
        </div>
    );
}
import uniqid from "uniqid";
import { useEffect, useState, useRef } from "react";

export default function SelectBox({ list, select, label, onSelectedChange }) {
    const [selectedItem, setSelectedItem] = useState(select);
    const [openBox, setOpenBox] = useState(false);
    const boxRef = useRef({});


    useEffect(() => {
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
        <div className="relative capitalize w-full flex flex-col z-30">
            <div className={`bg-grey px-3 pb-2 relative transition-all cursor-pointer w-full flex justify-between z-30 ${label ? "pt-6" : "pt-2"} ${openBox ? "shadow-outline shadow-primary" : ""}`} onClick={triggerBox} ref={boxRef}>
                <span className={`absolute capitalize text-xs top-1 transition-colors ${openBox ? "text-primary" : "text-secondary"}`}>{label}</span>
                {selectedItem.toString()}
                <span className={`material-icons-outlined transition-transform ml-5 ${openBox ? "rotate-180" : ""}`}>expand_more</span>
            </div>
            <ul className={`absolute top-full bg-grey shadowbox w-full ${openBox ? "" : "hidden"}`}>
                {
                    list.map(item => {
                        return <li className={`px-3 py-2 transition-colors cursor-pointer ${selectedItem === item ? "bg-primary text-dominant active:bg-primary-dark" : "text-secondary bg-grey hover:bg-grey-dark"}`} key={uniqid()} onClick={() => { updateSelect(item) }}>{item.toString()}</li>
                    })
                }
            </ul>
        </div>
    );
}
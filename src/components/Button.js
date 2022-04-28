
const classCustom = (type) => {
    switch (type) {
        case "outlined":
            return "text-secondary border-2 border-primary active:bg-grey";
        default:
            return "bg-primary text-dominant rounded-xl active:bg-primary-dark";
    }
}

export default function Button({ startIcon, endIcon, type, children, onClick }) {
    return (
        <button className={`rounded-xl px-3 py-2 ${classCustom(type)} flex gap-2 items-center transition-all`} onClick={onClick}>
            {startIcon}
            {
                children &&
                <div>
                    {children}
                </div>
            }
            {endIcon}
        </button>
    );
}
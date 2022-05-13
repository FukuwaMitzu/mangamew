import { useContext, useState } from "react"
import Loading from "../Loading";
import { FormContext } from "./Form";

export default function Submit({ name }) {
    const context = useContext(FormContext);
    const [loading, setLoading] = useState(false);

    return <button className="bg-primary text-dominant rounded-md w-full active:bg-primary-dark transition-colors p-5" onClick={()=>{setLoading(true)}}>
        <span className="relative">
            <span>
                {name}
            </span>
            {
                loading &&
                <span className="absolute ml-3">
                    <Loading width={25} height={25} color={"#FFF"}></Loading>
                </span>
            }
        </span>
    </button>
}
import { useSelector } from "react-redux";

export default function useAuth(){
    const selector = useSelector((state)=>state.User);
    return selector;
}
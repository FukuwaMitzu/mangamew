import { useCallback, useEffect, useRef, useState } from "react";


/**
 * 
 * 
 * Hook này lấy 2 tham số, là kết quả trả về từ một apiHook và hàm thực thi khi bắt đầu fetch( bất cứ hook nào bắt đầu bằng từ useApi đều được coi là apiHook)
 * 
 *
 * @param {*} state trạng thái của apiHook
 * @param {*} setApiParam hàm để gọi đến api
 * 
 * Lưu ý, trạng thái của apiHook buộc phải có các trường dữ liệu sau:
 * result:{
 *      ....
 *      total,  |
 *      limit,  |   *bắt buộc phải có
 *      offset, |
 * }
 * loading,
 * err,
 * 
 * @returns containerRef - một ref của phần tử DOM chứa toàn bộ danh sách mà sử dụng apiHook 
 * @returns setRefresh - nạp lại dữ liệu từ đầu, hàm này có thể nhận tham số là một callback sẽ thực thi khi được làm mới
 */
export default function useLazyFetching(state, onFetching){
    const [feedIndex, setFeedIndex] = useState({ offset: 0, limit: 0, total: 0 });
    const fetchLockRef = useRef(true);
    const containerRef = useRef({});

    const setRefresh = useCallback((callback)=>{
        setFeedIndex({offset: 0, limit: 0, total: 0});
        if(callback) callback();
    }, [feedIndex]);

    useEffect(()=>{
        if(state.result && !state.loading){
            let nextLimit = Math.min(state.result.limit, Math.abs(state.result.total - state.result.offset - state.result.limit));
            let nextOffset = feedIndex.offset + state.result.limit;
            setFeedIndex({offset: nextOffset, limit: nextLimit, total: state.result.total });
            fetchLockRef.current = false;
        }
    }, [state]);

    useEffect(()=>{
        let checkLimit = ()=>feedIndex.limit > 0;
        let checkLock = ()=>fetchLockRef.current;
        let checkOffset = ()=>feedIndex.offset + feedIndex.limit <= feedIndex.total;

        const fetchOnScroll = () => {
            if (containerRef.current && state.result && !state.loading) {
                if (containerRef.current.getBoundingClientRect().y + containerRef.current.scrollHeight < window.innerHeight) {
                    if(checkLock() || !checkLimit() || !checkOffset() ) return;
                    fetchLockRef.current = true;
                    if(onFetching)onFetching({offset: feedIndex.offset, limit: feedIndex.limit});
                };     
            } 
        }
        if(checkOffset() && checkLimit()) 
        {
            window.addEventListener('scroll', fetchOnScroll);
            return () => {
                window.removeEventListener('scroll', fetchOnScroll);
            }
        }
    }, [feedIndex]);


    return [containerRef, setRefresh];
}
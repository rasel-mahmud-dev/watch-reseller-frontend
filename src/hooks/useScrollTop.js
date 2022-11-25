import {useEffect} from "react";

function useScrollTop(){

    useEffect(()=>{
        window.scrollTo({top: 0, behavior: "smooth"})
    }, [])
}

export default useScrollTop
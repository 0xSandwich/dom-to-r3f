import { useEffect } from "react"

const useResize = (callBack) => {
    useEffect(()=>{
        console.log("resize")
        window.addEventListener("resize", callBack);
        callBack();
        return () => window.removeEventListener("resize", callBack);
    },[callBack])
}

export default useResize
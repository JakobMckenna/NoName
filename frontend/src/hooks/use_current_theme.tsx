import { useEffect, useState } from "react";

const useCurrentTheme = () => {
    const [currentTheme, setCurrentTheme] = useState<string>()
    const [loadingTheme, setLoadingTheme] = useState(true)
    useEffect(
        ()=>{
            const theme = localStorage.getItem("theme")
            if(theme){
                setCurrentTheme(theme)
                setLoadingTheme(false)
            }else{
                setCurrentTheme("dark")
                setLoadingTheme(false)
            }
        }
        ,[]
    )
   
   return [currentTheme,loadingTheme]
}
 
export default useCurrentTheme;
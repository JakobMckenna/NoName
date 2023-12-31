/* eslint-disable */
import { useEffect, useState } from "react";

const useCurrentTheme = () => {
    const [currentTheme, setCurrentTheme] = useState<string>()
    const [loadingTheme, setLoadingTheme] = useState(true)

    const themeChange = (theme:string) => {
        const element = document.querySelector("html")
        element?.setAttribute("data-theme", theme)
    }
    const empty=()=>{
        return currentTheme!=null;
    }

    useEffect(
        ()=>{
            const theme = localStorage.getItem("theme")
            if(theme && theme=="retro"){
                setCurrentTheme(theme)
                themeChange(theme)
                setLoadingTheme(false)
            }else {
                setCurrentTheme("dark")
                themeChange("dark")
                setLoadingTheme(false)
            }
        }
        ,[empty]
    )
   
   return [currentTheme!=null,loadingTheme]
}
 
export default useCurrentTheme;
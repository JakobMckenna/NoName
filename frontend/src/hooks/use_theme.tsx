/* eslint-disable */
import { useEffect, useState } from "react";

const getItem = () => {
    let result = "dark"
    let localTheme: string | null = null;
    if (typeof window !== 'undefined' && window.localStorage) {
        localTheme = localStorage.getItem("theme");
    }

    if (localTheme != null) {
        result = localTheme;
    }
    return result;
}




const useTheme = () => {

    const [theme, setTheme] = useState<string|null>(null)

    const themeChange = (theme: string) => {
        const element = document.querySelector("html")
        if (element) {
            element.setAttribute("data-theme", theme)
        }
        localStorage.setItem("theme",theme);
    }
    useEffect(
        () => {
           
            const localTheme = getItem()

            if (localTheme != null && theme==null) {
              
                setTheme(localTheme);

            }else if(localTheme==null && theme==null){
                setTheme("dark")
            }else{
                setTheme(theme)
            }

            if (theme == "dark") {
                themeChange("dark")
            } else if (theme == "retro") {
                themeChange("retro")
            }
           // if(them)
            
        }
        , [theme]
    )

    return [theme, setTheme]
}

export default useTheme;
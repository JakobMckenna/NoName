/* eslint-disable */
import { useEffect, useState } from "react";

const getItem = () => {
    let result = "dark"
    let localTheme :string|null = null;
    if(typeof window !== 'undefined' && window.localStorage){
        localTheme = localStorage.getItem("theme");
    }
    
   

    if (localTheme!= null) {
        result = localTheme;
    }
    return result;
}


const useTheme = (defaultTheme:string) => {

    const [theme, setTheme] = useState<string>(defaultTheme)

    useEffect(
        () => {
            const localTheme = localStorage.getItem("theme");
            localStorage.setItem("theme", theme);

            // add custom data-theme attribute to html tag required to update theme using DaisyUI
            const element = document.querySelector("html")
            if (localTheme) {
                element?.setAttribute("data-theme", theme)
               // setTheme(localTheme)
            } else {
                element?.setAttribute("data-theme", "dark")
               // setTheme("dark")
            }
            


        }
        , [theme]
    )

    return [theme, setTheme]
}

export default useTheme;
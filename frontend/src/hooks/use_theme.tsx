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

    const [theme, setTheme] = useState<string>()

    const themeChange = (theme: string) => {
        const element = document.querySelector("html")
        if (element) {
            element.setAttribute("data-theme", theme)
        }
    }
    useEffect(
        () => {
            setTheme(getItem)
            //console.log(theme)
            //if(theme)

            if (theme != null && theme != undefined) {
                localStorage.setItem("theme", theme)

            }

            if (theme == "dark") {
                themeChange("dark")
            } else if (theme == "retro") {
                themeChange("retro")
            }

        }
        , [theme]
    )

    return [theme, setTheme]
}

export default useTheme;
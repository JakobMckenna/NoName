/* eslint-disable */
import { useEffect, useState } from "react";

const useTheme = () => {
    const [theme, setTheme] = useState("dark")

    useEffect(
        () => {
            localStorage.setItem("theme", theme);
            const localTheme = localStorage.getItem("theme");
            // add custom data-theme attribute to html tag required to update theme using DaisyUI
            const element = document.querySelector("html")
            if (localTheme) {
                element?.setAttribute("data-theme", localTheme)
            }


        }
        , [theme]
    )

    return [theme, setTheme]
}

export default useTheme;
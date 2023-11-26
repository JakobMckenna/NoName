/* eslint-disable */
import Link from "next/link";
import router from "next/router";

import { ReactNode, useEffect, useState } from "react";

import useTheme from "~/hooks/use_theme";

const Drawer = ({ children, userName }: { children: ReactNode, userName: string }) => {

    const [theme, setTheme] = useTheme()
    const [isChecked, setIsChecked] = useState<boolean>((theme == "retro"))

    useEffect(
        () => {
            setIsChecked(theme == "retro")
        }, [isChecked, theme]
    )


    return (
        <div className="drawer ">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/*Navbar starts */}
                <div className="navbar bg-base-100 mb-2">
                    <div className="navbar-start">
                        <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                            </svg>


                        </label>
                    </div>
                    <div className="navbar-center">
                        <Link href={"/home"} className="btn btn-ghost normal-case text-xl">{userName!=""? `${userName} DEV DIARY` : (<p className="skeleton h-4 w-28"></p>)} </Link>
                    </div>
                    <div className="navbar-end">
                        <label className="flex cursor-pointer gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>

                            <input
                                checked={isChecked}
                                type="checkbox" value="retro" className="toggle "
                                onClick={
                                    () => {
                                        if (setTheme && typeof setTheme !== "string" && (theme == "dark" || theme == null || theme == undefined)) {

                                            setTheme("retro");
                                            setIsChecked(true);

                                        } else if (setTheme && typeof setTheme !== "string" && theme == "retro") {
                                            setTheme("dark");
                                            setIsChecked(false);
                                        }
                                    }

                                }

                                readOnly
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>

                        </label>
                    </div>
                </div>
                {/*Navbar ends*/}

                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">

                    <li><Link className="text-3xl" href="/home">Home</Link></li>
                    <li><Link className="text-3xl" href="/settings">Settings</Link></li>
                    <li>
                        <a className="text-3xl" onClick={
                            () => {
                                localStorage.removeItem('userData');
                                router.push("/")
                            }
                        }>Logout</a>
                    </li>
                </ul>
            </div>
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>

                    Open drawer
                </label>
            </div>
        </div>
    );
}

export default Drawer;
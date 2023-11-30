/* eslint-disable */
import Link from "next/link";
import router from "next/router";

import { ReactNode, useEffect, useState } from "react";

import useTheme from "~/hooks/use_theme";

const Drawer = ({ children, userName }: { children: ReactNode, userName: string }) => {

    const [theme, setTheme] = useTheme()
    const [isChecked, setIsChecked] = useState<boolean>(false)

    


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
                        <Link href={"/home"} className="btn btn-ghost normal-case text-xl">{userName != "" ? `${userName} DEV DIARY` : (<p className="skeleton h-4 w-28"></p>)} </Link>
                    </div>
                    <div className="navbar-end">
                        <label className="flex cursor-pointer gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>

                            {
                                theme != null ? (<input
                                    checked={theme == "retro"}
                                    type="checkbox" value="retro" className="toggle "
                                    onClick={
                                        () => {
                                            if (setTheme && typeof setTheme !== "string" && (theme == "dark" || theme == null || theme == undefined)) {

                                                setTheme("retro");


                                            } else if (setTheme && typeof setTheme !== "string" && theme == "retro") {
                                                setTheme("dark");

                                            }
                                        }

                                    }

                                    readOnly
                                />) : (<p className="skeleton h-4 w-12"></p>)
                            }
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

                    <li>
                        <Link className="btn btn-ghost btn-lg justify-start items-center text-3xl " href="/home">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                            </svg>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="btn btn-ghost btn-lg justify-start items-center text-3xl" href="/settings">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" clipRule="evenodd" />
                            </svg>

                            Settings
                        </Link>
                    </li>
                    <li>
                        <a className="btn btn-ghost btn-lg justify-start items-center text-3xl"
                            onClick={
                                () => {
                                    localStorage.removeItem('userData');
                                    router.push("/")
                                }
                            }
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z" clipRule="evenodd" />
                            </svg>

                            Logout
                        </a>
                    </li>
                </ul>
            </div>
            
        </div>
    );
}

export default Drawer;
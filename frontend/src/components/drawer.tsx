import Link from "next/link";
import router from "next/router";

const Drawer = () => {
    return (
        <div className="drawer ">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>

                    Open drawer
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li><Link className="text-3xl" href="/">Overview</Link></li>
                    <li><Link className="text-3xl" href="/">Projects</Link></li>
                    <li><Link className="text-3xl" href="/">Tasks</Link></li>
                    <li><Link className="text-3xl" href="/">Research</Link></li>
                    <li><Link className="text-3xl" href="/">Settings</Link></li>
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
        </div>
    );
}

export default Drawer;
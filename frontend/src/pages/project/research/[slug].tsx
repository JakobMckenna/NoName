import axios from "axios";
import router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Navbar from "~/components/navbar";
import useUser from "~/hooks/use_user";

export default function Research() {
    const projectID: string = String(router.query.slug);
    const [user, loading] = useUser()
    useEffect(
        () => {
            //console.log(commits)

            //console.log(loading)
            //console.log(user)
            if (user) {
                
            }


        }, [loading, user]
    )
    return(
        <div>
            <Navbar userName={user?.email} />

        </div>
    )
}
import axios from "axios";
import router, { useRouter } from "next/router";
import { setPriority } from "os";
import { useState, useEffect } from "react";
import Navbar from "~/components/navbar";
import useNotes from "~/hooks/use_notes";
import useUser from "~/hooks/use_user";

export default function Research() {
    const projectID: string = String(router.query.slug);
    const [user, loading] = useUser()
    const [notes,changeID] = useNotes()
    useEffect(
        () => {
            //console.log(commits)

            //console.log(loading)
            //console.log(user)
            if (user !=null && projectID!=null && changeID) {
                changeID(projectID);
            }


        }, [loading, user]
    )
    return(
        <div>
            <Navbar userName={user?.email} />

        </div>
    )
}
import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "~/components/navbar";
import useUser from "~/hooks/use_user";


function Member() {
    return(
        <div className="flex flex-row px-6 justify-between mb-10">
            <div>
                <p>name</p>
                <p>email</p>
            </div>
            <div>
                <button className="btn btn-primary">Remove</button>
            </div>
            
        </div>
    )
}


function MemberBoard(){
    return(
        <div className="flex flex-col border border-black rounded-md p-6  m-6 w-96 h-96 min-h-min">
            <div className="overflow-auto">
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
            </div>
        </div>
    )
}

export default function MemberPage() {
    const router = useRouter();
    const [user, loading] = useUser();
    const [projectData, setProjectData] = useState<any>();
    const [github, setGithub] = useState(null);
    
    const projectID = String(router.query.slug);
    return(
        <div>
            <Navbar userName="" />
            <MemberBoard />
        </div>
    )
}
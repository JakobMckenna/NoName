import { useEffect } from "react";
import Drawer from "~/components/drawer";
import useUser from "~/hooks/use_user";

export default function SettingsPage(){
    const [user, loading] = useUser()
    useEffect(
        ()=>{

    },[user])
    return(
        <Drawer  userName={user!=null && (user.name!=undefined || user.name!=null)?`${user.name}#${user.id}`:""}>
        <div>
            
        </div>
        </Drawer>
    )
}
import { useEffect, useState } from "react";

const useUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(
        () => {

            const userData = localStorage.getItem('userData');
            if (userData) {
                //  user is signed in
                console.log('UserData from local storage:', userData);
                setUser(JSON.parse(userData))
                setLoading(false)
            }


        },[]
    )
    return [user, loading];
}

export default useUser;
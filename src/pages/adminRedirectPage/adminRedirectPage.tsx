import {useEffect} from "react";

export const AdminRedirectPage = () => {
    useEffect(() => {
        window.location.href = 'https://react-bac.herokuapp.com/admin/'
    }, [])
    return (
        <div>

        </div>
    );
};


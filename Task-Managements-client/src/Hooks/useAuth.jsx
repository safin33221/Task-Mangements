import { useContext } from "react";
import { authContext } from "../Providers/Authprovider";


const useAuth = () => {

    const auth = useContext(authContext)
    return auth
};

export default useAuth;
import { LuLoaderPinwheel } from "react-icons/lu";
import useAuth from "../Hooks/useAuth";
import { Navigate } from "react-router-dom";


const PrivetRoute = ({ children }) => {
    const { user, loading } = useAuth()
    if (loading) return <div className="min-h-screen flex items-center justify-center"><LuLoaderPinwheel className="text-4xl animate-spin" /></div>
    if (!user) return <Navigate to='/signIn'></Navigate>
    return children

};

export default PrivetRoute;
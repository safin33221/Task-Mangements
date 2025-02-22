import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";


const Mainlayout = () => {
    return (
        <div>
            <nav>
                <Navbar />
            </nav>
            <main className="mt-20 md:px-20 mx-auto">
                <Outlet />
            </main>
    
        </div>
    );
};

export default Mainlayout;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mainlayout from "../Layouts/Mainlayout";


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Mainlayout />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mainlayout from "../Layouts/Mainlayout";
import Home from "../Pages/Home/Home";


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Mainlayout />}>
                    <Route index element={<Home />}></Route></Route>

            </Routes>
        </BrowserRouter>
    );
};

export default Router;
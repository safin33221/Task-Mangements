import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mainlayout from "../Layouts/Mainlayout";
import Home from "../Pages/Home/Home";
import SingUp from "../Pages/Auth/SingUp";
import SingIn from "../Pages/Auth/SingIn";
import MyTask from "../Pages/Task/MyTask";
import PrivetRoute from "./PrivetRoute";


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Mainlayout />}>
                    <Route index element={<Home />}></Route>
                    <Route path="/signUp" element={<SingUp />}></Route>
                    <Route path="/signIn" element={<SingIn />}></Route>
                    <Route path="/myTask" element={
                        <PrivetRoute>
                            <MyTask />
                        </PrivetRoute>
                    }></Route>
                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default Router;